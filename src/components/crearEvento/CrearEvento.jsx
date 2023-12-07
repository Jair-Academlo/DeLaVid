import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage';
import { getDatabase, ref as DatabaseRef, set } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { MdDateRange } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { setEditar } from '../../store/data/editarSlice';
import DatePicker from 'react-datepicker';
import IsLoadding from '../isLoadding/IsLoadding';
import { app } from '../../config/firebase';
import 'react-datepicker/dist/react-datepicker.css';
import './crearEvento.css';

// eslint-disable-next-line react/prop-types
const CrearEvento = ({ modal }) => {
	const data = useSelector(state => state.data);
	const editar = useSelector(state => state.editar);
	const dispatch = useDispatch();
	const storage = getStorage(app);

	console.log(data);

	const [name, setName] = useState('');
	const [info, setInfo] = useState('');
	const [selectedDate, setSelectedDate] = useState(null);
	const [time, setTime] = useState('');
	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null);
	const [loadding, setLoadding] = useState(false);

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
	}, [editar, data]);

	const handleDateChange = date => {
		setSelectedDate(date);
	};

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
						imagen: imageUrl,
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
							<div className='div-nombre-del-evento'>
								<h2>Nombre del evento</h2>
								<input
									type='text'
									defaultValue={name}
									onChange={e => setName(e.target.value)}
									placeholder='Escribe el nombre del evento'
								/>
							</div>
							<div className='div-fecha-del-evento'>
								<h2>Fecha</h2>

								<label htmlFor='date'>
									Selecciona la fecha del evento{' '}
									<span>
										{selectedDate
											? selectedDate
													.toISOString()
													.split('T')[0]
											: editar
											? data.fecha
											: ' '}
									</span>{' '}
									<MdDateRange />
								</label>

								<DatePicker
									id='date'
									value={
										selectedDate ? selectedDate : data.fecha
									}
									selected={selectedDate}
									onChange={handleDateChange}
									dateFormat='yyyy-MM-dd'
								/>
							</div>
							<div className='div-hora-del-evento'>
								<h2>Hora</h2>
								<div>
									<label>
										Coloca la hora del evento{' '}
										<input
											type='time'
											placeholder='Coloca la hora del evento'
											defaultValue={time}
											onChange={e =>
												setTime(e.target.value)
											}
										/>
									</label>
								</div>
							</div>

							<div className='div-file-del-evento'>
								<span>Imagen del evento</span>{' '}
								<input
									type='file'
									onChange={handleFileChange}
								/>
							</div>
							<div className='div-informacion-del-evento'>
								<h2>Informacion:</h2>
								<textarea
									name='descripcion'
									id='descripcion'
									cols='70'
									rows='5'
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
								<img src={data.imagen} alt='imagen' />
							</div>
						</section>
					</form>
				</div>
			</>
		</>
	);
};

export default CrearEvento;
