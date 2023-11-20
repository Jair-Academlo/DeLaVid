import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { MdDateRange } from 'react-icons/md';
import 'react-datepicker/dist/react-datepicker.css';
import './crearEvento.css';

const CrearEvento = () => {
	const [selectedDate, setSelectedDate] = useState(null);

	const handleDateChange = date => {
		setSelectedDate(date);
	};

	return (
		<>
			<div className='container-modal'>
				<div className='form-container-eventos'>
					<div>
						<h2>Crear Evento</h2>
						<p>llena todos los campos para crear el evento</p>
					</div>
					<div className='div-nombre-del-evento'>
						<h2>Nombre del evento</h2>
						<input
							type='text'
							placeholder='Escribe el nombre del evento'
						/>
					</div>
					<div>
						<h2>Fecha</h2>
						<label htmlFor='date'>
							Escribe la fecha del evento <MdDateRange />
						</label>

						<DatePicker
							id='date'
							selected={selectedDate}
							onChange={handleDateChange}
							dateFormat='yyyy-MM-dd'
						/>

						<p>
							Fecha seleccionada:{' '}
							{selectedDate &&
								selectedDate.toISOString().split('T')[0]}
						</p>
					</div>
					<div>
						<h2>Hora</h2>
						<span>Coloca la hora del evento</span>
						<input type='time' />
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
