import React, {useState, useContext} from 'react';
import { AppContext } from '../../context/AppContext'
import {PeticioneApi} from '../../helpers/PeticionesApi';
import '../../style/modal/ModalRegistrarCurso.css'
import GestorGrados from '../gradosRegistrados/GestorGrados';

const ModalRegistroCurso = ({cerrarModal}) => {

    const {docente} = useContext(AppContext);
    const {registrarCursoYAsignatura,cargarCursosDocente,seleccionarAsignatura,seleccionarCurso,cargarCursosAsignaturas,cargarAsignaturas} = PeticioneApi();
    

    const handleCerrarModal=(e)=>{
        e.preventDefault();
        cerrarModal();
      }
    const [dataCurso, setdataCurso] = useState({
        grado:"",
        grupo:"",
        materia:"",
        iddocente: docente.iddocente
      })
      const handleChange=(e)=>{
        setdataCurso({
          ...dataCurso,
          [e.target.name]:e.target.value
        })
      }
      const handleGuardarCurso =async (e)=>{
        e.preventDefault();
        
        const response = await registrarCursoYAsignatura(dataCurso);
        
        //Formateamos la header con la asignatura y el grado registrado
        await seleccionarCurso(response.idcurso);
        await seleccionarAsignatura(response.idasignatura);
        //Una vez agregamos el curso refrescamos la vista principal
        await cargarCursosDocente(docente.iddocente);

        ///-----------
        await cargarCursosAsignaturas(docente.iddocente);
        await cargarAsignaturas();
      }
    
    return (

        <>      
            <div className="inf-curso">                 
                <div className="contenedor-inf-curso">
                <section className=" encabezado-modal-actividad">
                <GestorGrados/>
                        <a className="salir-modal" onClick={handleCerrarModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"      
                                viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                        </a>  
                        </section>
                        <div className='curso'>
                              <div className='cont-curso'>   
                                  <h3>Curso</h3>                                                      
                                  <select name='grado' onChange={handleChange}>
                                    <option>--Seleccione--</option>
                                    <option value={'1'}>1°</option>
                                    <option value={'2'}>2°</option>
                                    <option value={'3'}>3°</option>
                                    <option value={'4'}>4°</option>
                                    <option value={'5'}>5°</option>
                                    <option value={'6'}>6°</option>
                                    <option value={'7'}>7°</option>
                                    <option value={'8'}>8°</option>
                                    <option value={'9'}>9°</option>
                                    <option value={'10'}>10°</option>
                                    <option value={'11'}>11°</option>
                                  </select>
                                  <h3>Grupo</h3>
                                  <input name = 'grupo' type="text" onChange={handleChange}/>
                                  <h3>Materia</h3>
                                  <input name='materia' type="text" className='materia' onChange={handleChange}/>
                              </div>
                              <div className='btn-guardar-curso'>
                                  <button type='button' onClick={handleGuardarCurso}>Guardar Curso</button>
                              </div>                              
                          </div>
                                       

                </div>
            </div>
    
        </>


        
    );
}

export default ModalRegistroCurso;







  