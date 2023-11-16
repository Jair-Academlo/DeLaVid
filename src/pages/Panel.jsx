import { Link } from 'react-router-dom';

const Panel = () => {
	return (
		<div>
			<h1>panel</h1>
			<div>
				<Link to='/eventos'>Eventos</Link>
			</div>
			<div>
				<Link to='/media'>Media</Link>
			</div>
			<div>
				<Link to='/articulos'>Articulos</Link>
			</div>
			<div>
				<Link to='/peticiones'>Peticiones</Link>
			</div>
			<div>
				<Link to='/notificaciones'>Notificaciones</Link>
			</div>
		</div>
	);
};

export default Panel;
