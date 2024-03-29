import '../styles/notificaciones.css';
import { MdNotificationsActive } from 'react-icons/md';

const Notificaciones = () => {
	return (
		<>
			<div className='container-notificaciones'>
				<section className='section-notificaciones-mensajes'>
					<h2>Envia notificaciones a los usuarios</h2>
					<p>Ingresa el mensaje que se le enviara a los usuarios</p>
				</section>
				<section className='section-notificaciones-input'>
					<MdNotificationsActive />
					<input type='text' placeholder='Titulo' />
				</section>
				<section>
					<textarea
						name='mensaje'
						id=''
						cols='30'
						rows='10'
						placeholder='Mensaje'
					></textarea>
				</section>
				<section>
					<button>Enviar notificacion</button>
				</section>
			</div>
		</>
	);
};

export default Notificaciones;
