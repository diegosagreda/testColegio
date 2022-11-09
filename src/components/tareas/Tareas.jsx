import React, {useState} from 'react'
import "../../style/tareas/Tareas.css"
import {PeticioneApi} from '../../helpers/PeticionesApi'

export default function Tareas({hora,fecha,curso,tema,actividad,asignatura}) {
  const {getCurso,getActividad,getAsignatura} = PeticioneApi();
  return (
    <div className='Tareas'>
        <div className="tarea-info">
          <p>Curso: <span>{getCurso(curso).grado}-{getCurso(curso).grupo}</span></p>      
          <p>Tema: <span>{tema}</span></p>
          <p>Asignatura: <span>{getAsignatura(asignatura).nombre}</span></p>
          <p>Actividad: <span>{getActividad(actividad).nombre}</span></p>
          
        </div>
        <div className="tarea-hora">
          <p>{fecha}</p>
          <p>{hora}</p>    
        </div>

        {/* <div>
          <a className='btn-eliminar-tarea'>X</a>
        </div> */}

      </div>
  )
}
