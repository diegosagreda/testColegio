import React from 'react'
import '../../style/docente/Curriculo.css'


export default function Curriculo() {
  return (
    <div className='Curriculo'>  
          <label>Agregar Curriculo </label> 
          <input
            type="file"
          />
        <textarea className='vista-curriculo' typeof='tex' cols="130" rows="30"   ></textarea>
    </div>
  )
}
