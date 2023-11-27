import { useState } from 'react';
import { MdDateRange } from 'react-icons/md';
import ReactDatePicker from 'react-datepicker';
import './crearMedia.css';

// eslint-disable-next-line react/prop-types
const CrearMedia = ({ modal }) => {
	const [selectedDate, setSelectedDate] = useState(null);

	const handleDateChange = date => {
		setSelectedDate(date);
	};

	return (
		<>
			<div className='container-modal-media'>
				<div className='form-container-media'>
					<section>
						<div className='div-nombre-del-media'>
							<h2>Nombre del Video</h2>
							<input
								type='text'
								placeholder='Escribe el nombre del video'
							/>
						</div>
						<div className='div-buttom-del-media'>
							<button id='cancelar' onClick={() => modal(false)}>
								Cancelar
							</button>
							<button onClick={() => modal(false)}>
								Guardar
							</button>
						</div>
					</section>
					<div className='div-fecha-del-media'>
						<h2>Fecha</h2>

						<label htmlFor='date'>
							Selecciona la fecha del video{' '}
							<span>
								{selectedDate &&
									selectedDate.toISOString().split('T')[0]}
							</span>{' '}
							<MdDateRange />
						</label>

						<ReactDatePicker
							id='date'
							selected={selectedDate}
							onChange={handleDateChange}
							dateFormat='yyyy-MM-dd'
						/>
					</div>
					<div className='div-hora-del-media'>
						<h2>Hora</h2>
						<div>
							<label>
								Coloca la hora del video{' '}
								<input
									type='time'
									placeholder='Coloca la hora del video'
								/>
							</label>
						</div>
					</div>

					<div className='div-file-del-media'>
						<span>Imagen del video</span> <input type='file' />
					</div>
					<div className='div-informacion-del-media'>
						<h2>Informacion:</h2>
						<textarea
							name='descripcion'
							id='descripcion'
							cols='70'
							rows='5'
							placeholder='Escribe la informacion del video'
						></textarea>
					</div>
				</div>
			</div>
		</>
	);
};

export default CrearMedia;
