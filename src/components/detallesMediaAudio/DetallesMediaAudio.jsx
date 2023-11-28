import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { FaCirclePlay } from 'react-icons/fa6';
import { AiFillBackward, AiFillFastForward } from 'react-icons/ai';

import N1 from '../../imgs/logo.png';
import './detallesMediaAudio.css';

const DetallesMediaAudio = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className='container-ver-detalles-media'>
				<section className='section-form-ver-detalles-del-media'>
					<div>
						<p>Titulo del audio</p>
						<input type='text' value='Alabanzas' />
					</div>
					<div>
						<p>Autor del audio</p>
						<input type='text' value='Jair Rincon' />
					</div>
					<div>
						<p>Categoria</p>
						<input type='text' value='Semana Santa' />
					</div>

					<div>
						<p>Descripcion</p>
						<textarea
							cols='30'
							rows='10'
							value='Esto es un mensaje de prueba'
						></textarea>
					</div>
				</section>
				<section className='section-img-ver-detalles-del-media'>
					<div>
						<p>Reprodcutor del audio</p>
						<div>
							<img
								id='imagen-video-detalles-media'
								src={N1}
								alt='imagen'
								width={300}
								height={300}
							/>
						</div>
						<div className='div-reproductor-detalles-media'>
							<span>
								<AiFillBackward className='icons-reprodcutor-detalles-media' />
							</span>
							<span>
								<FaCirclePlay className='icons-reprodcutor-detalles-media' />
							</span>
							<span>
								<AiFillFastForward className='icons-reprodcutor-detalles-media' />
							</span>
						</div>
					</div>

					<button
						className='div-button-back-detalles-del-media'
						onClick={() => {
							navigate(-1);
						}}
					>
						<IoArrowBackCircleOutline className='icon-buttom-regresar-detalles-media' />
					</button>
				</section>
			</div>
		</>
	);
};

export default DetallesMediaAudio;
