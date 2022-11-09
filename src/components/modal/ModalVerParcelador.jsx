import React,{useContext,useEffect, useState} from "react";
import '../../style/modal/ModalVerParcelador.css';
import {AppContext} from '../../context/AppContext';
import {PeticioneApi} from '../../helpers/PeticionesApi';



const ModalVerParcelador =({cerrarModal})=>{

    const {parcelador,curso,asignatura,desempeño,todoDesempeños,setDesempeño} = useContext(AppContext);
    const {seleccionarDesempeño2,getActividad,getDesempeño} = PeticioneApi();
    const {desem, setDesem} = useState({});
    useEffect(()=>{
        seleccionarDesempeño2(parcelador.iddesempeño);
       
    },[]);
  
    const handleCerrarModal=(e)=>{
        e.preventDefault();
        cerrarModal();
        setDesempeño({});
        
    }
    return(       
            <>      
                <div className="ModalVerParcelador">                 
                    <div className="contenedor-verParcelador">
                    <section className=" encabezado-modal-parcelador">
                        <div className="encab-modal-titulo">
                                <h3>Ver Parcelador</h3>
                            </div>
                            <a className="salir-modal" onClick={handleCerrarModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"      
                                    viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                            </a>  
                            </section>
                            <div className="contenido-header">                       
                                <h3>Curso: </h3> 
                                <label typeof="text">{curso.grado}-{curso.grupo}</label>                               
                                <h3>Materia: </h3>  
                                <label typeof="text">{asignatura.nombre}</label>                               
                              {/*   <h3 >Periodo: </h3>
                                <label typeof="text">{desem.periodo}</label>  */}
                                <h3>Fecha: </h3>
                                <label typeof="text">{parcelador.fecha}</label> 
                                <h3>Hora: </h3>
                                <label typeof="text">{parcelador.hora}</label> 
                             
                        </div>

                        
                        <form className="cont-verParcelador">
                            <h3>Estandar</h3>
                            <label type='text'>{parcelador.estandar}</label>
                            <h3>competencia</h3>
                            <label type='text'>{parcelador.competencia}</label>
                            <h3>Tema Clase</h3>
                            <label type='text'>{parcelador.tema}</label>                           
                            <h3>Desempeño Clase</h3>
                            <label type='text'>{parcelador.iddesempeño}</label>                            
                            <h3>Actividades</h3>
                            <label type='text'>{getActividad(parcelador.idactividad).nombre}</label>                             
                            <h3>Recursos</h3>
                            <label type='text'>{parcelador.recursos}</label>                           
                            <h3>Evaluación</h3>
                            <label type='text'>{parcelador.evaluacion}</label>  
                        </form>    
                         
                    </div>
                </div>
        
            </>
        );
    }         

export default ModalVerParcelador;
