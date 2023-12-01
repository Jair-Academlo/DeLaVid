import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './detallesEvento.css';

const DetallesEvento = () => {
	const navigate = useNavigate();
	const data = useSelector(state => state.data);

	return (
		<>
			<div className='container-ver-detalles-evento'>
				<section className='section-form-ver-detalles-del-evento'>
					<div>
						<p>Nombre del evento</p>
						<input type='text' value={data['nombre del evento']} />
					</div>
					<div>
						<p>Fecha</p>
						<input type='text' value={data.fecha} />
					</div>
					<div>
						<p>Hora</p>
						<input type='text' value={data.hora} />
					</div>
					<div>
						<p>Informacion</p>
						<textarea
							cols='30'
							rows='10'
							value={data['informacion del evento']}
						></textarea>
					</div>
				</section>
				<section className='section-img-ver-detalles-del-evento'>
					<div>
						<p>Imagen del evento</p>
						<div>
							<img src={data.imagen} alt='imagen' />
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
