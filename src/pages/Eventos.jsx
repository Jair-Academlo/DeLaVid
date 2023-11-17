import N1 from '../imgs/logo.png';
import '../styles/eventos.css';

const Eventos = () => {
	return (
		<>
			<div className='container-eventos-card'>
				<div>
					<img src={N1} alt='imagen' width={100} height={100} />
				</div>
				<div>
					<p>hola</p>
					<p>{new Date().toLocaleDateString()}</p>
				</div>
				<div>
					<button>editar</button>
					<button>eliminar</button>
				</div>
			</div>
		</>
	);
};

export default Eventos;
