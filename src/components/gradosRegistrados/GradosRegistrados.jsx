import React, {useContext,useState} from 'react'
import "../../style/gradosRegistrados/GradosRegistrados.css"
import  {AppContext} from '../../context/AppContext';
import { PeticioneApi} from '../../helpers/PeticionesApi';
import ModalSeleccionAsignatura from '../modal/ModalSeleccionAsignatura';

export default function GradosRegistrados({grado}) {
  
  const {cargarAsignaturasCurso,cargarEstudiantesCurso} = PeticioneApi();
  const {setCurso,docente} = useContext(AppContext);
  const [isOpen, setisOpen] = useState(false);

  const openModal = () => setisOpen(true);
  const closeModal = () => setisOpen(false);

  const handleSeleccionarGrado = async()=>{
    await cargarAsignaturasCurso(docente.iddocente, grado.idcurso);
    await cargarEstudiantesCurso(grado.idcurso)

    openModal();
    setCurso(grado);
  }
 
  return (
    <div className='GradosRegistrados'>
        {isOpen && <ModalSeleccionAsignatura isOpen={isOpen} 
                                     closeModal={closeModal}/>}
        <div className="tarea-informacion">           
          <button onClick={handleSeleccionarGrado} type="button">{grado.grado+grado.grupo}</button>              
        </div>

      </div>
  )
}
