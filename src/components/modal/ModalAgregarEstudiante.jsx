import React, { useState,useContext} from "react";
import '../../style/modal/ModalAgregarEstudiante.css';
import {AppContext} from '../../context/AppContext';
import {PeticioneApi} from '../../helpers/PeticionesApi';
import Swal from "sweetalert2";

const ModalConf =({cerrarModal})=>{
    const {curso,estudiante,setEstudiante} = useContext(AppContext);
    const {registrarEstudiante,actualizarEstudiante} = PeticioneApi();
    const handleCerrarModal=(e)=>{
        e.preventDefault();
        cerrarModal();
        setEstudiante({});
    }
   
    const [dataEstudiante, setdataEstudiante] = useState({
        idestudiante: estudiante.idestudiante ? estudiante.idestudiante: "" ,
        nombre : estudiante.nombre ? estudiante.nombre: "",
        apellido : estudiante.apellido ? estudiante.apellido: "",
        telefono: estudiante.telefono ? estudiante.telefono: "",
        telacudiente : estudiante.telacudiente ? estudiante.telacudiente: "",
        direccion : estudiante.direccion ? estudiante.direccion: "",
        nomacudiente : estudiante.nomacudiente ? estudiante.nomacudiente: "",
        idcurso : estudiante.idcurso ? estudiante.idcurso: curso.idcurso
    });
    const handleChange=(e)=>{
        setdataEstudiante({
            ...dataEstudiante,
            [e.target.name]:e.target.value
        });
    }
    const handleGuardar= async(e)=>{
        e.preventDefault();
        //Realizamos la validacion de Registro o actualizar
        if (estudiante.idestudiante){
            await actualizarEstudiante(dataEstudiante);
            cerrarModal();
        }else{
            let rta = await registrarEstudiante(dataEstudiante);
            if(rta !== false){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Estudiante registrado con exito',
                    showConfirmButton: false,
                    timer: 2000
                })
             
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'Ya se encuentra registrado un estudiante con la misma Identifiacion'
                  })
            }
            cerrarModal();
        }
        setEstudiante({});
    }
    
    return(
        <>      
            <div className="inf-estudiante">                 
                <div className="contenedor-inf-estudiante">
                <section className=" encabezado-modal">
                    <div className="encab-modal">
                            <h3>
                               {estudiante.nombre? 'Actualizar estudiante' : ' Registro de estudiante'}
                               
                            </h3>
                        </div>
                        <p className="salir-modal" onClick={handleCerrarModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"      
                                viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                        </p>  
                        </section>
                        <main className="reg-estudiante">
                        <div className="estudiante-informacion">
                            <h3>ID</h3>
                            <input 
                                name="idestudiante" 
                                type="number" 
                                onChange={handleChange}
                                defaultValue={estudiante.idestudiante? estudiante.idestudiante : ''}
                                disabled={estudiante.idestudiante? true : false}/>
                            <h3>Nombres</h3>
                            <input 
                                name="nombre" 
                                type="text"
                                onChange={handleChange}
                                defaultValue={estudiante.nombre? estudiante.nombre : ''}/>
                            <h3>Apellidos</h3>
                            <input 
                                name="apellido" 
                                type="text" 
                                onChange={handleChange}
                                defaultValue={estudiante.apellido? estudiante.apellido : ''}/>
                            <h3>Teléfono</h3>
                            <input 
                                name="telefono" 
                                type="text" 
                                onChange={handleChange}
                                defaultValue={estudiante.telefono? estudiante.telefono : ''}/>
                            <h3>Dirección</h3>
                            <input 
                                name="direccion" 
                                type="text" 
                                onChange={handleChange}
                                defaultValue={estudiante.direccion? estudiante.direccion : ''}/>
                            <h3>Nombre Acudiente</h3>
                            <input 
                                name="nomacudiente" 
                                type="text" 
                                onChange={handleChange}
                                defaultValue={estudiante.nomacudiente? estudiante.nomacudiente : ''}/>
                            <h3>Telefono Acudiente</h3>
                            <input 
                                name="telacudiente" 
                                type="text" 
                                onChange={handleChange}
                                defaultValue={estudiante.telacudiente? estudiante.telacudiente : ''}/>
                        </div>
                        <div className="btn-inf-estudiante">
                            <button type="button" onClick={handleGuardar}> {estudiante.nombre? 'Actualizar' : 'Guardar'}</button>
                        </div>
                        
                        </main>                

                </div>
            </div>
    
        </>
    );
}

export default ModalConf;
