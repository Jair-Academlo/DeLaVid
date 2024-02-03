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

	const [titulo, setTitulo] = useState('');
	const [autor, setAutor] = useState('');
	const [info, setInfo] = useState('');
	const [categoria, setCategoria] = useState('');
	const [categoriaID, setCategoriaID] = useState({});
	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null);
	const [loadding, setLoadding] = useState(false);
	const [categoriasArticulo, setCategoriaArticulo] = useState([]);

	useEffect(() => {
		if (editar) {
			// Asegúrate de que data esté definido
			setTitulo(data.titulo);
			setAutor(data.autor);
			setInfo(data['contenido del articulo']);
			setCategoria(data.categoria);
			setImage(data['imagen del articulo']);
		} else {
			setTitulo('');
			setAutor('');
			setInfo('');
			setCategoria('');
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
							'id articulo': editar ? data.id : id,
							titulo: titulo,
							autor: autor,
							'categoria id': categoriaID.id,
							categoria: categoriaID.categoria,
							'imagen del articulo': imageUrl || data.imagen,
							'contenido del articulo': info,
							fecha: timestamp.getTime().toString(),
						}
					);

					setTitulo('');
					setAutor('');
					setInfo('');
					setCategoria('');
					setImage(null);
					dispatch(setEditar(false));
					setLoadding(false);
					modal(false);
				}, 3000);
			} else {
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
							'id articulo': editar ? data.id : id,
							titulo: titulo,
							autor: autor,
							'categoria id': categoriaID.id,
							categoria: categoriaID.categoria,
							'imagen del articulo': data.imagen,
							'contenido del articulo': info,

							'nombre del evento': name,

							imagen: data.imagen,
							'informacion del evento': info,
							'id evento': editar ? data.id : id,
						}
					);

					setTitulo('');
					setAutor('');
					setInfo('');
					setCategoria('');
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
		setTitulo('');
		setAutor('');
		setInfo('');
		setCategoria('');
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
				setCategoriaArticulo(dataArray);
			} else {
				console.log('No hay datos en la colección "Categoria Audio"');
			}
		} catch (error) {
			console.error('Error al obtener los datos:', error);
		}
	};

	const filtercategory = categoriasArticulo;

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
								<select
									name=''
									id='selecciona'
									onChange={e =>
										setCategoriaID(
											filtercategory.find(
												c => c.id === e.target.value
											)
										)
									}
								>
									<option>
										{editar
											? categoria
											: 'selecciona categoria'}
									</option>
									{categoriasArticulo.map(categoria => (
										<option
											key={categoria['id categoria']}
											value={categoria['id categoria']}
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
									defaultValue={titulo}
									onChange={e => setTitulo(e.target.value)}
									placeholder='Titulo del Articulo'
								/>
							</div>
							<div className='div-nombre-del-evento'>
								<h2>Autor del Articulo</h2>
								<input
									type='text'
									defaultValue={autor}
									onChange={e => setAutor(e.target.value)}
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
