import React, {useState} from 'react'
import '../../style/docente/TablaAcademico.css'

export default function TablaAcademico({desempeños,actividades,estudiantes,notas,faltas,notasDefinitivas}) {

  const [registrarNota, setregistrarNota] = useState(false);
  const [tomarAsistencia, settomarAsistencia] = useState(false);
  const inputsNotas = [];

  const [estudiante, setestudiante] = useState({});

  const handleRegistrarNota = (e) =>{
    e.preventDefault();
    setregistrarNota(true);
    //Creamos las variables para manejar los valores de los inputs
    actividades.forEach(actividad => {
      inputsNotas.push(actividad.id);
    });
  }
  const handleEditarNotas = (id)=>{
    //console.log(estudiantes.filter(estudiante => estudiante.id === id))
    setestudiante(estudiantes.filter(estudiante => estudiante.id === id));
   
     //console.log(estudiante);
  }
  const handletomarAsistencia = (e) =>{
    e.preventDefault();
    settomarAsistencia(true);
  }
  const handleGuardar = (e) =>{
    e.preventDefault();
    setregistrarNota(false);
    settomarAsistencia(false);
    //Caculamos promedios de desempeño
  }

  let indice = 0;

  return (
    <div>
    <div class="outer-wrapper">
                 <div class="table-wrapper">
                    <div className='header'>
                      <div className='inf-institucion'>
                        <div className='info-seguimiento'>
                            <p>Area: <span>Humanas</span></p>
                            <p>Grado: <span>Once</span></p>
                            <p>Unidad: <span>1</span></p>
                            <p>Tiempo probable: <span>Humanas</span></p>
                            <p>Tiempo real: <span>Humanas</span></p>
                            <p>Periodo: <span>1</span></p>
                        </div>
                      </div>
                    </div> 
                    <table>
                        <thead className='encabezado'>
                          <tr className='encabezado-general'>
                              <th className='info-estudiante'> Estudiantes</th>
                          </tr>
                          <tr>
                            <th>No</th>
                            <th>Nombre</th>                         
                          </tr>
                        </thead>
                        <tbody>
                          
                        </tbody>


                    </table>         
            </div>
        </div>
      
    </div>
  )
}
