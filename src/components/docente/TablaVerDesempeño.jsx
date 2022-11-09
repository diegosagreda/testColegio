import React,{useContext} from 'react';
import useModal  from '../../hooks/useModal'
import ModalAgregarDesempeño from '../../components/modal/ModalAgregarDesempeño'
import '../../style/docente/TablaVerDesempeño.css'
import { AppContext} from '../../context/AppContext';
import {PeticioneApi} from '../../helpers/PeticionesApi';
import Swal from 'sweetalert2';
import iconoActualizar from '../../img/icono_actualizar.png'
import iconoEliminar from '../../img/icono_eliminar.png'

export default function TablaVerDesempeño() {
  const {eliminarDesempeño,seleccionarDesempeño,cargarActividadesDesempeño} = PeticioneApi();
  const {desempeños,asignatura} = useContext(AppContext);
  const[modal, abrirModal, cerrarModal]=useModal(false)
 
  
  //Funcion eliminar estudiante
  const handleEliminarDesempeño = async(id) => {
    Swal.fire({
        title: 'Esta seguro?',
        text: `Desea eliminar desempeño con la Id ${id}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          eliminarDesempeño(id);
        }
      })
  }
  //Funcion actualizar desempeños
  const handleActualizarDesempeño = async (id) => {
        await seleccionarDesempeño(id);
        await cargarActividadesDesempeño(id);
        abrirModal();
  }

  return (
    <>
    {modal? <ModalAgregarDesempeño cerrarModal={cerrarModal}/>:null}
    {/* <div className='buscar-desempeño'>            
            <h3>Periódo</h3>
            <select>
                <option>--Seleccionar--</option>
                <option>I</option>
                <option>II</option>
                <option>III</option>
                <option>IV</option>
            </select> 
            <h3>Materia</h3>
            <select>
              <option>--Seleccione--</option>
              <option>Informática</option>
              <option>Matemáticas</option>
            </select>
            <h3>Grado</h3>
            <select>
              <option>--Seleccione--</option>              
            </select>

            <div className='icono-buscar'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </div>

           
    </div> */}
    <div className='TablaVerDesempeño'>

        <div class="tabla-desempeño">
            <div class="tabla-interna-desempeño">
                <table>
                    <thead className='tabla-encabezado'>
                        <tr>
                        <th>Periodo</th>
                        <th>Area</th>
                        <th >Desempeño</th>                        
                        <th>Accion</th>
                        </tr>
                    </thead>
                
                    <tbody className='contenido-tabla-desempeño'>
                        {desempeños.map(desempeño =>(
                            <tr>
                  
                              <td>{desempeño.periodo}</td>
                              <td>{ asignatura.nombre}</td>
                              <td>{desempeño.descripcion}</td>                         
                              <td className='img-desempeño'>
                                <img
                                  className='img-actualizar'
                                  src={iconoActualizar}
                                  onClick={()=>{handleActualizarDesempeño(desempeño.iddesempeño)}}
                                  alt="Actualizar"
                                />
                                <img
                                  className='img-eliminar'
                                  src={iconoEliminar}
                                  onClick={()=>handleEliminarDesempeño(desempeño.iddesempeño)}
                                  alt="Eliminar"
                                />
                             
                              </td>
                          </tr> 
                        ))}
                                             
                    </tbody>
                
               
                  
                </table>
            </div>
        </div>
    </div>
    </>
  )}