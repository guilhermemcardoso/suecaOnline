import React, { useState, useEffect } from 'react';
import {
	getRoom,
	leaveRoom,
	createRoomListener,
	kickFromRoom,
	wasKicked,
} from '../../services/room';
import { startGame, finishGame, nextPlayer } from '../../services/game';
import { getCurrentUser } from '../../services/auth';
import { getCardRef, takeCard } from '../../services/card';
import { useHistory } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

import Header from '../../components/Header';
import MyCards from '../../components/MyCards';
import AdminButtons from '../../components/AdminButtons';
import OnlinePlayers from '../../components/OnlinePlayers';
import ConfirmationModal from '../../components/ConfirmationModal';

import './styles.css';

const Room = () => {
	const [room, setRoom] = useState();
	const [myCards, setMyCards] = useState([]);
	const [showMyCards, setShowMyCards] = useState(true);
	const [showAdminButtons, setShowAdminButtons] = useState(true);
	const [showKickMessage, setShowKickMessage] = useState(false);
	const [selectedPlayer, setSelectedPlayer] = useState();

	const history = useHistory();

	const handleLeaveRoom = async () => {
		try {
			await leaveRoom(room.code, getCurrentUser());
			history.push('/home');
		} catch (err) {}
	};

	const handleStartGame = async () => {
		try {
			await startGame(room.code);
		} catch (err) {}
	};

	const handleFinishGame = async () => {
		try {
			await finishGame(room.code);
		} catch (err) {}
	};

	const handleSelectPlayer = (player) => {
		setShowKickMessage(true);
		setSelectedPlayer(player);
	};

	const kickMember = async (member) => {
		const user = getCurrentUser();
		if (user.id !== room.owner.id) return;

		await kickFromRoom(room.code, selectedPlayer);
		setShowKickMessage(false);
	};

	const handleFinishTurn = async () => {
		if (!room) return;
		const user = getCurrentUser();
		await nextPlayer(user, room.code);
	};

	const handleTakeCard = async () => {
		if (!room) return;
		await takeCard(room);
	};

	const handleShowMyCards = () => {
		const flag = !showMyCards;
		setShowMyCards(flag);
	};

	const handleShowAdminButtons = () => {
		const flag = !showAdminButtons;
		setShowAdminButtons(flag);
	};

	useEffect(() => {
		const roomCode = getRoom();
		if (!roomCode) history.push('/home');
		const unsubscribe = createRoomListener(roomCode, onRoomChanges);

		return () => {
			unsubscribe();
		};
	}, []);

	const renderCard = () => {
		if (!room) return;
		let uri = require('../../assets/images/back.png');
		let card;
		if (room.currentCard) {
			const currentCard = room.currentCard;
			card = getCardRef(currentCard);
			uri = card.uri;
		}

		return (
			<div className={'cardContainer'}>
				<img
					alt={
						room.currentCard
							? `${card.ref} of ${card.suit}`
							: 'Carta virada'
					}
					style={{ width: 150 }}
					src={uri}
				/>
				{renderTurnButtons(room.currentCard)}
			</div>
		);
	};

	const onSelectCard = (key) => {};

	const renderTurnButtons = (currentCard) => {
		if (!room) return;
		const currentPlayer = room.currentPlayer;
		if (!currentPlayer) return;
		const user = getCurrentUser();
		if (currentPlayer.id === user.id)
			return (
				<div>
					{!currentCard && (
						<Button
							size='lg'
							className={'turnButton'}
							onClick={() => handleTakeCard()}
						>
							Pegar uma carta
						</Button>
					)}
					{currentCard && (
						<Button
							size='lg'
							className={'turnButton'}
							onClick={() => handleFinishTurn()}
						>
							Finalizar Jogada
						</Button>
					)}
				</div>
			);
	};

	const onRoomChanges = (data) => {
		setRoom(data);
		const user = getCurrentUser();
		const result = data.members.filter((member) => member.id === user.id);
		const isMember = !!result.length;
		if (!isMember) {
			wasKicked();
			history.push('/home');
		}

		if (data) setMyCards(result[0].cards);
	};

	const getRoomTitle = () => {
		if (!room) return 'A partida começará em breve...';
		if (room.status === 'CREATED') return 'A partida começará em breve...';
		if (!room.currentPlayer) return 'A partida começará em breve...';
		return `${room.currentPlayer.name}, é sua vez!`;
	};

	return (
		<>
			<Header room={room} onLeaveRoom={handleLeaveRoom} />
			<Container className={'roomContainer'}>
				{room && (
					<OnlinePlayers
						players={room.members}
						onSelectPlayer={handleSelectPlayer}
					/>
				)}
				<h4 className={'title'}>{getRoomTitle()}</h4>
				{renderCard()}
				<AdminButtons
					room={room}
					onShow={handleShowAdminButtons}
					show={showAdminButtons}
					onStartGame={handleStartGame}
					onFinishGame={handleFinishGame}
				/>
				<MyCards
					cards={myCards}
					onSelectCard={onSelectCard}
					show={showMyCards}
					onShow={handleShowMyCards}
				/>
				<ConfirmationModal
					show={showKickMessage}
					title={'Confirmação'}
					text={
						'Deseja realmente remover o usuário selecionado da sala?'
					}
					onConfirm={kickMember}
					onCancel={() => setShowKickMessage(false)}
				/>
			</Container>
		</>
	);
};

export default Room;
