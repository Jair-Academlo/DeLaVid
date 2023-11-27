import './crearMedia.css';

// eslint-disable-next-line react/prop-types
const CrearMedia = ({ modal }) => {
	return (
		<>
			<div className='container-modal-media'>
				<div className='form-container-media'>
					<section>
						<div className='div-nombre-del-media'>
							<h2>Titulo del video</h2>
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
						<h2>Autor</h2>
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

					<div className='div-file-del-media'>
						<span>Imagen de Portada</span> <input type='file' />
					</div>
					<div className='div-nombre-del-media'>
						<h2>Escribe la url del video</h2>
						<input type='text' placeholder='URL del video' />
					</div>
				</div>
			</div>
		</>
	);
};

export default CrearMedia;
