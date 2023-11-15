import '../styles/login.css';
import { useState } from 'react';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
	};
	return (
		<>
			<div className='container-login'>
				<form onSubmit={() => handleSubmit}>
					<h1>La Vid</h1>
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
