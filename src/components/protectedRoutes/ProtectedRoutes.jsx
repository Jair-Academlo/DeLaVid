import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
	const token = useSelector(state => state.token);

	if (token !== true) {
		return <Navigate to='/' />;
	} else {
		return <Outlet />;
	}
};

export default ProtectedRoutes;
