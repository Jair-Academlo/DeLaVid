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
import DetallesEvento from './components/detallesEvento/DetallesEvento';
import DetallesMedia from './components/detallesMedia/DetallesMedia';
import MediaAudio from './pages/MediaAudio';
import DetallesMediaAudio from './components/detallesMediaAudio/DetallesMediaAudio';
import './App.css';
import DetallesArticulo from './components/detallesArticulo/DetallesArticulo';
import DetallesPeticiones from './components/detallesPeticiones/DetallesPeticiones';

const App = () => {
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('userToken');
		setAuthenticated(token === 'true');
	}, []);

	const handleLogin = () => {
		setAuthenticated(true);
	};

	const handleLogout = () => {
		setAuthenticated(false);
	};

	return (
		<>
			<HashRouter>
				{authenticated ? (
					<>
						<div className='container-app'>
							<div className='panel-app'>
								<Panel onLogout={handleLogout} />
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
										path='/mediaAudio'
										element={<MediaAudio />}
									/>
									<Route
										path='/mediaAudio/:id'
										element={<DetallesMediaAudio />}
									/>
									<Route
										path='/articulos'
										element={<Articulos />}
									/>
									<Route
										path='/articulos/:id'
										element={<DetallesArticulo />}
									/>
									<Route
										path='/peticiones'
										element={<Peticiones />}
									/>
									<Route
										path='/peticiones/:id'
										element={<DetallesPeticiones />}
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
