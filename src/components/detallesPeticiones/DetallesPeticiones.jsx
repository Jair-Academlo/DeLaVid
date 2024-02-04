import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import N1 from '../../imgs/icon.png';
import './detallesPeticiones.css';

const DetallesPeticiones = () => {
	const navigate = useNavigate();
	const data = useSelector(state => state.data);

	return (
		<>
			<section className='section-detalles-peticiones'>
				<div className='div-1-detalles-peticiones'>
					<div className='div-card-1-peticiones'>
						<img src={N1} alt='imagen' />
					</div>
					<div className='div-card-2-peticiones'>
						<div>
							<p>Nombre de quien solicita</p>
							<input
								type='text'
								placeholder='Nombre'
								defaultValue={data?.nombre}
								readOnly
							/>
						</div>
						<div>
							<p>No. de solicitud</p>
							<input
								type='text'
								placeholder='Solicitud'
								defaultValue={`#00${data?.serial}`}
								readOnly
							/>
						</div>
					</div>
					<div className='div-card-3-peticiones'>
						<div>
							<p>Telefono o Email</p>
							<input
								type='text'
								placeholder='Email'
								defaultValue={data?.['email o telefono']}
								readOnly
							/>
						</div>
						<div>
							<p>fecha</p>
							<input
								type='text'
								placeholder='Fecha'
								defaultValue={new Date(
									data.fecha
								).toLocaleString()}
								readOnly
							/>
						</div>
					</div>
				</div>
				<div className='div-2-detalles-peticiones'>
					<textarea
						name=''
						id=''
						placeholder='Peticion'
						defaultValue={data?.peticion}
						readOnly
					></textarea>
				</div>
			</section>
			<button
				className='div-button-back-detalles-del-evento'
				onClick={() => {
					navigate(-1);
				}}
			>
				<IoArrowBackCircleOutline className='icon-buttom-regresar-detalles' />
			</button>
		</>
	);
};

export default DetallesPeticiones;
