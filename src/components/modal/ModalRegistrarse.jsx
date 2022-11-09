import React, {useState} from "react";
import '../../style/modal/ModalRegistrarse.css';
import { PeticioneApi } from "../../helpers/PeticionesApi"; // esta importacion para poder utilizar el registrarse usuario


const ModalConf =({cerrarModal})=>{
    //const [fotoDocente, setFotoDocente] = useState({});
   
    //vamos a extrar de peticiones el metodo que nos sirve para registrar usuario

    const{registrarUsuario}=PeticioneApi();// ya exporte la funcion y puedo acceder a ella desde aqui


    const handleCerrarModal=(e)=>{
        e.preventDefault();
        cerrarModal();
    }
    const [datadocente, setDatadocente] = useState({
        nombre:"",
        apellido:"",
        iddocente:"",
        titulo:"",
        correo:"",
        usuario:"",
        contrasena:""
    });
    const handleChange=(e)=>{
        setDatadocente({
            ...datadocente, //modificar informacion del objeto, agregarle al objeto lo que ya tiene splite operator
            [e.target.name]:e.target.value // esto se activa cuando se escribe en cualquier imput al cual se le asigne este evento handle
        })
    }
    const handleRegistrarse=async(e)=>{
        e.preventDefault();
        //vamos a llamar a la funcio registrar usuario
        await registrarUsuario(datadocente);
    } 
    /*
    //1. Espacio para la subir la imagen 
    const handleSeleccionar=(e)=>{
        setFotoDocente(e.target.files[0]) //Ya tengo la foto en el estado

    }
    //2. Vamos a enviar la imagen al servidor
    const handleSubirFoto=()=>{
        if(!fotoDocente){
            alert("Debe elegir una foto")
            return
        }
        //3. Vamos a formatear la imagen
        const formatearFoto=new FormData();
        formatearFoto.append('imagen', fotoDocente)
        console.log("data: ", formatearFoto)
        //4. Enviar al servidor
        fetch('http://localhost:3050/image/post', {
            method:'POST',
            body: {
                foto:formatearFoto,
                iddocente:2
            }
        }).then(res=>res.json())
        .then(res=>console.log(res))
        .catch(err=>{
            console.err(err)
        })
        //5 vamos a volver el estado a null
        setFotoDocente({})
        //6 vamos a resetear
        document.getElementById('fotoDocente').value=null;
    }*/
    return(
        <>      
            <div className="inf-registrarse">                  
                <div className="contenedor-inf-registrarse">
                <section className=" encabezado-modal">
                    <div className="encab-modal-registrarse">
                            <h3>Registro de docente</h3>
                        </div>
                        <p className="salir-modal" onClick={handleCerrarModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"      
                                viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                        </p>  
                        </section>
                        <main className="datos-registro">
                        <div className="usuario-informacion">
                            {/* <div className="agregar_imagendocente">
                                 <h3>Agregar Foto del Docente</h3>
                                <div>
                                <input 
                                className="imagen-docente"
                                id='fotoDocente'
                                type="file" 
                                onChange={handleSeleccionar}                                                                              
                                ></input>
                                <svg 
                                onClick={handleSubirFoto}
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                </svg>
                                </div>             
                            </div> */}
                            <h3>Nombres</h3>
                            <input type="text" name="nombre" onChange={handleChange}></input>
                            <h3>Apellidos</h3>
                            <input type="text" name="apellido" onChange={handleChange}></input>
                            <h3>Identificación</h3>                          
                            <input type="text" name="iddocente" onChange={handleChange}></input>
                            <h3>Título</h3>
                            <input type="text" name="titulo" onChange={handleChange}></input>
                            <h3>Correo</h3>
                            <input type="text" name="correo" onChange={handleChange}></input>
                            <h3>Usuario</h3>
                            <input type="text" name="usuario" onChange={handleChange}></input>
                            <h3>Contraseña</h3>
                            <input type="password" name="contrasena" onChange={handleChange}></input>
                        </div>
                        <div className="btn-inf-registro">
                            <button onClick={handleRegistrarse}>Registrarse</button>
                        </div>
                        
                        </main>                

                </div>
            </div>
    
        </>
    );
}

export default ModalConf;
