import React,{useEffect,useContext} from 'react';
import useModal from '../../hooks/useModal'
import '../../style/docente/TablaParcelador.css'
import img_eliminar from '../../img/icono_eliminar.png'
import img_actualizar from '../../img/icono_actualizar.png'
import img_visualizar from '../../img/icono_visualizar.png'
import ModalCrearParcelador from '../modal/ModalCrearParcelador'
import ModalVerParcelador from '../modal/ModalVerParcelador';
import {PeticioneApi} from '../../helpers/PeticionesApi';
import {AppContext} from '../../context/AppContext';
import Swal from 'sweetalert2';


export default function TablaParcelador() {

    const {cargarParceladores,eliminarParcelador,seleccionarParcelador} = PeticioneApi();
    const {parceladores} = useContext(AppContext);

    useEffect(()=>{
        cargarParceladores();
    },[]);

    const[modal, abrirModal, cerrarModal]=useModal(false)    
    const[modal2, abrirModal2, cerrarModal2]=useModal(false)    
    const handleAbrirModal=(e)=>{
        e.preventDefault();
        abrirModal();
      }     
    const handleAbrirModal2=(id)=>{
        //Seleccionamos parcelador
        seleccionarParcelador(id);
        abrirModal2();
      }     

    //Funciones tabla
    const handleEliminar = async( id) => {
        Swal.fire({
            title: 'Estas segúro?',
            text: "Deseas eliminar este registro de estudiante?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
              eliminarParcelador(id);
            }
          })
    }

    //Funcion actualizar parcelador
    const handleActualizarParcelador = async (id) => {
      console.log('Parcelador: ' + id);
      seleccionarParcelador(id);
      abrirModal()
    }
  return (
    <div className='TablaVerParcelador'> 
        {modal? <ModalCrearParcelador cerrarModal={cerrarModal}/>:null}
        {modal2? <ModalVerParcelador cerrarModal={cerrarModal2}/>:null}
          <div className='parcelador'>      
        <div class="tabla-parcelador">          
                <table>
                    <thead>
                        <tr>
                        <th width='120'>Fecha</th>
                        <th width='40'>Hora</th>
                        <th width='50'>Grado</th>
                        <th width='250'>Tema</th>
                        <th width='80'>Accion</th>
                        </tr>
                    </thead>
                                    
                    <tbody className='contenido-parcelador'>
                        {parceladores.map(parcelador => (
                            <tr>
                                <td>{parcelador.fecha}</td>
                                <td>{parcelador.hora}</td>
                                <td>{parcelador.idcurso}</td>
                                <td>{parcelador.tema}</td>
                             
                                <td className='img-parcelador'>
                                    <img typeof='img' src={img_actualizar} alt='img_actualizar' onClick={() =>handleActualizarParcelador(parcelador.idparcelador)}></img>
                                    <img typeof='img' src={img_visualizar} alt='img_verParcelador' onClick={()=>handleAbrirModal2(parcelador.idparcelador)}></img>
                                    <img typeof='img' 
                                         src={img_eliminar} 
                                         alt='img_eliminar'
                                         onClick={()=>handleEliminar(parcelador.idparcelador)}></img>
                                </td>
                            </tr>                        
                        ))}
                    </tbody>                          
                </table>            
        </div>
        </div> 
    </div>
  )}