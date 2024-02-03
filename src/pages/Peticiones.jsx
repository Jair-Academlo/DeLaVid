import { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { BsFillTrashFill } from 'react-icons/bs';
import { getDatabase, ref, child, get, remove } from 'firebase/database';
import { database } from '../config/firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setData } from '../store/data/dataSlice';
import N1 from '../imgs/icon.png';
import '../styles/peticiones.css';

const Peticiones = () => {
	const [peticionesData, setPeticionesData] = useState([]);

	const { id = 1 } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		fetchData();
	}, []);

	const eliminarPeticion = id => {
		const refPath =
			'/projects/proj_cer3wPMCkxSWWePnENPiZL/data/Peticiones/' + id;

		remove(ref(database, refPath))
			.then(() => {
				fetchData();
			})
			.catch(error => {
				console.error('Error al eliminar la peticion', error);
			});
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
					'/projects/proj_cer3wPMCkxSWWePnENPiZL/data/Peticiones/'
				)
			);

			if (snapshot.exists()) {
				const data = snapshot.val();
				const dataArray = Object.entries(data).map(
					([key, value], index) => ({
						serial: index + 1,
						id: key,
						...value,
					})
				);
				setPeticionesData(dataArray);
			} else {
				console.log('No hay datos en la colección "Peticiones"');
			}
		} catch (error) {
			console.error('Error al obtener los datos:', error);
		}
	};

	return (
		<>
			<section>
				{peticionesData.map(peticion => (
					<div
						key={peticion['id peticion']}
						className='container-eventos-card'
						onClick={() => {
							navigate(`/peticiones/${id}`);
							dirigirDetallesEvento(peticion);
						}}
					>
						<div className='div-eventos-imagen'>
							<img src={N1} alt='imagen' />
						</div>
						<div className='div-eventos-descripcion'>
							<p>Nombre: {peticion?.nombre}</p>
							<p>
								Telefono o Email: {peticion['email o telefono']}
							</p>
							<p>No. solicitud #00{peticion.serial}</p>
							<p>{new Date(peticion?.fecha).toLocaleString()}</p>
						</div>
						<div className='div-eventos-button'>
							<button id='editar'>
								detalles
								<span>
									<MdEdit />
								</span>
							</button>
							<button
								id='eliminar'
								onClick={e => {
									e.stopPropagation();
									eliminarPeticion(peticion.id);
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
		</>
	);
};

export default Peticiones;
