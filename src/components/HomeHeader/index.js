import React, { useState, useEffect } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { getCurrentUser } from '../../services/auth';

const HomeHeader = ({ showButton, onLogout }) => {
	const [user, setUser] = useState();

	useEffect(() => {
		const currentUser = getCurrentUser();
		setUser(currentUser);
	}, []);

	return (
		<Navbar variant='dark' bg='dark'>
			<Navbar.Brand>Sueca Online</Navbar.Brand>
			<Navbar.Toggle />
			<Navbar.Collapse className='justify-content-end'>
				{showButton && (
					<Navbar.Text>
						<Button onClick={onLogout} variant='outline-light'>
							Logout ({user ? user.name : ''})
						</Button>
					</Navbar.Text>
				)}
			</Navbar.Collapse>
		</Navbar>
	);
};

export default HomeHeader;
