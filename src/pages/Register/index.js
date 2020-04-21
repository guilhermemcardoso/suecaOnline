import React, { useState, useEffect } from 'react';
import {register, isAuthenticated } from '../../services/auth';
import { useHistory, Redirect } from "react-router-dom";
import { randomCard, getCardRef } from '../../services/card';
import { Container, Button, InputGroup, FormControl } from 'react-bootstrap';
import HomeHeader from '../../components/HomeHeader';
import './styles.css';

const Register = () => {
	const [name, setName] = useState('Guilherme');
	const [email, setEmail] = useState('teste3@teste.com');
	const [password, setPassword] = useState('123456');
	const [card, setCard] = useState();

	const history = useHistory();

	const handleChangeName = (e) => {
		setName(e.target.value);
	};

	const handleChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleRegister = async () => {
		try {
			await register(email, password, name);
			history.push('/');
		} catch {

		}
	};

	useEffect(() => {
		const card = getCardRef(randomCard());
		setCard(card);
	}, []);

	if(isAuthenticated()) {
		return <Redirect to='/home' />;
	}

	return (
		<>
			<HomeHeader showButton={false} />
			<Container className={'registerContainer'}>
				{card && (
					<div>
						<img className={'registerLogo'} src={card.uri} />
					</div>
				)}
				<InputGroup className={'registerInput'} size='lg'>
					<InputGroup.Prepend>
						<InputGroup.Text id='inputGroup-sizing-lg'>
							Nome
						</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						type='text'
						onChange={(e) => handleChangeName(e)}
						aria-label='Large'
						aria-describedby='inputGroup-sizing-sm'
					/>
				</InputGroup>
				<InputGroup className={'registerInput'} size='lg'>
					<InputGroup.Prepend>
						<InputGroup.Text id='inputGroup-sizing-lg'>
							Email
						</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						type='email'
						onChange={(e) => handleChangeEmail(e)}
						aria-label='Large'
						aria-describedby='inputGroup-sizing-sm'
					/>
				</InputGroup>
				<InputGroup className={'registerInput'} size='lg'>
					<InputGroup.Prepend>
						<InputGroup.Text id='inputGroup-sizing-lg'>
							Password
						</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						type='password'
						onChange={(e) => handleChangePassword(e)}
						aria-label='Large'
						aria-describedby='inputGroup-sizing-sm'
					/>
				</InputGroup>
				<Button
					size='lg'
					className={'registerButton'}
					onClick={() => handleRegister()}
				>
					Cadastrar
				</Button>
				<p className={'registerText'}>Já tem conta? <a className={'registerLink'} onClick={() => history.push('/')}>Entrar</a></p>
			</Container>
		</>
	);
};

export default Register;
