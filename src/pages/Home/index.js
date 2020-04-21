import React, { useState, useEffect } from 'react';
import { logout, TOKEN_KEY, getCurrentUser } from '../../services/auth';
import { useHistory } from 'react-router-dom';
import { enterRoom, createRoom } from '../../services/room';
import { randomCard, getCardRef } from '../../services/card';
import { Container, Button, InputGroup, FormControl } from 'react-bootstrap';
import HomeHeader from '../../components/HomeHeader';
import './styles.css';

const Home = () => {
	const [roomCode, setRoomCode] = useState('');
	const [card, setCard] = useState();
	const history = useHistory();

	const handleChangeCode = (e) => {
		setRoomCode(e.target.value);
	};

	const handleCreateRoom = async () => {
		try {
			const roomCode = generateHash(6);
			await createRoom(roomCode, getCurrentUser());
			history.push('/room');
		} catch (err) {
			console.log('ERRO AO CRIAR SALA', err);
		}
	};

	const handleEnterRoom = async () => {
		try {
			await enterRoom(roomCode, getCurrentUser());
			history.push('/room');
		} catch (err) {
			console.log('ERRO AO ENTRAR NA SALA', err);
		}
	};

	const handleLogout = async () => {
		try {
			await logout();
			localStorage.removeItem(TOKEN_KEY);
			history.push('/');
		} catch {}
	};

	const generateHash = (length) => {
		let result = '';
		const characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * charactersLength)
			);
		}
		return result;
	};

	useEffect(() => {
		const card = getCardRef(randomCard());
		setCard(card);
	}, []);

	return (
		<>
			<HomeHeader showButton onLogout={async () => await handleLogout()} />
			<Container className={'homeContainer'}>
				{card && (
					<div>
						<img className={'homeLogo'} src={card.uri} />
					</div>
				)}
				<div>
					<Button
						size='lg'
						className={'homeButton'}
						onClick={() => handleCreateRoom()}
					>
						Criar nova sala
					</Button>
				</div>
				<p className={'homeText'}>{`  - ou -  `}</p>
				<InputGroup className={'homeInput'} size='lg'>
					<InputGroup.Prepend>
						<InputGroup.Text id='inputGroup-sizing-lg'>
							Sala
						</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						onChange={(e) => handleChangeCode(e)}
						aria-label='Large'
						aria-describedby='inputGroup-sizing-sm'
					/>
				</InputGroup>
				<Button
					size='lg'
					className={'homeButton'}
					onClick={() => handleEnterRoom()}
				>
					Entrar
				</Button>
			</Container>
		</>
	);
};

export default Home;
