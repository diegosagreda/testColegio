import React, {useContext,useEffect,useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home_Docente from "./containers/Home_Docente";
import Home_Login from "./containers/Home_Login";
import { AppContext } from "./context/AppContext";
//import {useNavigate} from 'react-router-dom';
import { PeticioneApi } from './helpers/PeticionesApi';

function App() {
  const {logueado,setLogueado}=useContext(AppContext);
  const {iniciarSesion,cargarParceladores,cargarParceladoresPorFecha}=PeticioneApi();

  //const navigate=useNavigate();
  //En el momento en que se inicia la app verficamos si existe la sesion iniciada
  useEffect(()=>{
    const sesion = localStorage.getItem('sesion');
    if (sesion) {
      setLogueado(true);
      const sesionObjt = JSON.parse(sesion);
      const {usuario,password} = sesionObjt;
      iniciarSesion(usuario,password);
     
 
    }
  },[]);

  return (
    <div className="App">
      {logueado? 
        //vamos a validar el tipo de usuario
            <BrowserRouter>
              <Routes>
                <Route exact path="/docente" element={<Home_Docente/>}/>             
              </Routes>
          </BrowserRouter> 
      : 
          <BrowserRouter>
            <Routes>
                <Route exact path="*" element={<Home_Login/>}></Route>
            </Routes>
          </BrowserRouter>          
      } 
    </div>
  );
}

export default App;
