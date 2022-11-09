import React,{useContext} from 'react';
import '../../style/docente/TablaVerEstudiante.css'
import { AppContext } from '../../context/AppContext';
import img_eliminar from '../../img/icono_eliminar.png';
import img_actualizar from '../../img/icono_actualizar.png';
import { PeticioneApi } from '../../helpers/PeticionesApi';
import Swal from 'sweetalert2';
import useModal  from '../../hooks/useModal'
import ModalAgregarEstudiante from '../../components/modal/ModalAgregarEstudiante'

export default function TablaVerEstudiante() {
   
  const {estudiantes} = useContext(AppContext);
  const {eliminarEstudiante,cargarEstudianteById} = PeticioneApi();
  const[modal, abrirModal, cerrarModal]=useModal(false)

  //Funcion eliminar estudiante
  const handleEliminarEstudiante = async(id) => {
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
        eliminarEstudiante(id);
      }
    })
  }
  //Actualizar informacion estudiante
  const handleActualizarEstudiante = async (id) => {
    await cargarEstudianteById(id);
    abrirModal();
  }

  return (
    <div className='TablaVerEstudiante'>
        {modal? <ModalAgregarEstudiante cerrarModal={cerrarModal}/>:null}
        <div class="tabla-estudiante">
            <div class="tabla-interna">
                <table>
                    <thead>
                        <tr>
                        <th width='150'>Id</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Telefono</th>
                        <th>Direccion</th>
                        <th width='200'>Acudiente</th>
                        <th>Tel. Acudiente</th>
                        <th width='120'>Accion</th>
                        </tr>
                    </thead>
                
                    <tbody className='contenido-tabla'>
                        {
                            estudiantes.map(estudiante => (
                                <tr>
                                    <td>{estudiante.idestudiante}</td>
                                    <td>{estudiante.nombre}</td>
                                    <td>{estudiante.apellido}</td>
                                    <td>{estudiante.telefono}</td>
                                    <td>{estudiante.direccion}</td>
                                    <td>{estudiante.nomacudiente}</td>
                                    <td>{estudiante.telacudiente}</td>
                                    <td className='img-accion'>                                      
                                        <img typeof='img' src={img_actualizar} onClick={()=>handleActualizarEstudiante(estudiante.idestudiante)}></img>
                                        <img typeof='img' src={img_eliminar} onClick={()=>handleEliminarEstudiante(estudiante.idestudiante)}></img>
                                       
                                    </td>
                                </tr>                        
                            ))
                        }
                    </tbody>
                    
                </table>
            </div>
        </div>
    </div>
  )}