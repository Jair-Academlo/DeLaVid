import { Navigate } from 'react-router-dom';
import Admin from '../../pages/Admin';

const ProtectedRoutes = () => {
	const token = localStorage.getItem('userToken');
	console.log(token);

	if (token == true) {
		return <Navigate to='/' />;
	} else {
		return <Admin />;
	}
};

export default ProtectedRoutes;
