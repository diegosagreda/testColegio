import React from 'react'
import TablaParcelador from './TablaParcelador'
import useModal from '../../hooks/useModal'
import '../../style/docente/Parcelador.css'
import ModalCrearParcelador from '../../components/modal/ModalCrearParcelador'

export default function Parcelador() {
    const[modal6, abrirModal6, cerrarModal6]=useModal(false)
    const handleAbrirModal6=(e)=>{
        e.preventDefault();
        abrirModal6();
      }
  return (  
      <div className='Parcelador'>   
       {modal6? <ModalCrearParcelador cerrarModal={cerrarModal6}/>:null}
      <div className='filtro-parcelador'>
      {/* <h3>Periodo</h3>
          <select>
              <option>--Seleccionar--</option>
              <option>I</option>
              <option>II</option>
              <option>III</option>
              <option>IV</option>
          </select> */}
          <button onClick={handleAbrirModal6}>Crear Parcelador</button>
        
      </div>
          <TablaParcelador></TablaParcelador>
      </div>

  )
}
