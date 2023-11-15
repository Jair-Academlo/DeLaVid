import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/slice/token.slice';
import logo from '../imgs/logo.png';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = e => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then(userCredencial => {
				console.log('user Credencial', userCredencial);
				dispatch(setToken(true));
				navigate('/admin');
			})
			.catch(err => {
				console.log('error', err);
			});
	};
	return (
		<>
			<div className='container-login'>
				<form onSubmit={() => handleSubmit}>
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
						<button type='submit'>Iniciar Session</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default Login;
