import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';

import '../detallesMedia/detallesMedia.css';

const DetallesArticulo = () => {
	const navigate = useNavigate();
	const data = useSelector(state => state.data);
	return (
		<>
			<div className='container-ver-detalles-media'>
				<section className='section-form-ver-detalles-del-media'>
					<div>
						<p>Titulo del articulo</p>
						<input type='text' value={data.titulo} readOnly />
					</div>
					<div>
						<p>Autor del articulo</p>
						<input type='text' value={data.autor} readOnly />
					</div>
					<div>
						<p>Categoria</p>
						<input type='text' value={data.categoria} readOnly />
					</div>

					<div>
						<p>Articulo</p>
						<textarea
							cols='30'
							rows='10'
							value={data['contenido del articulo']}
							readOnly
						></textarea>
					</div>
				</section>
				<section className='section-img-ver-detalles-del-media'>
					<div>
						<p>Imagen del articulo</p>
						<div>
							<img
								id='imagen-video-detalles-media'
								src={data['imagen del articulo']}
								alt='imagen'
							/>
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

export default DetallesArticulo;
