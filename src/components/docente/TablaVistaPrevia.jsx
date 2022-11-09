import React,{useContext,useEffect,useState} from 'react'
import '../../style/docente/TablaVistaPrevia.css'
import { AppContext} from '../../context/AppContext';
import img_editar from '../../img/icono_editar.png';
import img_eliminar from '../../img/icono_eliminar.png';
import { PeticioneApi } from '../../helpers/PeticionesApi';
import Swal from 'sweetalert2';

export default function TablaVistaPrevia() {
  const {desempeño,actividades} = useContext(AppContext);
  const {seleccionarActividad,eliminarActividad} = PeticioneApi();
  const [descripcion, setdescripcion] = useState('');
  useEffect(()=>{
    setdescripcion(desempeño.descripcion);
  },[desempeño]);


  //Funcion para actualizar actividad
  const handleActualizarActividad = async (id)=>{
    await seleccionarActividad(id);
  }
  const handleEliminaActividad = async (id)=>{
    Swal.fire({
      title: 'Esta seguro?',
      text: `Desea eliminar la actividad ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarActividad(id);
      }
    })
  }

  return (
    <div className='Tabla-VistaPrevia'>
        <table className='tabla-tr'>
           
           <h2>Desempeño</h2>
            <tr>
              <td>{descripcion}</td>
              <img src={img_editar}></img>
            </tr>
              <h2>Actividades</h2>  
            
              {actividades.map(actividad => (
                <tr key={actividad.idactividad}>
                  <td>{actividad.nombre}</td>
                  <img src={img_editar} onClick={() => handleActualizarActividad(actividad.idactividad)}></img>
                  <img src={img_eliminar} onClick={()=>handleEliminaActividad(actividad.idactividad)}></img>
                </tr>
              ))}
            
        </table>     
    </div>
  )
}
