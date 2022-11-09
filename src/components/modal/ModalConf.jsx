import { useState} from 'react';
import '../../style/modal/ModalConf.css'
import Mensaje from '../mensaje/Mensaje';


const ModalConf =({cerrarModal})=>{
   
    const handleCerrarModal=(e)=>{
        e.preventDefault();
        cerrarModal();
    }
   
    return(
        <>      
            <div className="overlay-conf">
                 
                <div className="contenedorModal-conf">
                <section className=" encabezado-modal">
                    <div className="encabezado-modal-conf">
                            <h3>Configuración</h3>
                        </div>
                        <a className="salir-modal" onClick={handleCerrarModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"      
                                viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                        </a>  
                </section>
                <main className="institucion">
                 <label className="inf-institucion">
                    <h3>Nombre de la Institución</h3>
                    <input 
                    type="text"
                    
                    ></input>
                    <h3>Lema</h3>
                    <input 
                    type="text"
                                                      
                    ></input>                  
                 </label>                 
                 <div className="img-institucion">
                    <form action="#" method="">
                        <div className="agregar_imagendocente">
                            <p>Agregar Foto del Docente</p>
                            <input 
                            id='fotoDocente'
                            type="file"                                                                               
                            ></input>
                            <button                           
                            >Agregar</button>
                        </div>
                    </form>
                    <form action="#" method="">
                        <div className="agregar_imagenescudo">
                            <p>Agregar Foto del Escudo</p>
                            <input type="file"
                           
                            />
                             <button>Agregar</button>
                        </div>
                    </form>
                    
                    
                 </div>
                <div className="btn-institucion">
                    <button                  
                    >Guardar</button>    
                                  
                </div>
                  </main>                

                </div>
            </div>
    
        </>
    );
}

export default ModalConf;
