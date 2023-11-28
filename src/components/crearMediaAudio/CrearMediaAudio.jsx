import {
	AiFillFastBackward,
	AiFillFastForward,
	AiFillPlayCircle,
} from 'react-icons/ai';

import './crearMediaAudio.css';

// eslint-disable-next-line react/prop-types
const CrearMediaAudio = ({ modal }) => {
	return (
		<>
			<div className='container-modal-media'>
				<div className='form-container-media'>
					<section>
						<div className='div-nombre-del-media'>
							<h2>Titulo del Audio</h2>
							<input type='text' placeholder='Titulo' />
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
					<div className='div-nombre-del-media'>
						<h2>Autor del audio</h2>
						<input type='text' placeholder='Autor' />
					</div>
					<div className='div-informacion-del-media'>
						<h2>Descripcion:</h2>
						<textarea
							name='descripcion'
							id='descripcion'
							cols='70'
							rows='5'
							placeholder='Descripcion del video'
						></textarea>
					</div>
					<div className='div-nombre-del-media'>
						<h2>Categoria</h2>
						<input
							type='text'
							placeholder='Selecciona una categoria'
						/>
					</div>

					<div className='div-file-del-media-1'>
						<span>Audio</span>{' '}
						<input
							type='file'
							id='audio'
							style={{ display: 'none' }}
						/>
						<label
							htmlFor='audio'
							id='label-audio-crear-media-audio'
						>
							<AiFillFastBackward /> <AiFillPlayCircle />{' '}
							<AiFillFastForward />
						</label>
					</div>
					<div className='div-file-del-media'>
						<span>Imagen de Portada</span> <input type='file' />
					</div>
				</div>
			</div>
		</>
	);
};

export default CrearMediaAudio;
