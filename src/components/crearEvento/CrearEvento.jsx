import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { MdDateRange } from 'react-icons/md';
import 'react-datepicker/dist/react-datepicker.css';
import './crearEvento.css';

// eslint-disable-next-line react/prop-types
const CrearEvento = ({ modal }) => {
	const [selectedDate, setSelectedDate] = useState(null);

	const handleDateChange = date => {
		setSelectedDate(date);
	};

	return (
		<>
			<div className='container-modal'>
				<div className='form-container-eventos'>
					<section>
						<div className='div-nombre-del-evento'>
							<h2>Nombre del evento</h2>
							<input
								type='text'
								placeholder='Escribe el nombre del evento'
							/>
						</div>
						<div className='div-buttom-del-evento'>
							<button id='cancelar' onClick={() => modal(false)}>
								Cancelar
							</button>
							<button onClick={() => modal(false)}>
								Guardar
							</button>
						</div>
					</section>
					<div className='div-fecha-del-evento'>
						<h2>Fecha</h2>

						<label htmlFor='date'>
							Selecciona la fecha del evento{' '}
							<span>
								{selectedDate &&
									selectedDate.toISOString().split('T')[0]}
							</span>{' '}
							<MdDateRange />
						</label>

						<DatePicker
							id='date'
							selected={selectedDate}
							onChange={handleDateChange}
							dateFormat='yyyy-MM-dd'
						/>
					</div>
					<div className='div-hora-del-evento'>
						<h2>Hora</h2>
						<div>
							<label>
								Coloca la hora del evento{' '}
								<input
									type='time'
									placeholder='Coloca la hora del evento'
								/>
							</label>
						</div>
					</div>

					<div className='div-file-del-evento'>
						<span>Imagen del evento</span> <input type='file' />
					</div>
					<div className='div-informacion-del-evento'>
						<h2>Informacion:</h2>
						<textarea
							name='descripcion'
							id='descripcion'
							cols='70'
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
