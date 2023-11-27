import { IoArrowBackCircleOutline } from 'react-icons/io5';
import N1 from '../../imgs/logo.png';
import './detallesEvento.css';
import { useNavigate } from 'react-router-dom';

const DetallesEvento = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className='container-ver-detalles-evento'>
				<section className='section-form-ver-detalles-del-evento'>
					<div>
						<p>Nombre del evento</p>
						<input type='text' value='Prueba 1' />
					</div>
					<div>
						<p>Fecha</p>
						<input type='text' value='2023-02-19' />
					</div>
					<div>
						<p>Hora</p>
						<input type='text' value='18:00' />
					</div>
					<div>
						<p>Informacion</p>
						<textarea
							cols='30'
							rows='10'
							value='Esto es un mensaje de prueba'
						></textarea>
					</div>
				</section>
				<section className='section-img-ver-detalles-del-evento'>
					<div>
						<p>Imagen del evento</p>
						<div>
							<img
								src={N1}
								alt='imagen'
								width={400}
								height={400}
							/>
						</div>
					</div>

					<button
						className='div-button-back-detalles-del-evento'
						onClick={() => {
							navigate(-1);
						}}
					>
						<IoArrowBackCircleOutline className='icon-buttom-regresar-detalles' />
					</button>
				</section>
			</div>
		</>
	);
};

export default DetallesEvento;
