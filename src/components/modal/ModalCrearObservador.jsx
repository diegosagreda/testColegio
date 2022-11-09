import React, {useState} from "react";
import '../../style/modal/ModalCrearObservador.css';

const ModalConf =({cerrarModal})=>{

    const handleCerrarModal=(e)=>{
        e.preventDefault();
        cerrarModal();
    }
    
    return(
        <>      
            <div className="ModalCrearObservador">                 
                <div className="contenedor-obs-estudiante">
                <section className=" encabezado-observador">
                    <div className="titulo-observador">
                            <h3>Observadir del estudiante</h3>
                        </div>
                        <a className="salir-modal" onClick={handleCerrarModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"      
                                viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                        </a>  
                        </section>

                        <div className="formulario-general">
                        <main className="formulario-observador">  
                                    <h2>Estudiante</h2>                         
                                    <label>Identificación</label>
                                    <input></input>                           
                                    <label>Nombres</label>
                                    <input></input>                           
                                    <label>Apellidos</label>
                                    <input></input>                           
                                    <label>Grado</label>
                                    <select>
                                    <option>--Seleccionar--</option>
                                    </select>                           
                                    <label>Teléfono</label>
                                    <input></input>                           
                                    <label>Dirección</label>
                                    <input></input>                           
                                    <label>Fecha Nacimiento</label>
                                    <input ></input>                           
                                    <label>Lugar de Nacimiento</label>
                                    <input></input>                           
                                    <label>Departamento</label>
                                    <input></input>                           
                                    <label>Institución Procedencia</label>
                                    <input></input>                           
                                    <label>Salud</label>
                                    <input></input>                           
                                    <label>Edad</label>
                                    <input></input> 
                                    <label>Peso</label>
                                    <input></input> 
                                    <label>Talla</label>
                                    <input></input> 
                                    <label>Dificultades:</label>
                                    <label>Visual</label>
                                    <select>                                        
                                        <option>-</option>
                                        <option>Si</option>
                                        <option>No</option>
                                    </select>
                                    <label>Auditiva</label>
                                    <select>                                        
                                        <option>-</option>
                                        <option>Si</option>
                                        <option>No</option>
                                    </select>
                                    <label>Lenguaje</label>
                                    <select>                                        
                                        <option>-</option>
                                        <option>Si</option>
                                        <option>No</option>
                                    </select>                                                                             
                        </main>  
                        <main className="formulario-observador">  
                                    <h2>Madre de familia</h2>                         
                                    <label>Identificación</label>
                                    <input></input>                           
                                    <label>Nombres</label>
                                    <input></input>                           
                                    <label>Apellidos</label>
                                    <input></input>  
                                    <label>Fecha Nacimiento</label>
                                    <input ></input>                                                             
                                    <label>Edad</label>
                                    <input ></input>                                                             
                                    <label>Teléfono</label>
                                    <input></input>                           
                                    <label>Dirección</label>
                                    <input></input>                                                              
                                    <label>Ocupación</label>
                                    <input></input>                                                                                                                 
                        </main>                          
                        <main className="formulario-observador">  
                                    <h2>Padre de familia</h2>                         
                                    <label>Identificación</label>
                                    <input></input>                           
                                    <label>Nombres</label>
                                    <input></input>                           
                                    <label>Apellidos</label>
                                    <input></input>  
                                    <label>Fecha Nacimiento</label>
                                    <input ></input>                                                             
                                    <label>Edad</label>
                                    <input ></input>                                                             
                                    <label>Teléfono</label>
                                    <input></input>                           
                                    <label>Dirección</label>
                                    <input></input>                                                              
                                    <label>Ocupación</label>
                                    <input></input>                                                                                                                 
                        </main>  
                        </div>


                        <div className="btn-guardar-obs">
                                    <button>Guardar</button>
                        </div>             

                </div>
            </div>
    
        </>
    );
}

export default ModalConf;
