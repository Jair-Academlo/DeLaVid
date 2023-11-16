import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import logo from '../imgs/logo.png';
import '../styles/login.css';

// eslint-disable-next-line react/prop-types
const Login = ({ onLogin }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = e => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				console.log('userCredential', userCredential);
				localStorage.setItem('userToken', 'true');
				onLogin(); // Llamar a la función de retorno para informar al componente principal que el usuario ha iniciado sesión.
				navigate('/eventos');
			})
			.catch(err => {
				console.log('error', err);
			});
	};

	return (
		<>
			<div className='container-login'>
				<form onSubmit={handleSubmit}>
					<img src={logo} alt='imagen' width={150} height={150} />
					<div>
						<label htmlFor='email'>Email:</label>
						<input
							type='text'
							id='email'
							autoComplete='off'
							placeholder='Ingresa tu correo'
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='pass'>Password:</label>
						<input
							type='password'
							id='pass'
							autoComplete='new-password'
							placeholder='Ingresa tu contraseña'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<button type='submit'>Iniciar Sesión</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default Login;
