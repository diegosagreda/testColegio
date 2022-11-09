import React,{useContext} from 'react'
import '../../style/modal/ModalSeleccionarAsignatura.css';
import {AppContext} from '../../context/AppContext';
import { PeticioneApi} from '../../helpers/PeticionesApi';

const ModalSeleccionAsignatura = ({isOpen,closeModal, cerrarModal}) => {
   
    const {asignaturas,curso,docente} = useContext(AppContext);
    const {seleccionarAsignatura,cargarDesempeñosDeMateriaEnCurso,cargarActividadesMateriaEnCurso,cargarCursosAsignaturas,cargarAsignaturas,cargarParceladoresPorFecha,cargarParceladores,cargarAllActividades,cargarTodoLosDesempeños,cargarTodosLosCursos} = PeticioneApi();

    //Funcion actualizar informacion empleado
    const handleSeleccionarAsignatura = async(id) => {
        /*    await cargarAllActividades();
        await cargarTodoLosDesempeños();
        await cargarTodosLosCursos() */
        
        //await cargarAsignaturas();
        await cargarCursosAsignaturas(docente.iddocente);
        await seleccionarAsignatura(id);
        await cargarActividadesMateriaEnCurso(curso.idcurso,id);
        /*  await cargarDesempeñosDeMateriaEnCurso(curso.idcurso,id); */
        /* await cargarParceladores();
        cargarParceladoresPorFecha(new Date().toLocaleDateString('sv')); */
        closeModal();
        
    }
    
    const handleCerrarModal=(e)=>{
        e.preventDefault();
        closeModal();
    }
    
    return (

        <div className={`modal ${isOpen && 'is-open'}`}>
            <div className="seleccionar-asignatura">                 
                <div className="contenedor-asignatura">
                    <section className=" encabezado-modal">
                        <div className="encab-modal">
                            <h3>Seleccione Asignatura</h3>
                        
                        </div>
                            <p className="salir-modal" onClick={handleCerrarModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"      
                                    viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                            </p>  
                    </section>          
                    
                        <div className='seleccionar-asg'>                      
                            <form >
                                {
                                    asignaturas.map(asignatura => (
                                        <button className='btn-sel-asg'key={asignatura.idasignatura} type="button"
                                            onClick={()=>handleSeleccionarAsignatura(asignatura.idasignatura)}>
                                            {asignatura.nombre}</button>
                                    ))
                                }                               
                            </form>
                        </div> 
        
                </div>

            </div>
        </div>     
   
    )
}

export default ModalSeleccionAsignatura;
