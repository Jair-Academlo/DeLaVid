import { BsFillTrashFill } from 'react-icons/bs';
import { IoIosAddCircle } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CrearMedia from '../components/crearMedia/CrearMedia';
import N1 from '../imgs/logo.png';
import '../styles/mediaAudio.css';

const Media = () => {
	const { id = 1 } = useParams();
	const navigate = useNavigate();
	const [modal, setModal] = useState(false);

	return (
		<>
			{modal ? (
				<CrearMedia modal={setModal} />
			) : (
				<div>
					<section>
						<div
							className='container-media-card'
							onClick={() => {
								navigate(`/media/${id}`);
							}}
						>
							<div className='div-media-imagen'>
								<img src={N1} alt='imagen' />
							</div>
							<div className='div-media-descripcion'>
								<p>Nombre del Audio</p>
								<p>Autor</p>
								<p>{new Date().toLocaleDateString()}</p>
							</div>
							<div className='div-media-button'>
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
						<div className='container-media-card'>
							<div className='div-media-imagen'>
								<img src={N1} alt='imagen' />
							</div>
							<div className='div-media-descripcion'>
								<p>Nombre del Audio</p>
								<p>Autor</p>
								<p>{new Date().toLocaleDateString()}</p>
							</div>
							<div className='div-media-button'>
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
						<div className='container-media-card'>
							<div className='div-media-imagen'>
								<img src={N1} alt='imagen' />
							</div>
							<div className='div-media-descripcion'>
								<p>Nombre del Audio</p>
								<p>Autor</p>
								<p>{new Date().toLocaleDateString()}</p>
							</div>
							<div className='div-media-button'>
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

					<section className='button-crear-media'>
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
