import { useDispatch, useSelector } from 'react-redux';
import { getStorage } from 'firebase/storage';
import { app } from '../../config/firebase';
import { useState } from 'react';
import './crearMedia.css';

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

	console.log(data);
	return (
		<>
			<div className='container-modal-media'>
				<div className='form-container-media'>
					<section>
						<div className='div-nombre-del-media'>
							<h2>Titulo del video</h2>
							<input
								type='text'
								placeholder='Titulo'
								defaultValue={titulo}
								onChange={e => {
									setTitulo(e.target.value);
								}}
							/>
						</div>
						<div className='div-buttom-del-media'>
							<button id='cancelar' onClick={() => modal(false)}>
								Cancelar
							</button>
							<button onClick={() => modal(false)}>
								Guardar
							</button>
						</div>
					</section>
					<div className='div-nombre-del-media'>
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
				</div>
			</div>
		</>
	);
};

export default CrearMedia;
