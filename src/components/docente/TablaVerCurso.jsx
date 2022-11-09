import React,{useContext} from 'react';
import '../../style/docente/TablaVerCurso.css'
import img_eliminar from '../../img/icono_eliminar.png'
import {AppContext} from '../../context/AppContext';
import {PeticioneApi} from '../../helpers/PeticionesApi';
import Swal from 'sweetalert2';


export default function TablaVerCurso() {
  const {cursos,cursosAsignaturas,asignaturas} = useContext(AppContext); 
  const {eliminarCurso} = PeticioneApi();
  
  const getGrado = (idcurso) =>{
    return cursos.find(cursos => cursos.idcurso === idcurso) ? 
    cursos.find(cursos => cursos.idcurso === idcurso).grado : "";
  }
  const getGrupo = (idcurso) =>{
    return cursos.find(cursos => cursos.idcurso === idcurso) ?
    cursos.find(cursos => cursos.idcurso === idcurso).grupo  : "";
  }
  const getNombreAsig = (idasignatura) =>{
     return asignaturas.find(asignatura => asignatura.idasignatura === idasignatura)?
     asignaturas.find(asignatura => asignatura.idasignatura === idasignatura).nombre : "";
  }
  
  //Funcion para eliminar curso de
  const handleEliminarCurso = async (id) => {
    Swal.fire({
      title: 'Estas segúro?',
      text: "Deseas eliminar este curso?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarCurso(id);
      }
    })
  }
  

  return (
    <div className='TablaVerCurso'> 

          <div className='ver-curso'>      
        <div class="tabla-verCurso">          
                <table>
                    <thead>
                        <tr>
                        <th width='120'>Curso</th>
                        <th width='50'>Grupo</th>
                        <th width='250'>Asignatura</th>
                      
                        <th width='80'>Accion</th>
                        </tr>
                    </thead>
                                                                     
                    <tbody className='contenido-verCurso'>
                        {
                            cursosAsignaturas.map(cursosAsignaturas => (
                                <tr key ={cursosAsignaturas.idcurso}>
                                    <td>{getGrado(cursosAsignaturas.idcurso)}</td>
                                    <td>{getGrupo(cursosAsignaturas.idcurso)}</td>
                                    <td>{getNombreAsig(cursosAsignaturas.idasignatura)}</td>
                                    <td className='img-verCurso'>
                                        <img typeof='img' 
                                             src={img_eliminar} 
                                             alt='img_eliminar'
                                             onClick={()=>handleEliminarCurso(cursosAsignaturas.idcurso)}></img>
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