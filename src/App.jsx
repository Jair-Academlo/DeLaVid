import './App.css';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { HashRouter, Routes, Route } from 'react-router-dom';

const App = () => {
	return (
		<>
			<HashRouter>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/admin' element={<Admin />} />
				</Routes>
			</HashRouter>
		</>
	);
};

export default App;
