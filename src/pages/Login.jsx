import '../styles/login.css';
import { useState } from 'react';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	return (
		<>
			<div className='container'>
				<form>
					<div>
						<label htmlFor='email'>Email</label>
						<input
							type='text'
							id='email'
							placeholder='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='pass'>Email</label>
						<input
							type='password'
							id='pass'
							placeholder='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<button>Iniciar Session</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default Login;
