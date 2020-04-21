import React from 'react';
import { isAdmin, getCurrentUser } from '../../services/auth';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import './styles.css';

const OnlinePlayers = ({ players, onSelectPlayer }) => {
	const user = getCurrentUser();

	const handleSelectPlayer = (player) => {
		if (player.id === user.id) return;
		if (!isAdmin()) return;

		onSelectPlayer(player);
	};

	return (
		<div className={'onlinePlayersContainer'}>
			<DropdownButton variant='secondary' title='Jogadores na Sala'>
				{players.map((player) => {
					return (
						<Dropdown.Item
							onClick={() => handleSelectPlayer(player)}
							key={player.id}
						>
							{player.name}
							{user.id === player.id ? ' (você)' : ''}
						</Dropdown.Item>
					);
				})}
			</DropdownButton>
		</div>
	);
};

export default OnlinePlayers;
