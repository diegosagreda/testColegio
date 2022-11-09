import React, {useContext} from 'react'
import Tareas from '../tareas/Tareas'
import "../../style/tareas/GestorTareas.css"
import {AppContext} from '../../context/AppContext';


export default function GestorTareas() {  
    
   
    //Importamos los Parceladores
    const {parceladoresFecha} = useContext(AppContext);
     //console.log('Pa: ', parceladores);
  return (
    <>
    <h4 className='titulo-tareasprogrmadas'>Tareas Programadas</h4>
    <div className='GestorTareas'>
      
        { parceladoresFecha.map((el)=>(
            <Tareas hora={el.hora } 
                    fecha={el.fecha} 
                    curso={el.idcurso} 
                    tema={el.tema} 
                    actividad={el.idactividad}
                    asignatura={el.idasignatura}/>
        ))}  
            
    </div>
   
    </>
  )
}
