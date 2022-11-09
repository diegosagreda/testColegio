import React, {useContext} from 'react'

import "../../style/gradosRegistrados/GestorGrados.css"
import GradosRegistrados from './GradosRegistrados';
import  {AppContext} from '../../context/AppContext';


export default function GestorGrados() {

  const {cursos} = useContext(AppContext);

  return (
    <>

    <div>
    <h4 className='titulo-gradosRegistrados'>Grados Registrados</h4>
    </div>
    
    
    <div className='GestorGrados'>

        {cursos.map((el)=>(                
            <GradosRegistrados key={el.idcurso} grado={el}></GradosRegistrados> 
        ))}      
    </div>
   
    </>
  )
}
