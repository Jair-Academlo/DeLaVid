import { BsFillTrashFill } from 'react-icons/bs';
import { IoIosAddCircle } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import CrearEvento from '../components/crearEvento/CrearEvento';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import N1 from '../imgs/logo.png';

const Media = () => {
	const { id = 1 } = useParams();
	const navigate = useNavigate();
	const [modal, setModal] = useState(false);

	return (
		<>
			{modal ? (
				<CrearEvento modal={setModal} />
			) : (
				<div>
					<section>
						<div
							className='container-eventos-card'
							onClick={() => {
								navigate(`/eventos/${id}`);
							}}
						>
							<div className='div-eventos-imagen'>
								<img src={N1} alt='imagen' />
							</div>
							<div className='div-eventos-descripcion'>
								<p>Nombre del Audio</p>
								<p>Autor</p>
								<p>{new Date().toLocaleDateString()}</p>
							</div>
							<div className='div-eventos-button'>
								<button id='editar'>
									Editar
									<span>
										<MdEdit />
									</span>
								</button>
								<button id='eliminar'>
									Eliminar{' '}
									<span>
										<BsFillTrashFill />{' '}
									</span>
								</button>
							</div>
						</div>
						<div className='container-eventos-card'>
							<div className='div-eventos-imagen'>
								<img src={N1} alt='imagen' />
							</div>
							<div className='div-eventos-descripcion'>
								<p>Nombre del Audio</p>
								<p>Autor</p>
								<p>{new Date().toLocaleDateString()}</p>
							</div>
							<div className='div-eventos-button'>
								<button id='editar'>
									Editar{' '}
									<span>
										<MdEdit />
									</span>
								</button>
								<button id='eliminar'>
									Eliminar
									<span>
										<BsFillTrashFill />{' '}
									</span>
								</button>
							</div>
						</div>
						<div className='container-eventos-card'>
							<div className='div-eventos-imagen'>
								<img src={N1} alt='imagen' />
							</div>
							<div className='div-eventos-descripcion'>
								<p>Nombre del Audio</p>
								<p>Autor</p>
								<p>{new Date().toLocaleDateString()}</p>
							</div>
							<div className='div-eventos-button'>
								<button id='editar'>
									Editar{' '}
									<span>
										<MdEdit />
									</span>
								</button>
								<button id='eliminar'>
									Eliminar{' '}
									<span>
										<BsFillTrashFill />{' '}
									</span>
								</button>
							</div>
						</div>
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

export default Media;
