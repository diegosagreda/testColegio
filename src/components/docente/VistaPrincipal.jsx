import React,{useState,useEffect} from 'react'
import useModal  from '../../hooks/useModal'
import Reloj1 from '../reloj/Reloj1'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import '../../style/docente/VistaPrincipa.css'
import GestorTareas from '../tareas/GestorTareas'
import GestorGrados from '../gradosRegistrados/GestorGrados'
import ModalRegistroCurso from '../modal/ModalRegistroCurso'
import {PeticioneApi} from '../../helpers/PeticionesApi';
import GradosRegistrados from '../gradosRegistrados/GradosRegistrados'



export default function VistaPrincipal() {

  const {cargarParceladoresPorFecha,cargarParceladores} = PeticioneApi();

 //Creamos variable para el manejo de fechas
 const [value, onChange] = useState(new Date());
 useEffect(()=>{
  cargarParceladores()
  cargarParceladoresPorFecha(value.toLocaleDateString('sv'));
 },[value])

  const[modal, abrirModal, cerrarModal]=useModal(false)
  const handleAbrirModal=(e)=>{
    e.preventDefault();
    abrirModal();
  }
  return (
    <div className='vista-principal'>
    {modal? <ModalRegistroCurso cerrarModal={cerrarModal}/>:null}
   
      <div className='reloj-calendario'>      
        {/* <Reloj1/> */}
        <GestorGrados/>
        <Calendar onChange={onChange}/>
      </div>

      <div className='gestor-tareas'>
      <div className='btn-agregar-curso'>
        <button type='button' onClick={handleAbrirModal}>Agregar Curso</button>
      </div> 
            
        <GestorTareas/> 
                  
      </div>

      
    </div>
  )
}
