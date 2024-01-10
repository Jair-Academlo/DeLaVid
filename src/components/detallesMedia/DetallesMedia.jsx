import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { FaCirclePlay } from 'react-icons/fa6';
import { AiFillBackward, AiFillFastForward } from 'react-icons/ai';
import { useSelector } from 'react-redux';

import './detallesMedia.css';

const DetallesMedia = () => {
	const navigate = useNavigate();
	const data = useSelector(state => state.data);
	return (
		<>
			<div className='container-ver-detalles-media'>
				<section className='section-form-ver-detalles-del-media'>
					<div>
						<p>Titulo del video</p>
						<input
							type='text'
							value={data['titulo audio']}
							readOnly
						/>
					</div>
					<div>
						<p>Autor del video</p>
						<input
							type='text'
							value={data['autor del audio']}
							readOnly
						/>
					</div>
					<div>
						<p>Categoria</p>
						<input type='text' value={data.categoria} readOnly />
					</div>

					<div>
						<p>Descripcion</p>
						<textarea
							cols='30'
							rows='10'
							value={data['descripcion del mensaje']}
							readOnly
						></textarea>
					</div>
				</section>
				<section className='section-img-ver-detalles-del-media'>
					<div>
						<p>Reprodcutor del video</p>
						<div>
							<img
								id='imagen-video-detalles-media'
								src={data.imagen}
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

export default DetallesMedia;
