import '../styles/notificaciones.css';
import { IoIosNotifications } from 'react-icons/io';

const Notificaciones = () => {
	return (
		<>
			<div className='container-notificaciones'>
				<section>
					<h2>Envia notificaciones a los usuarios</h2>
					<p>Ingresa el mensaje que se le enviara a los usuarios</p>
				</section>
				<section>
					<IoIosNotifications />
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
