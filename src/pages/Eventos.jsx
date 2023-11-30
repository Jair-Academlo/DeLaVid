import { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { BsFillTrashFill } from 'react-icons/bs';
import { IoIosAddCircle } from 'react-icons/io';
import CrearEvento from '../components/crearEvento/CrearEvento';
import { useNavigate, useParams } from 'react-router-dom';
import { getDatabase, ref, child, get, remove } from 'firebase/database';
import { database } from '../config/firebase';
import { setData } from '../store/data/dataSlice';
import { useDispatch } from 'react-redux';
import '../styles/eventos.css';

const Eventos = () => {
	const [eventosData, setEventosData] = useState([]);
	const { id = 1 } = useParams();
	const navigate = useNavigate();
	const [modal, setModal] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const dbRef = ref(getDatabase());
				const snapshot = await get(
					child(
						dbRef,
						'projects/proj_cer3wPMCkxSWWePnENPiZL/data/Eventos'
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
					setEventosData(dataArray);
				} else {
					console.log('No hay datos en la colección "Eventos"');
				}
			} catch (error) {
				console.error('Error al obtener los datos:', error);
			}
		};

		fetchData();
	}, []);

	const eliminarEvento = id => {
		const refPath =
			'/projects/proj_cer3wPMCkxSWWePnENPiZL/data/Eventos/' + id;

		remove(ref(database, refPath))
			.then(() => {
				console.log('Evento eliminado exitosamente');
				const fetchData = async () => {
					try {
						const dbRef = ref(getDatabase());
						const snapshot = await get(
							child(
								dbRef,
								'projects/proj_cer3wPMCkxSWWePnENPiZL/data/Eventos'
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
							setEventosData(dataArray);
						} else {
							console.log(
								'No hay datos en la colección "Eventos"'
							);
						}
					} catch (error) {
						console.error('Error al obtener los datos:', error);
					}
				};
				fetchData();
			})
			.catch(error => {
				console.error('Error al eliminar el evento:', error);
			});
	};

	const editar = data => {
		setModal(!modal);
		dispatch(setData(data));
	};

	return (
		<>
			{modal ? (
				<CrearEvento modal={setModal} />
			) : (
				<div>
					<section>
						{eventosData.map(evento => (
							<div
								key={evento.id}
								className='container-eventos-card'
								onClick={() => {
									navigate(`/eventos/${id}`);
								}}
							>
								<div className='div-eventos-imagen'>
									<img src={evento.imagen} alt='imagen' />
								</div>
								<div className='div-eventos-descripcion'>
									<p>{evento['nombre del evento']}</p>
									<p>{evento.fecha}</p>
								</div>
								<div className='div-eventos-button'>
									<button
										id='editar'
										onClick={e => {
											e.stopPropagation();
											editar(evento);
										}}
									>
										Editar
										<span>
											<MdEdit />
										</span>
									</button>
									<button
										id='eliminar'
										onClick={e => {
											e.stopPropagation();
											eliminarEvento(evento.id);
										}}
									>
										Eliminar{' '}
										<span>
											<BsFillTrashFill />{' '}
										</span>
									</button>
								</div>
							</div>
						))}
					</section>

					<section className='button-crear-evento'>
						<button onClick={() => setModal(!modal)}>
							<IoIosAddCircle />
						</button>
					</section>
				</div>
			)}
		</>
	);
};

export default Eventos;
