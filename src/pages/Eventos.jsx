import N1 from '../imgs/logo.png';
import '../styles/eventos.css';

const Eventos = () => {
	return (
		<>
			<div className='container-eventos-card'>
				<div className='div-eventos-imagen'>
					<img src={N1} alt='imagen' />
				</div>
				<div className='div-eventos-descripcion'>
					<p>Este es un ejemplo de prueba en la descripcion 1.</p>
					<p>{new Date().toLocaleDateString()}</p>
				</div>
				<div className='div-eventos-button'>
					<button id='editar'>editar</button>
					<button id='eliminar'>eliminar</button>
				</div>
			</div>
			<div className='container-eventos-card'>
				<div className='div-eventos-imagen'>
					<img src={N1} alt='imagen' />
				</div>
				<div className='div-eventos-descripcion'>
					<p>Este es un ejemplo de prueba en la descripcion 2.</p>
					<p>{new Date().toLocaleDateString()}</p>
				</div>
				<div className='div-eventos-button'>
					<button id='editar'>editar</button>
					<button id='eliminar'>eliminar</button>
				</div>
			</div>
			<div className='container-eventos-card'>
				<div className='div-eventos-imagen'>
					<img src={N1} alt='imagen' />
				</div>
				<div className='div-eventos-descripcion'>
					<p>Este es un ejemplo de prueba en la descripcion 3.</p>
					<p>{new Date().toLocaleDateString()}</p>
				</div>
				<div className='div-eventos-button'>
					<button id='editar'>editar</button>
					<button id='eliminar'>eliminar</button>
				</div>
			</div>
		</>
	);
};

export default Eventos;
