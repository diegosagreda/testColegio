import React, {useState, useContext,useEffect} from 'react';
import Foto from "../img/foto.png";
import Escudo from "../img/escudo.png";
import Sesion from '../img/cerrar.png';
import Conf from '../img/configuracion.png';
import "../style/docente/Home_Docente.css";
import VistaPrincipal from '../components/docente/VistaPrincipal';
import Curriculo from '../components/docente/Curriculo';
import Parcelador from '../components/docente/Parcelador';
import ObservadorEstudiante from '../components/docente/ObservadorEstudiante';
import { AppContext } from '../context/AppContext';
import {useNavigate}from 'react-router-dom';
import ModalConf from '../components/modal/ModalConf';
import useModal from '../hooks/useModal.js'
import AgregarCurso from '../components/docente/AgregarCurso';
import ModalSeguimientoAcademico from '../components/modal/ModalSeguimientoAcademico';
import ModalCargaVista from '../components/modal/ModalCargaVista';
import {PeticioneApi} from '../helpers/PeticionesApi';
import img_principal from '../img/img_principal.png';
import img_observador from '../img/img_observador.png';
import img_seguimiento from '../img/img_seguimiento.png';
import img_parcelador from '../img/img_parcelador.png';
import img_curriculo from '../img/img_curriculo.png';
import img_gestionar from '../img/img_gestionar.png';
import Swal from 'sweetalert2';


export default function Home_Docente() {
  
  const [pagina, setPagina] = useState("principal");
  const{setLogueado,docente,curso,asignatura,desempeñosAux,allactividades,setallactividades,setdesempeñosAux,setParceladores,setCurso,setAsignatura,setparceladoresFecha,setDesempeños}=useContext(AppContext);// se trae setLogueado para modificar el estado
  const navigate=useNavigate(); //instanciar una variable de tipo use na...
  const {cargarDesempeñosDeMateriaEnCurso,cargarActividadesMateriaEnCurso,cargarActividadesDesempeño,cargarNotas,cargarCursosAsignaturas,cargarAsignaturas} = PeticioneApi();
  const[modal, abrirModal, cerrarModal]=useModal(false)//para manejar el estado de un modal 
  const[modal2, abrirModal2, cerrarModal2]=useModal(false)//para manejar el estado de un modal 
  //Variable para manejar la variable de loader para seguimiento academico
  const [loaderSeguimiento, setloaderSeguimiento] = useState(false);
  
    useEffect(()=>(async () =>{
     // await cargarCursosAsignaturas(docente.iddocente);
      //await cargarAsignaturas();
      console.log("Load")
    }),[])

  const handlePrincipal= async (e)=>{
    e.preventDefault();
    setPagina("principal");
    await cargarCursosAsignaturas(docente.iddocente);
    await cargarAsignaturas();
    console.log("Load")
  }
  const handleAgregarCurso= async(e)=>{
    e.preventDefault();
    //Antes de entrar a gestionar curso debe haber un curso y asignatura seleccionado
    if(curso.idcurso && asignatura.idasignatura){
      setPagina("agregarCurso");
      //Cargamos los desempeños de la materia en el curso
      await cargarDesempeñosDeMateriaEnCurso(curso.idcurso,asignatura.idasignatura);
    }else{
      alert('Se debe seleccionar el curso y la asignatura a gestionar')
    }
  }
  const handleCurriculo=(e)=>{
    e.preventDefault();
    setPagina("curriculo");
  }
  const handleParcelador=async(e)=>{
    if(curso.idcurso && asignatura.idasignatura){
      e.preventDefault();
      setPagina("parcelador");
      //Cargamos desempeños
      await cargarDesempeñosDeMateriaEnCurso(curso.idcurso,asignatura.idasignatura);
    }else{
      alert('Se debe seleccionar el curso y la asignatura a gestionar')
    }
  }
  const handleObservador=(e)=>{
    e.preventDefault();
    setPagina("observador");
  }
 /* const handleAcademico=(e)=>{
    e.preventDefault(); // no recargue la pagina
    setPagina("academico");
  }*/
  const handleCerrarSesion=(e)=>{
    e.preventDefault();
    setLogueado(false);
    navigate('/login');
    localStorage.removeItem('sesion');
  }
  const handleAbrirModal=(e)=>{
    e.preventDefault();
    abrirModal();
  }
  const handleAbrirModal2= async (e)=>{
    e.preventDefault();
    setloaderSeguimiento(true);
    
    //Validacion: Para mostrar esta tabla debe estar seleccionado un grado y un asignatura
    if(curso.idcurso){
      abrirModal2();
      const dsmpñs = await cargarDesempeñosDeMateriaEnCurso(curso.idcurso,asignatura.idasignatura);
      //Cargamos las actividades de una materia en un cursp
      //setloaderSeguimiento(false);
      await cargarActividadesMateriaEnCurso(curso.idcurso,asignatura.idasignatura);
      
      //-----------------------------------------------------
      if(dsmpñs.length > 0){
        async function iterarAc (iddesempeño,nombre,indice,porcentaje){
          const arryActi = await cargarActividadesDesempeño(iddesempeño);
       
          //** Adicionamos las actividades a allactividades*/
          allactividades.push(arryActi);
          desempeñosAux.push({
            iddesempeño:iddesempeño,
            nombre: nombre+indice,
            actividades: arryActi.length,
            porcentaje: porcentaje
          });
        }
        let i = 1;
        dsmpñs.forEach(desempeño =>{
          iterarAc(desempeño.iddesempeño,desempeño.nombre,i,desempeño.porcentaje);
          i = i + 1;
        });
       
      }else{
        setallactividades([]);
        setdesempeñosAux([]);
        console.log('no hay desempeños ')
      }
      //Cuando se abre la tabla cargamos notas
      await cargarNotas();
    
    }else{
      alert('Debes seleccionar un curso primero');
    }
    setloaderSeguimiento(false);
  
  }
  return (
    <div className='Home_Docente'>
      {modal? <ModalConf cerrarModal={cerrarModal}/>:null}
     
      {loaderSeguimiento ? 
        <ModalCargaVista/>
      : 
        modal2? <ModalSeguimientoAcademico cerrarModal={cerrarModal2}/>:null}
      <header>      
          <div className='info-docente'>
              <img src={Foto} alt='Imagen Docente'></img>
              <label>{docente.nombre} {docente.apellido}</label>            
          </div>

          <div className='info-colegio'>
              <h1>Institución Educativa Rural Rafael Reyes</h1> 
              <h2>Asignatura: <span>{asignatura.nombre}</span></h2>            
              <h2>grado: <span>{curso.grado+curso.grupo}</span></h2>
              
              
          </div>

          {/* <div className='escudo'>
              <img src={Escudo} alt='Escudo'></img>
          </div> */}
      </header>
      <div className='salir-conf'>
        {/* <img src={Conf} alt='configuracion' onClick={handleAbrirModal}></img> */}
        <img src={Sesion} alt='cerrar sesion' onClick={ (e)=>{
            e.preventDefault();
            Swal.fire({
            position:'top-right',
            title: 'Cerrar Sesión',
            text: "¿Esta seguro de cerrar Sesión?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Salir'
          }).then((result) => {
            if (result.isConfirmed) {              
                setLogueado(false)
                setParceladores([]);
                setparceladoresFecha([])
                setCurso({})
                
                setAsignatura({});
                localStorage.removeItem('sesion');
            }
          })
        }
        }></img>
        
      </div>
        <main className='contenido-principal'>
      <div className='opciones'>
        <img className='img-opciones' src={img_principal} onClick={handlePrincipal} alt="img_principal"/>        
        <img className='img-opciones' src={img_gestionar} onClick={handleAgregarCurso} alt="img_"/>       
        {/* <img className='img-opciones' src={img_curriculo} onClick={handleCurriculo} alt="img_"/>       */}
        <img className='img-opciones' src={img_parcelador} onClick={handleParcelador} alt="img_"/>       
        {/* <img className='img-opciones' src={img_observador} onClick={handleObservador} alt="img_"/>        */}
        <img className='img-opciones' src={img_seguimiento} onClick={handleAbrirModal2} alt="img_"/>        

      </div>
      <div className='contenedor-opciones'>
        {pagina==="principal"? <VistaPrincipal/>:""}   
        {pagina==="agregarCurso"? <AgregarCurso/>:""}
        { pagina==="curriculo"? <Curriculo/>: ""}
        { pagina==="parcelador"? <Parcelador/>: ""}
        { pagina==="observador"? <ObservadorEstudiante/>: ""}
        
        </div>
        </main>
      </div>
  )}
     
     
