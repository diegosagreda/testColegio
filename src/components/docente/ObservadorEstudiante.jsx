import React from 'react';
import useModal from '../../hooks/useModal';
import '../../style/docente/ObservadorEstudiante.css'
import ModalCrearObservador from '../../components/modal/ModalCrearObservador';

export default function ObservadorEstudiante() {
  const[modal5, abrirModal5, cerrarModal5]=useModal(false)
  const handleAbrirModal4=(e)=>{
    e.preventDefault();
    abrirModal5();
  }

  return (
    <>
    <div className='ObservadorEstudiante'>
    {modal5? <ModalCrearObservador cerrarModal={cerrarModal5}/>:null}
      <div className='filtrar-crear'>
        <input placeholder='Bucar'></input>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
        <button onClick={handleAbrirModal4}>Crear Observador</button>
      </div>
    </div>

    </>
  )
}
