import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
	const token = localStorage.getItem('userToken');
	console.log(token);

	if (token !== 'true') {
		return <Navigate to='/' />;
	} else {
		return <Outlet />;
	}
};

export default ProtectedRoutes;
