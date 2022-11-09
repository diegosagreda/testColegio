import React, {useState} from "react";
import '../../style/modal/ModalResContraseña.css';
import emailjs from '@emailjs/browser';

const ModalConf =({cerrarModal})=>{
    const sendEmail = (event) => {
        event.preventDefault();
    
        emailjs.sendForm('service_udqeg0x','template_1d03duz',event.target,'ICOH06ZyKqj5IK43R')
        .then(response => {
            if(response.status === 200) {
                alert('Solicitud de recuperacion de contraseña enviada')
                cerrarModal()
            }
        })
        .catch(error => console.log(error))
      }

    const handleCerrarModal=(e)=>{
        e.preventDefault();
        cerrarModal();
    }
    
    return(
        <>      
            <div className="inf-resContraseña">                 
                <div className="contenedor-inf-resContraseña">
                <section className=" encabezado-modal">
                    <div className="encab-modal">
                            <h3>Recuperacion contraseña</h3>
                        </div>
                        <a className="salir-modal" onClick={handleCerrarModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"      
                                viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                        </a>  
                        </section>
                        <main className="datos-resContraseña">
                        <div className='div-form'>
     
                            <form className='form-mail' onSubmit={sendEmail}>

                                <label>Email</label>
                                <input type="email" name='user_email' />
                              
                                <button>Send</button>
                            </form>
                        </div>
                        
                        </main>                

                </div>
            </div>
    
        </>
    );
}

export default ModalConf;
