import React, { useState, useEffect } from 'react';
import { login, isAuthenticated } from '../../services/auth';
import { useHistory, Redirect } from 'react-router-dom';
import { randomCard, getCardRef } from '../../services/card';
import { Container, Button, InputGroup, FormControl } from 'react-bootstrap';
import HomeHeader from '../../components/HomeHeader';
import './styles.css';

const Login = () => {
	const [email, setEmail] = useState('teste@teste.com');
	const [password, setPassword] = useState('123456');
	const [card, setCard] = useState();

	const history = useHistory();

	const handleChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleLogin = async () => {
		try {
			const user = await login(email, password);
			if (user) {
				history.push('/home');
			}
		} catch {}
	};

	useEffect(() => {
		const card = getCardRef(randomCard());
		setCard(card);
	}, []);

	if (isAuthenticated()) {
		return <Redirect to='/home' />;
	}

	return (
		<>
			<HomeHeader showButton={false} />
			<Container className={'loginContainer'}>
				{card && (
					<div>
						<img className={'loginLogo'} src={card.uri} />
					</div>
				)}
				<InputGroup className={'loginInput'} size='lg'>
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
				<InputGroup className={'loginInput'} size='lg'>
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
					className={'loginButton'}
					onClick={() => handleLogin()}
				>
					Entrar
				</Button>
				<p className={'loginText'}>Ainda não tem conta? <a className={'loginLink'} onClick={() => history.push('/register')}>Cadastre-se aqui</a></p>
			</Container>
		</>
		// <div>
		// 	<input
		// 		placeholder='Email'
		// 		type='email'
		// 		name='email'
		// 		value={email}
		// 		onChange={(e) => handleChangeEmail(e)}
		// 	/>
		// 	<input
		// 		placeholder='Senha'
		// 		type='password'
		// 		name='password'
		// 		value={password}
		// 		onChange={(e) => handleChangePassword(e)}
		// 	/>
		// 	<button onClick={() => handleLogin()}>Entrar</button>
		// </div>
	);
};

export default Login;
