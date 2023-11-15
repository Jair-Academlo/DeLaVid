import './App.css';
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { HashRouter, Routes, Route } from 'react-router-dom';

const App = () => {
	return (
		<>
			<HashRouter>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route element={<ProtectedRoutes />}>
						<Route path='/admin' element={<Admin />} />
					</Route>
				</Routes>
			</HashRouter>
		</>
	);
};

export default App;
