import './crearEvento.css';

const CrearEvento = () => {
	return (
		<>
			<div className='container-modal'>
				<div className='form-container-eventos'>
					<div>
						<h2>Crear Evento</h2>
						<p>llena todos los campos para crear el evento</p>
					</div>
					<div>
						<h2>Nombre del eventos</h2>
						<input
							type='text'
							placeholder='Escribe el nombre del evento'
						/>
					</div>
					<div>
						<h2>Fecha del evento</h2>
						<span>Escribe la fecha del evento</span>
						<input type='date' />
					</div>
					<div>
						<h2>Hora del evento</h2>
						<span>Coloca la hora del evento</span>
						<input type='time' />
					</div>
					<div>
						<span>imagen del evento</span>
						<input type='file' />
					</div>
					<div>
						<p>informacion:</p>
						<textarea
							name='descripcion'
							id='descripcion'
							cols='20'
							rows='5'
							placeholder='Escribe la informacion del evento'
						></textarea>
					</div>
				</div>
			</div>
		</>
	);
};

export default CrearEvento;
