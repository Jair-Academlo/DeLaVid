import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Panel from './pages/Panel';
import Home from './pages/Home';
import './App.css';

const App = () => {
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('userToken');
		setAuthenticated(token === 'true');
	}, []);

	const handleLogin = () => {
		setAuthenticated(true);
	};

	return (
		<>
			<HashRouter>
				{authenticated ? (
					<>
						<div className='panel-app'>
							<Panel />
						</div>
						<div className='routes-app'>
							<Routes>
								<Route path='/admin' element={<Admin />} />
								<Route path='/home' element={<Home />} />
							</Routes>
						</div>
					</>
				) : (
					<Routes>
						<Route
							path='/'
							element={<Login onLogin={handleLogin} />}
						/>
					</Routes>
				)}
			</HashRouter>
		</>
	);
};

export default App;
