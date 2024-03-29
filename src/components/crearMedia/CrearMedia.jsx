import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage';
import { getDatabase, ref as DatabaseRef, set } from 'firebase/database';
import { app } from '../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setEditar } from '../../store/data/editarSlice';
import IsLoadding from '../isLoadding/IsLoadding';
import './crearMedia.css';

// eslint-disable-next-line react/prop-types
const CrearMedia = ({ modal }) => {
	const iconImagen =
		'https://cdn-icons-png.flaticon.com/512/1055/1055650.png';

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

	const handleFileChange = e => {
		const selectedFile = e.target.files[0];
		if (selectedFile) {
			setFile(selectedFile);
			const imgUrl = URL.createObjectURL(selectedFile);
			setImage(imgUrl);
		}
	};

	const newEvent = async e => {
		e.preventDefault();

		try {
			if (file) {
				const storageRef = ref(storage, `images/${file.name}`);
				await uploadBytes(storageRef, file);
				const imageUrl = await getDownloadURL(storageRef);

				const timestamp = new Date();

				const id = crypto.randomUUID();

				setTimeout(async () => {
					const db = getDatabase(app);
					await set(
						DatabaseRef(
							db,
							`/projects/proj_cer3wPMCkxSWWePnENPiZL/data/Media/${
								editar ? data['id audio'] : id
							}`
						),
						{
							'autor del audio': autor,
							categoria: 'Devocionales',
							'categoria id':
								'97e99260-d31e-11ed-88a9-ab01ab800b22',
							'descripcion del mensaje': descripcion,
							fecha: timestamp.getTime(),
							'id audio': editar ? data['id audio'] : id,
							imagen: imageUrl || data.imagen,
							'titulo audio': titulo,
							url_video: urlVideo,
						}
					);

					setTitulo('');
					setAutor('');
					setDescripcion('');
					setImage('');
					setUrlVideo('');
					dispatch(setEditar(false));
					setLoadding(false);

					modal(false);
				}, 3000);
			} else {
				const timestamp = new Date();

				const id = crypto.randomUUID();

				setTimeout(async () => {
					const db = getDatabase(app);
					await set(
						DatabaseRef(
							db,
							`/projects/proj_cer3wPMCkxSWWePnENPiZL/data/Media/${
								editar ? data['id audio'] : id
							}`
						),
						{
							'autor del audio': autor,
							categoria: 'Devocionales',
							'categoria id':
								'97e99260-d31e-11ed-88a9-ab01ab800b22',
							'descripcion del mensaje': descripcion,
							fecha: timestamp.getTime(),
							'id audio': editar ? data['id audio'] : id,
							imagen: data.imagen,
							'titulo audio': titulo,
							url_video: urlVideo,
						}
					);

					setTitulo('');
					setAutor('');
					setDescripcion('');
					setImage('');
					setUrlVideo('');
					dispatch(setEditar(false));
					setLoadding(false);

					modal(false);
				}, 3000);
			}
		} catch (error) {
			console.error('Error al agregar el evento:', error);
		}
	};

	const cancelar = () => {
		setTitulo('');
		setAutor('');
		setDescripcion('');
		setImage('');
		setUrlVideo('');
		dispatch(setEditar(false));
		modal(false);
	};

	return (
		<>
			{loadding && <IsLoadding />}

			<div className='container-modal-media'>
				<form className='form-container-media' onSubmit={newEvent}>
					<section className='section-1-form-media'>
						<div className='div-nombre-del-evento'>
							<h2>Título</h2>
							<input
								type='text'
								placeholder='Título'
								defaultValue={titulo}
								onChange={e => {
									setTitulo(e.target.value);
								}}
							/>
						</div>
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
							<span>Imagen de Portada</span>{' '}
							<input type='file' onChange={handleFileChange} />
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
							<button
								onClick={cancelar}
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
										? image || data?.imagen
										: image || iconImagen
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
