import { Link } from 'react-router-dom';
import logo from '../imgs/logo.png';

import {
	MdEmojiEvents,
	MdArticle,
	MdBorderColor,
	MdNotificationsActive,
} from 'react-icons/md';
import { TiMediaPlay } from 'react-icons/ti';

import '../styles/panel.css';

const Panel = () => {
	return (
		<>
			<aside className='aside-panel'>
				<section className='section-profile-aside-panel'>
					<img src={logo} alt='logo' width={150} height={150} />
					<p>admin@lavidacayucan.com</p>
					<div>
						<button>Cerrar Session</button>
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
							<Link to='/media'>Media</Link>
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
