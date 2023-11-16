import { Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
	const token = localStorage.getItem('userToken');
	console.log(token);

	if (token != 'true') {
		return <Navigate to='/' />;
	}
};

export default ProtectedRoutes;
