import React, { useState, useEffect } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { getCurrentUser } from '../../services/auth';

const Header = ({ room, onLeaveRoom }) => {
	const [user, setUser] = useState();

	useEffect(() => {
		const currentUser = getCurrentUser();
		setUser(currentUser);
	}, []);

	return (
		<Navbar variant='dark' bg='dark'>
			<Navbar.Brand>
				Sala {room ? room.code : ''}
			</Navbar.Brand>
			<Navbar.Toggle />
			<Navbar.Collapse className='justify-content-end'>
				<Navbar.Text>
					<Button onClick={onLeaveRoom} variant='outline-light'>
						Sair da sala ({user ? user.name : ''})
					</Button>
				</Navbar.Text>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Header;
