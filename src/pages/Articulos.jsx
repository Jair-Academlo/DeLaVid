import { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { BsFillTrashFill } from 'react-icons/bs';
import { IoIosAddCircle } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { getDatabase, ref, child, get, remove } from 'firebase/database';
import { database } from '../config/firebase';
import { setData } from '../store/data/dataSlice';
import { setEditar } from '../store/data/editarSlice';
import { useDispatch } from 'react-redux';
import CrearArticulo from '../components/crearArticulo/CreaArticulo';
import '../styles/articulos.css';

const Articulos = () => {
	const [eventosData, setEventosData] = useState([]);
	const { id = 1 } = useParams();
	const navigate = useNavigate();
	const [modal, setModal] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		fetchData();
	}, [modal]);

	const eliminarEvento = id => {
		const refPath =
			'/projects/proj_cer3wPMCkxSWWePnENPiZL/data/Articulos/' + id;

		remove(ref(database, refPath))
			.then(() => {
				fetchData();
			})
			.catch(error => {
				console.error('Error al eliminar el articulo:', error);
			});
	};

	const editarEvento = data => {
		setModal(!modal);
		dispatch(setData(data));
		dispatch(setEditar(true));
	};

	const dirigirDetallesEvento = data => {
		dispatch(setData(data));
	};

	const fetchData = async () => {
		try {
			const dbRef = ref(getDatabase());
			const snapshot = await get(
				child(
					dbRef,
					'/projects/proj_cer3wPMCkxSWWePnENPiZL/data/Articulos'
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

	return (
		<>
			{modal ? (
				<CrearArticulo modal={setModal} />
			) : (
				<div>
					<section>
						{eventosData.map(articulo => (
							<div
								key={articulo['id articulo']}
								className='container-eventos-card'
								onClick={() => {
									navigate(`/articulos/${id}`);
									dirigirDetallesEvento(articulo);
								}}
							>
								<div className='div-eventos-imagen'>
									<img
										src={articulo['imagen del articulo']}
										alt='imagen'
									/>
								</div>
								<div className='div-eventos-descripcion'>
									<p>{articulo.titulo}</p>
									<p>{articulo.fecha}</p>
								</div>
								<div className='div-eventos-button'>
									<button
										id='editar'
										onClick={e => {
											e.stopPropagation();
											editarEvento(articulo);
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
											eliminarEvento(
												articulo['id articulo']
											);
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

export default Articulos;
