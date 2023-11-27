import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Panel from './pages/Panel';
import Eventos from './pages/Eventos';
import Media from './pages/Media';
import Articulos from './pages/Articulos';
import Peticiones from './pages/Peticiones';
import Notificaciones from './pages/Notificaciones';
import Navbar from './components/navbar/Navbar';
import './App.css';
import DetallesEvento from './components/detallesEvento/DetallesEvento';
import DetallesMedia from './components/detallesMedia/DetallesMedia';

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
						<div className='container-app'>
							<div className='panel-app'>
								<Panel />
							</div>
							<div className='routes-app'>
								<Navbar />
								<Routes>
									<Route
										path='/eventos'
										element={<Eventos />}
									/>
									<Route
										path='/eventos/:id'
										element={<DetallesEvento />}
									/>
									<Route path='/media' element={<Media />} />
									<Route
										path='/media/:id'
										element={<DetallesMedia />}
									/>
									<Route
										path='/articulos'
										element={<Articulos />}
									/>
									<Route
										path='/peticiones'
										element={<Peticiones />}
									/>
									<Route
										path='/notificaciones'
										element={<Notificaciones />}
									/>
								</Routes>
							</div>
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
