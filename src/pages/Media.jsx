import CrearMedia from '../components/crearMedia/CrearMedia';
import { getDatabase, ref, child, get, remove } from 'firebase/database';
import { database } from '../config/firebase';
import { BsFillTrashFill } from 'react-icons/bs';
import { IoIosAddCircle } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { setData } from '../store/data/dataSlice';
import { setEditar } from '../store/data/editarSlice';
import { useDispatch } from 'react-redux';
import '../styles/media.css';

const Media = () => {
	const [mediaVideoData, setMediaVideoData] = useState([]);
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
						'projects/proj_cer3wPMCkxSWWePnENPiZL/data/Media'
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
					setMediaVideoData(dataArray);
				} else {
					console.log('No hay datos en la colección "Media"');
				}
			} catch (error) {
				console.error('Error al obtener los datos:', error);
			}
		};

		fetchData();
	}, [modal]);

	const eliminarMediaVideo = id => {
		const refPath =
			'/projects/proj_cer3wPMCkxSWWePnENPiZL/data/Media/' + id;

		remove(ref(database, refPath))
			.then(() => {
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
							setMediaVideoData(dataArray);
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

	const editarMediaVideo = data => {
		setModal(!modal);
		dispatch(setData(data));
		dispatch(setEditar(true));
	};

	const dirigirDetallesMediaVideo = data => {
		dispatch(setData(data));
	};

	return (
		<>
			{modal ? (
				<CrearMedia modal={setModal} />
			) : (
				<div>
					<section>
						{mediaVideoData.map(video => (
							<>
								<div
									key={video.id}
									className='container-media-card'
									onClick={() => {
										navigate(`/media/${id}`);
										dirigirDetallesMediaVideo(video);
									}}
								>
									<div className='div-media-imagen'>
										<img src={video.imagen} alt='imagen' />
									</div>
									<div className='div-media-descripcion'>
										<p>{video['titulo audio']}</p>
										<p>{video['autor del audio']}</p>
										<p>
											{new Date().toLocaleDateString(
												video.fecha
											)}
										</p>
									</div>
									<div className='div-media-button'>
										<button
											id='editar'
											onClick={e => {
												e.stopPropagation();
												editarMediaVideo(video);
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
												eliminarMediaVideo(video.id);
											}}
										>
											Eliminar{' '}
											<span>
												<BsFillTrashFill />{' '}
											</span>
										</button>
									</div>
								</div>
							</>
						))}
					</section>

					<section className='button-crear-media'>
						<button
							onClick={() => {
								setModal(!modal);
								dispatch(setEditar(false));
							}}
						>
							<IoIosAddCircle />
						</button>
					</section>
				</div>
			)}
		</>
	);
};

export default Media;
