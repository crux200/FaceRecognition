import React from 'react';
import './ImageLinkForm.css'
const ImageLinkForm=({onInputChange, onButtonClick})=>{
	return (
		<div>
			<p className='f3'>
				{'This is a magic brain and will detect faces from the pictures. Go try!!'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-s'>
					<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
					<button className='w-30 grow f4 link ph3 dib white bg-light-purple' onClick={onButtonClick}> Detect </button>
				</div>
			</div>
		</div>

		);
}

export default ImageLinkForm;
