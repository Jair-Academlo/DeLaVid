import N1 from '../imgs/logo.png';
import { MdEdit } from 'react-icons/md';
import { BsFillTrashFill } from 'react-icons/bs';
import { IoIosAddCircle } from 'react-icons/io';

import '../styles/eventos.css';
import { useState } from 'react';
import CrearEvento from '../components/crearEvento/CrearEvento';

const Eventos = () => {
	const [modal, setModal] = useState(false);

	return (
		<>
			{modal ? (
				<CrearEvento />
			) : (
				<div>
					<section>
						<div className='container-eventos-card'>
							<div className='div-eventos-imagen'>
								<img src={N1} alt='imagen' />
							</div>
							<div className='div-eventos-descripcion'>
								<p>
									Este es un ejemplo de prueba en la
									descripcion 1.
								</p>
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
								<p>
									Este es un ejemplo de prueba en la
									descripcion 2.
								</p>
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
								<p>
									Este es un ejemplo de prueba en la
									descripcion 3.
								</p>
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

export default Eventos;
