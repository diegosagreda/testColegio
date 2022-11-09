import React from 'react'
import '../../style/modal/ModalCargarVista.css';
import {BallTriangle} from 'react-loader-spinner' 

const ModalCargaVista = () => {
    return (
        <div className='modalloader'>
            <BallTriangle color="#00BFFF" height={80} width={80} />
            <h3 style={{color:'white'}}>Cargando....</h3>
        </div>
    )
}

export default ModalCargaVista;
