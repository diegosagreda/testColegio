import React, {useContext, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import "../../style/login/Login.css";
import useModal from '../../hooks/useModal';
import ModalRegistrarse from '../../components/modal/ModalRegistrarse'
import ModalResContraseña from '../../components/modal/ModalResContraseña'
import { AppContext } from '../../context/AppContext';
import { PeticioneApi } from '../../helpers/PeticionesApi';
import {Circles} from 'react-loader-spinner' 



export default function Login() {
  const {iniciarSesion}=PeticioneApi();
  const {setLogueado} = useContext(AppContext);
  const navigate=useNavigate();
  const usuarioo=useRef(null);
  const contraseña=useRef(null);

  const[modal, abrirModal, cerrarModal]=useModal(false)
  const[moda2, abrirModa2, cerrarModa2]=useModal(false)
  const [loader, setLoader] = useState(false);
 
  const handleAbrirModal=(e)=>{
    e.preventDefault();
    abrirModal();
  }
  const handleAbrirModal2=(e)=>{
    e.preventDefault();
    abrirModa2();
  }
  const ingresar=async(e)=>{
    e.preventDefault();
    setLoader(true);


    if(await iniciarSesion(usuarioo.current.value, contraseña.current.value)){
        
          
          setLogueado(true);
          navigate("/docente");
          const sesion = {
            usuario:usuarioo.current.value,
            password: contraseña.current.value
          }
         
          //Guardamos la session en localStorage
          localStorage.setItem('sesion', JSON.stringify(sesion));
    }else{
      alert('Usuario o contraseña incorrecta')
      setLogueado(false);
    }
    setLoader(false)
  }
  //loader
  
  return (
    <div>
    {modal? <ModalRegistrarse cerrarModal={cerrarModal}/>:null}
    {moda2? <ModalResContraseña cerrarModal={cerrarModa2}/>:null}
    <form className='formulario_login'>
        <h1>Iniciar Sesión</h1>
        <label>Usuario</label>
        <input className='input-datos' type="text" ref={usuarioo}></input>

        <label>Contraseña</label>
        <input className='input-datos' type="password" ref={contraseña}></input>

        <div className='opc-formulario'>
            <button  type='submit' onClick={ingresar}>
              {loader? <Circles color='#fff' height={20} width={20}/>:'Ingresar'}
            </button>

            <a href='#' onClick={handleAbrirModal}>Registrarse</a>
            <a href='#'onClick={handleAbrirModal2}>Restablecer Contraseña</a>      
        </div>
        
      </form>
      
    </div>
  )
}
