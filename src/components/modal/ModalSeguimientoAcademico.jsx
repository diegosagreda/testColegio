import React,{useContext} from 'react'
import '../../style/modal/ModalSeguimientoAcademico.css'
import Tabla from '../docente/Tabla'
import { AppContext } from '../../context/AppContext'

export default function ModalSeguimientoAcademico({cerrarModal}) {
    const {estudiantes,desempeños,setDesempeñosAux,setallActividades} = useContext(AppContext);
    const handleCerrarModal=(e)=>{
        e.preventDefault();
        cerrarModal();
        setDesempeñosAux([]);
        setallActividades([]);
    }

    const actividades =  [
      {
        id:'1',
        nombre:'A1',
        id_desempeño:'1'
      },
      {
        id:'2',
        nombre:'A2',
        id_desempeño:'1'
      },
      {
        id:'3',
        nombre:'A3',
        id_desempeño:'1'
      },
      {
        id:'4',
        nombre:'A4',
        id_desempeño:'1'
      },    
      {
        id:'5',
        nombre:'A1',
        id_desempeño:'2'
      },
      {
        id:'6',
        nombre:'A2',
        id_desempeño:'2'
      },
      {
        id:'7',
        nombre:'A3',
        id_desempeño:'2'
      },
      {
        id:'8',
        nombre:'A4',
        id_desempeño:'2'
      },
      {
        id:'9',
        nombre:'A1',
        id_desempeño:'3'
      },
      {
        id:'10',
        nombre:'A2',
        id_desempeño:'3'
      },
      {
        id:'11',
        nombre:'A3',
        id_desempeño:'3'
      }
      ,
      {
        id:'12',
        nombre:'A4',
        id_desempeño:'3'
      }
    ]
    const notas = [
      {
        id:"1",
        id_desempeño:"1",
        id_actividad:"1",
        id_estudiante:"1",
        id_curso:'1',
        valor:'1.5'
      },
      {
        id:"2",
        id_desempeño:"1",
        id_actividad:"2",
        id_estudiante:"1",
        id_curso:'1',
        valor:'3'
      },
      {
        id:"3",
        id_desempeño:"1",
        id_actividad:"3",
        id_estudiante:"1",
        id_curso:'1',
        valor:'3.2'
      },
      {
        id:"4",
        id_desempeño:"1",
        id_actividad:"4",
        id_estudiante:"1",
        id_curso:'1',
        valor:'4'
      },
      {
        id:"5",
        id_desempeño:"2",
        id_actividad:"5",
        id_estudiante:"1",
        id_curso:'1',
        valor:'5'
      },
      {
        id:"6",
        id_desempeño:"2",
        id_actividad:"6",
        id_estudiante:"1",
        id_curso:'1',
        valor:'5'
      },
      {
        id:"7",
        id_desempeño:"2",
        id_actividad:"7",
        id_estudiante:"1",
        id_curso:'1',
        valor:'4'
      },
      {
        id:"8",
        id_desempeño:"2",
        id_actividad:"8",
        id_estudiante:"1",
        id_curso:'1',
        valor:'1'
      },
      {
        id:"9",
        id_desempeño:"3",
        id_actividad:"9",
        id_estudiante:"1",
        id_curso:'1',
        valor:'2'
      },
      {
        id:"10",
        id_desempeño:"3",
        id_actividad:"10",
        id_estudiante:"1",
        id_curso:'1',
        valor:'5'
      },
      {
        id:"11",
        id_desempeño:"3",
        id_actividad:"11",
        id_estudiante:"1",
        id_curso:'1',
        valor:'3'
      },
      {
        id:"12",
        id_desempeño:"3",
        id_actividad:"12",
        id_estudiante:"1",
        id_curso:'1',
        valor:'3'
      },
      //----
      {
        id:"13",
        id_desempeño:"1",
        id_actividad:"1",
        id_estudiante:"2",
        id_curso:'1',
        valor:'5'
      },
      {
        id:"14",
        id_desempeño:"1",
        id_actividad:"2",
        id_estudiante:"2",
        valor:'3'
      },
      {
        id:"3",
        id_desempeño:"1",
        id_actividad:"3",
        id_estudiante:"2",
        valor:'3.2'
      },
      {
        id:"4",
        id_desempeño:"1",
        id_actividad:"4",
        id_estudiante:"2",
        valor:'4'
      },
      {
        id:"5",
        id_desempeño:"2",
        id_actividad:"5",
        id_estudiante:"2",
        valor:'5'
      },
      {
        id:"6",
        id_desempeño:"2",
        id_actividad:"6",
        id_estudiante:"2",
        valor:'5'
      },
      {
        id:"7",
        id_desempeño:"2",
        id_actividad:"7",
        id_estudiante:"2",
        valor:'4'
      },
      {
        id:"8",
        id_desempeño:"2",
        id_actividad:"8",
        id_estudiante:"2",
        valor:'1'
      },
      {
        id:"9",
        id_desempeño:"3",
        id_actividad:"9",
        id_estudiante:"2",
        valor:'2'
      },
      {
        id:"10",
        id_desempeño:"3",
        id_actividad:"10",
        id_estudiante:"2",
        valor:'5'
      },
      {
        id:"11",
        id_desempeño:"3",
        id_actividad:"11",
        id_estudiante:"2",
        valor:'3'
      },
      {
        id:"12",
        id_desempeño:"3",
        id_actividad:"12",
        id_estudiante:"2",
        valor:'3'
      },
      //---
      {
        id:"1",
        id_desempeño:"1",
        id_actividad:"1",
        id_estudiante:"3",
        id_curso:'1',
        valor:'5'
      },
      {
        id:"2",
        id_desempeño:"1",
        id_actividad:"2",
        id_estudiante:"3",
        valor:'3'
      },
      {
        id:"3",
        id_desempeño:"1",
        id_actividad:"3",
        id_estudiante:"3",
        valor:'3.2'
      },
      {
        id:"4",
        id_desempeño:"1",
        id_actividad:"4",
        id_estudiante:"3",
        valor:'4'
      },
      {
        id:"5",
        id_desempeño:"2",
        id_actividad:"1",
        id_estudiante:"3",
        valor:'5'
      },
      {
        id:"6",
        id_desempeño:"2",
        id_actividad:"2",
        id_estudiante:"3",
        valor:'5'
      },
      {
        id:"7",
        id_desempeño:"2",
        id_actividad:"3",
        id_estudiante:"3",
        valor:'4'
      },
      {
        id:"8",
        id_desempeño:"4",
        id_actividad:"4",
        id_estudiante:"3",
        valor:'1'
      },
      {
        id:"9",
        id_desempeño:"3",
        id_actividad:"1",
        id_estudiante:"3",
        valor:'2'
      },
      {
        id:"10",
        id_desempeño:"2",
        id_actividad:"2",
        id_estudiante:"3",
        valor:'5'
      },
      {
        id:"11",
        id_desempeño:"3",
        id_actividad:"3",
        id_estudiante:"3",
        valor:'3'
      },
      {
        id:"12",
        id_desempeño:"3",
        id_actividad:"4",
        id_estudiante:"3",
        valor:'3'
      }
    ]
    const faltas = [
      {
        id:'1',
        id_estudiante:'1',
        cantidad:'0'
      },
      {
        id:'2',
        id_estudiante:'2',
        cantidad:'3'
      },
      {
        id:'3',
        id_estudiante:'3',
        cantidad:'3'
      }
    ]
    const notasDefinitivas=[
      {
        id:"1",
        id_estudiante:"1",
        id_curso:'1',
        valor:'5'
      },
      {
        id:"2",
        id_estudiante:"2",
        id_curso:'1',
        valor:'4'
      },
      {
        id:"3",
        id_estudiante:"3",
        id_curso:'1',
        valor:'2'
      },
    ]
  return (
    <>
    <div className="inf-segAcademico">   

                <div className="contenedor-inf-segAcademico">
                <section className=" encabezado-modal-actividad">
                        <a className="salir-modal" onClick={handleCerrarModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"      
                                viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                        </a>  
                        </section>
                        <Tabla desempeños={desempeños}
                        actividades={actividades}
                        estudiantes={estudiantes}
                        notas={notas}
                        notasDefinitivas={notasDefinitivas}
                        faltas={faltas}
                      />
                        
                                                        

                </div>
            </div>
      
    </>
  )
}
