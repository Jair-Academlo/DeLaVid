import { useDispatch, useSelector } from 'react-redux';
import { getStorage } from 'firebase/storage';
import { app } from '../../config/firebase';
import { useEffect, useState } from 'react';
import './crearMedia.css';
import IsLoadding from '../isLoadding/IsLoadding';

// eslint-disable-next-line react/prop-types
const CrearMedia = ({ modal }) => {
	const data = useSelector(state => state.data);
	const editar = useSelector(state => state.editar);
	const dispatch = useDispatch();
	const storage = getStorage(app);

	const [titulo, setTitulo] = useState('');
	const [autor, setAutor] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null);
	const [urlVideo, setUrlVideo] = useState('');
	const [loadding, setLoadding] = useState(false);

	useEffect(() => {
		if (editar) {
			// Asegúrate de que data esté definido
			setTitulo(data['titulo audio']);
			setAutor(data['autor del audio']);
			setDescripcion(data['descripcion del mensaje']);
			setImage(data.imagen);
			setUrlVideo(data.url_video);
		} else {
			setTitulo('');
			setAutor('');
			setDescripcion('');
			setImage('');
			setUrlVideo('');
		}
	}, [editar, data]);

	console.log(data);
	return (
		<>
			{loadding && <IsLoadding />}

			<div className='container-modal-media'>
				<form
					className='form-container-media' /* onSubmit={newEvent} */
				>
					<section className='section-1-form-media'>
						<div className='div-nombre-del-evento'>
							<h2>Autor</h2>
							<input
								type='text'
								placeholder='Autor'
								defaultValue={autor}
								onChange={e => {
									setAutor(e.target.value);
								}}
							/>
						</div>
						<div className='div-informacion-del-media'>
							<h2>Descripcion:</h2>
							<textarea
								name='descripcion'
								id='descripcion'
								cols='70'
								rows='5'
								placeholder='Descripcion del video'
								defaultValue={descripcion}
								onChange={e => {
									setDescripcion(e.target.value);
								}}
							></textarea>
						</div>
						<div className='div-nombre-del-media'>
							<h2>Categoria</h2>
							<input
								type='text'
								placeholder='Selecciona una categoria'
								value='Devocionales'
								readOnly
							/>
						</div>

						<div className='div-file-del-media'>
							<span>Imagen de Portada</span> <input type='file' />
						</div>
						<div className='div-nombre-del-media'>
							<h2>Escribe la url del video</h2>
							<input
								type='text'
								placeholder='URL del video'
								defaultValue={urlVideo}
								onChange={e => {
									setUrlVideo(e.target.value);
								}}
							/>
						</div>
					</section>
					<section className='section-2-form-media'>
						<div className='div-buttom-del-media'>
							<button /* onClick={cancelar} */
								id='cancelar-click-media'
							>
								Cancelar
							</button>
							<button
								type='submit'
								onClick={() => setLoadding(true)}
							>
								Guardar
							</button>
						</div>
						<div>
							<img
								src={
									editar
										? image || data.imagen
										: image || 'iconImagen'
								}
								alt='imagen'
							/>
						</div>
					</section>
				</form>
			</div>
		</>
	);
};

export default CrearMedia;
