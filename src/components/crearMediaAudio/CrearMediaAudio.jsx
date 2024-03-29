import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage';
import { getDatabase, ref as DatabaseRef, set } from 'firebase/database';
import { app } from '../../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setEditar } from '../../store/data/editarSlice';
import IsLoadding from '../isLoadding/IsLoadding';
import {
	AiFillFastBackward,
	AiFillFastForward,
	AiFillPlayCircle,
} from 'react-icons/ai';
import './crearMediaAudio.css';

// eslint-disable-next-line react/prop-types
const CrearMedia = ({ modal, categoriasList }) => {
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
	const [selectedFile, setSelectedFile] = useState(null);
	const [category, setCategory] = useState({});
	const [audioDuration, setAudioDuration] = useState(0);
	const [date, setDate] = useState('');

	const [loadding, setLoadding] = useState(false);

	const filtercategory = categoriasList;

	useEffect(() => {
		if (editar) {
			// Asegúrate de que data esté definido
			setTitulo(data['titulo audio']);
			setAutor(data['autor del audio']);
			setDescripcion(data['descripcion del mensaje']);
			setImage(data.imagen);
			setAudioDuration(data.duracion);
			setDate(data.fecha);
			setCategory({
				categoria: data.categoria,
				id: data['categoria id'],
			});
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

	const handleFileChangeMp3 = event => {
		const file = event.target.files[0];
		setSelectedFile(file);

		const audio = new Audio();
		audio.src = URL.createObjectURL(file);

		const audioInput = document.getElementById('audio');
		audioInput.src = audio.src;

		audio.addEventListener('loadedmetadata', () => {
			setAudioDuration(Math.round(audio.duration));
		});
	};

	/* 	const newEvent = async e => {
		e.preventDefault();

		try {
			switch (null) {
				case file:
					alert('selecciona una imagen de portada');
					break;

				case selectedFile:
					alert('selecciona un archivo de audio');
					break;

				default:
		

			if (file) {
				const storageRef = ref(storage, `images/${file.name}`);
				await uploadBytes(storageRef, file);
				const imageUrl = await getDownloadURL(storageRef);

				const storageRefMp3 = ref(
					storage,
					`audios/${selectedFile.name}`
				);

				await uploadBytes(storageRefMp3, selectedFile);
				const Mp3 = await getDownloadURL(storageRefMp3);

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
					categoria: category.categoria,
					'categoria id': category.id,
					'descripcion del mensaje': descripcion,
					fecha: timestamp.getTime(),
					'id audio': editar ? data['id audio'] : id,
					imagen: imageUrl || data.imagen,
					'titulo audio': titulo,
					duracion: (audioDuration * 1000).toString() || '0',
					url_audio: Mp3,
						}
					);

					setTitulo('');
					setAutor('');
					setDescripcion('');
					setImage('');
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
					categoria: category.categoria,
					'categoria id': category.id,
					'descripcion del mensaje': descripcion,
					fecha: timestamp.getTime(),
					'id audio': editar ? data['id audio'] : id,
					imagen: imageUrl || data.imagen,
					'titulo audio': titulo,
					duracion: (audioDuration * 1000).toString() || '0',
					url_audio: Mp3,
						}
					);

					setTitulo('');
					setAutor('');
					setDescripcion('');
					setImage('');
					dispatch(setEditar(false));
					setLoadding(false);

					modal(false);
				}, 3000);
			}
		} catch (error) {
			console.error('Error al agregar el evento:', error);
		}
		}
		break;
	}; */

	const newEvent = async e => {
		e.preventDefault();

		/* if (!file) {
			alert('Selecciona una imagen de portada');
			setLoadding(false);
			return;
		}

		if (!selectedFile) {
			alert('Selecciona un archivo de audio');
			setLoadding(false);
			return;
		} */

		try {
			const timestamp = new Date();
			const id = crypto.randomUUID();

			let imageUrl = '';
			let mp3Url = '';

			const storageRef = ref(storage, `images/${file.name}`);
			await uploadBytes(storageRef, file);
			imageUrl = await getDownloadURL(storageRef);

			const storageRefMp3 = ref(storage, `audios/${selectedFile.name}`);
			await uploadBytes(storageRefMp3, selectedFile);
			mp3Url = await getDownloadURL(storageRefMp3);

			const db = getDatabase(app);

			// Envolver el bloque de código en un setTimeout de 3 segundos
			setTimeout(async () => {
				// Construir el objeto de datos a guardar
				const newData = {
					'autor del audio': autor,
					categoria: category.categoria,
					'categoria id': category.id,
					'descripcion del mensaje': descripcion,
					fecha: editar ? date : timestamp.getTime(),
					'id audio': editar ? data['id audio'] : id,
					imagen: imageUrl || data.imagen,
					'titulo audio': titulo,
					duracion: (audioDuration * 1000).toString() || '0',
					url_audio: mp3Url || data['url_audio'],
				};

				// Determinar si estás editando o creando un nuevo elemento
				const dataPath = `/projects/proj_cer3wPMCkxSWWePnENPiZL/data/Media/${
					editar ? data['id audio'] : id
				}`;

				// Realizar la operación set en la base de datos
				await set(DatabaseRef(db, dataPath), newData);

				// Limpiar estados y cerrar modal
				setTitulo('');
				setAutor('');
				setDescripcion('');
				setImage('');
				dispatch(setEditar(false));
				setLoadding(false);
				modal(false);
			}, 3000); // 3 segundos
		} catch (error) {
			console.error('Error al agregar el evento:', error);
		}
	};

	const cancelar = () => {
		setTitulo('');
		setAutor('');
		setDescripcion('');
		setImage('');
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
							<h2>Titulo</h2>
							<input
								type='text'
								placeholder='Titulo'
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
								placeholder='Descripcion del Audio'
								defaultValue={descripcion}
								onChange={e => {
									setDescripcion(e.target.value);
								}}
							></textarea>
						</div>
						<div className='div-nombre-del-media'>
							<h2>Categoria</h2>

							<select
								name=''
								id=''
								onChange={e =>
									setCategory(
										filtercategory.find(
											c => c.id === e.target.value
										)
									)
								}
							>
								<option
									value={
										editar
											? data['id audio']
											: 'selecciona una categoria'
									}
								>
									{editar
										? data?.categoria
										: 'selecciona una categoria'}
								</option>
								{filtercategory.map(categoria => (
									<option
										value={categoria?.id}
										key={categoria.id}
									>
										{categoria?.categoria}
									</option>
								))}
							</select>
						</div>

						<div className='div-file-del-media'>
							<span>Imagen de Portada</span>{' '}
							<input type='file' onChange={handleFileChange} />
						</div>

						<div className='div-file-del-media-'>
							<span>Audio</span>{' '}
							<input
								type='file'
								id='audio'
								accept='.mp3'
								style={{ display: 'none' }}
								onChange={handleFileChangeMp3}
							/>
							<label
								htmlFor='audio'
								id='label-audio-crear-media-audio'
							>
								<AiFillFastBackward /> <AiFillPlayCircle />{' '}
								<AiFillFastForward />
							</label>
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
