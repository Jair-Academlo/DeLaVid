import { Link, useNavigate } from 'react-router-dom';
import logo from '../imgs/logo.png';
import {
	MdEmojiEvents,
	MdArticle,
	MdBorderColor,
	MdNotificationsActive,
} from 'react-icons/md';
import { TiMediaPlay } from 'react-icons/ti';
import { auth } from '../config/firebase';

import '../styles/panel.css';

// eslint-disable-next-line react/prop-types
const Panel = ({ onLogout }) => {
	const navigate = useNavigate();

	const logout = () => {
		auth.signOut()
			.then(() => {
				localStorage.setItem('userToken', 'false');
				onLogout();
				navigate('/', { replace: true });
			})
			.catch(error => {
				// An error happened.
				console.error('Error al cerrar sesión:', error);
			});
	};
	return (
		<>
			<aside className='aside-panel'>
				<section className='section-profile-aside-panel'>
					<img src={logo} alt='logo' width={150} height={150} />
					<p>admin@lavidacayucan.com</p>
					<div>
						<button onClick={() => logout()}>Cerrar Session</button>
					</div>
				</section>
				<section className='section-icons-aside-panel'>
					<div>
						<span>
							<MdEmojiEvents />
						</span>
						<span>
							<Link to='/eventos'>Eventos</Link>
						</span>
					</div>
					<div>
						<span>
							<TiMediaPlay />
						</span>
						<span>
							<Link to='/media'>Media Video</Link>
						</span>
					</div>
					<div>
						<span>
							<TiMediaPlay />
						</span>
						<span>
							<Link to='/mediaAudio'>Media Audio</Link>
						</span>
					</div>
					<div>
						<span>
							<MdArticle />
						</span>
						<span>
							<Link to='/articulos'>Articulos</Link>
						</span>
					</div>
					<div>
						<span>
							<MdBorderColor />
						</span>
						<span>
							<Link to='/peticiones'>Peticiones</Link>
						</span>
					</div>
					<div>
						<span>
							<MdNotificationsActive />
						</span>
						<span>
							<Link to='/notificaciones'>Notificaciones</Link>
						</span>
					</div>
				</section>
			</aside>
		</>
	);
};

export default Panel;
