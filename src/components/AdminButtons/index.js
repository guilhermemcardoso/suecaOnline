import React, { useState, useEffect } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { isAdmin } from '../../services/auth';
import { Button } from 'react-bootstrap';
import './styles.css';

const AdminButtons = ({ room, onStartGame, onFinishGame, show, onShow }) => {
	if (!room) return <></>;
	if(!isAdmin()) return <></>;
	return (
		<div className={'adminButtonsContainer'}>
			<div className={'adminButtonsTitleContainer'}>
				<h6 className={'adminButtonsTitle'}>Admin</h6>
				{show && (
					<MdExpandLess
						className={'showButton'}
						size={30}
						onClick={onShow}
					/>
				)}
				{!show && (
					<MdExpandMore
						className={'showButton'}
						size={30}
						onClick={onShow}
					/>
				)}
			</div>
			{show && room.status === 'CREATED' && (
				<Button
					size='lg'
					className={'adminButton'}
					onClick={() => onStartGame()}
				>
					Iniciar Partida
				</Button>
			)}
			{show && room.status === 'RUNNING' && (
				<Button
					size='lg'
					className={'adminButton'}
					onClick={() => onFinishGame()}
				>
					Finalizar Partida
				</Button>
			)}
		</div>
	);
};

export default AdminButtons;
