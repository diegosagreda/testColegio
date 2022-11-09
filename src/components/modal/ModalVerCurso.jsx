import React from "react";
import '../../style/modal/ModalVerCurso.css';
import TablaVerCurso from "../docente/TablaVerCurso";

const ModalVerCurso =({cerrarModal})=>{

    const handleCerrarModal=(e)=>{
        e.preventDefault();
        cerrarModal();
    }
    
    return(       
            <>      
                <div className="ModalVerCurso">                 
                    <div className="contenedor-crearParcelador">
                    <section className=" encabezado-modal-parcelador">
                        <div className="encab-modal-titulo">
                                <h3>Ver Curso</h3>
                            </div>
                            <a className="salir-modal" onClick={handleCerrarModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"      
                                    viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                            </a>  
                            </section>
                            <div className="cur-grad-mat">                       
                                <TablaVerCurso/>
                            </div>                        
                          
    
                    </div>
                </div>
        
            </>
        );
    }         

export default ModalVerCurso;
