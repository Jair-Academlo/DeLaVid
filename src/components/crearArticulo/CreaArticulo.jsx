import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage';
import {
	getDatabase,
	ref as DatabaseRef,
	set,
	child,
	get,
} from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setEditar } from '../../store/data/editarSlice';
import IsLoadding from '../isLoadding/IsLoadding';
import { app } from '../../config/firebase';
import 'react-datepicker/dist/react-datepicker.css';
import '../crearEvento/crearEvento.css';

// eslint-disable-next-line react/prop-types
const CreaArticulo = ({ modal }) => {
	const data = useSelector(state => state.data);
	const editar = useSelector(state => state.editar);
	const dispatch = useDispatch();
	const storage = getStorage(app);

	const iconImagen =
		'https://cdn-icons-png.flaticon.com/512/1055/1055650.png';

	const [name, setName] = useState('');
	const [info, setInfo] = useState('');
	const [selectedDate, setSelectedDate] = useState(null);
	const [time, setTime] = useState('');
	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null);
	const [loadding, setLoadding] = useState(false);
	const [categoriasAudio, setCategoriaAudio] = useState([]);

	useEffect(() => {
		if (editar) {
			// Asegúrate de que data esté definido
			setName(data['nombre del evento']);
			setInfo(data['informacion del evento']);
			setTime(data.hora);
			setImage(data.imagen);
		} else {
			setName('');
			setInfo('');
			setSelectedDate(null);
			setTime('');
			setImage(null);
		}

		fetchData();
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
							`/projects/proj_cer3wPMCkxSWWePnENPiZL/data/Eventos/${
								editar ? data.id : id
							}`
						),
						{
							'time evento': timestamp.getTime().toString(),
							'nombre del evento': name,
							fecha: data.fecha
								? data.fecha
								: selectedDate.toISOString().split('T')[0],
							hora: time,
							imagen: imageUrl || data.imagen,
							'informacion del evento': info,
							'id evento': editar ? data.id : id,
						}
					);

					setName('');
					setInfo('');
					setSelectedDate(null);
					setTime('');
					setImage(null);
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
							`/projects/proj_cer3wPMCkxSWWePnENPiZL/data/Eventos/${
								editar ? data.id : id
							}`
						),
						{
							'time evento': timestamp.getTime().toString(),
							'nombre del evento': name,
							fecha: data.fecha
								? data.fecha
								: selectedDate.toISOString().split('T')[0],
							hora: new Date().toLocaleString(time),
							imagen: data.imagen,
							'informacion del evento': info,
							'id evento': editar ? data.id : id,
						}
					);

					setName('');
					setInfo('');
					setSelectedDate(null);
					setTime('');
					setImage(null);
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
		setName('');
		setInfo('');
		setSelectedDate(null);
		setTime('');
		setImage(null);
		dispatch(setEditar(false));
		modal(false);
	};

	const fetchData = async () => {
		try {
			const dbRef = DatabaseRef(getDatabase());
			const snapshot = await get(
				child(
					dbRef,
					'/projects/proj_cer3wPMCkxSWWePnENPiZL/data/categorias articulos'
				)
			);

			if (snapshot.exists()) {
				const data = snapshot.val();
				const dataArray = Object.entries(data).map(
					([key, value], index) => ({
						serial: index,
						id: key,
						...value,
					})
				);
				setCategoriaAudio(dataArray);
			} else {
				console.log('No hay datos en la colección "Categoria Audio"');
			}
		} catch (error) {
			console.error('Error al obtener los datos:', error);
		}
	};

	return (
		<>
			<>
				{loadding && <IsLoadding />}

				<div className='container-modal'>
					<form
						className='form-container-eventos'
						onSubmit={newEvent}
					>
						<section className='section-1-form-eventos'>
							<div className='div-file-del-evento'>
								<h2>Imagen de Portada</h2>
								<input
									type='file'
									onChange={handleFileChange}
								/>
							</div>
							<div className='div-nombre-del-media'>
								<h2>Categoria</h2>
								<select name='' id='selecciona'>
									<option value=''>
										selecciona categoria
									</option>
									{categoriasAudio.map(categoria => (
										<option
											value={categoria['id categoria']}
											key={categoria['id categoria']}
										>
											{categoria?.categoria}
										</option>
									))}
								</select>
							</div>
							<div className='div-nombre-del-evento'>
								<h2>Titulo del Articulo</h2>
								<input
									type='text'
									defaultValue={name}
									onChange={e => setName(e.target.value)}
									placeholder='Titulo del Articulo'
								/>
							</div>
							<div className='div-nombre-del-evento'>
								<h2>Autor del Articulo</h2>
								<input
									type='text'
									defaultValue={name}
									onChange={e => setName(e.target.value)}
									placeholder='Autor del Articulo'
								/>
							</div>

							<div className='div-informacion-del-evento'>
								<h2>Informacion:</h2>
								<textarea
									name='descripcion'
									id='descripcion'
									cols='70'
									rows='7'
									placeholder='Escribe la informacion del evento'
									defaultValue={info}
									onChange={e => setInfo(e.target.value)}
								></textarea>
							</div>
						</section>
						<section className='section-2-form-eventos'>
							<div className='div-buttom-del-evento'>
								<button id='cancelar-evento' onClick={cancelar}>
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
											: image || iconImagen
									}
									alt='imagen'
								/>
							</div>
						</section>
					</form>
				</div>
			</>
		</>
	);
};

export default CreaArticulo;
