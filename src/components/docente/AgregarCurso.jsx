import React,{useState,useContext} from 'react'
import '../../style/docente/AgregarCurso.css'
import useModal  from '../../hooks/useModal'
import ModalAgregarEstudiante from '../../components/modal/ModalAgregarEstudiante'
import ModalVerEstudiante from '../../components/modal/ModalVerEstudiante'
import ModalAgregarDesempeño from '../../components/modal/ModalAgregarDesempeño'
import ModalVerDesempeño from '../modal/ModalVerDesempeño'
import ModalCargarVista from '../modal/ModalCargaVista';
import ModalVerCurso from '../../components/modal/ModalVerCurso'
import ModalSubirListaEstudiantes from '../modal/ModalSubirListaEstudiantes'
import GestorGrados from '../gradosRegistrados/GestorGrados'
import imgagregar from '../../img/icono_agregar.png';
import imgsubir from '../../img/icono_subir.png';
import imgver from '../../img/icono_ver.png';
import imgagregardes from '../../img/icono_agregardesempeños.png';
import imgverdesemp from '../../img/icono_verdesempeños.png';
import imgvercurso from '../../img/icono_vercurso.png';
import { AppContext} from '../../context/AppContext';
import { PeticioneApi} from '../../helpers/PeticionesApi';

export default function AgregarCurso() {

  const {curso,desempeños,asignatura,estudiantes,cursosAsignaturas} = useContext(AppContext);
  const {cargarEstudiantesCurso,cargarDesempeñosDeMateriaEnCurso,cargarActividadesMateriaEnCurso} = PeticioneApi();
  const[modal, abrirModal, cerrarModal]=useModal(false)
  const[modal2, abrirModal2, cerrarModal2]=useModal(false)
  const[modal3, abrirModal3, cerrarModal3]=useModal(false)
  const[modal4, abrirModal4, cerrarModal4]=useModal(false)
  const[modal5, abrirModal5, cerrarModal5]=useModal(false)
  const[modal6, abrirModal6, cerrarModal6]=useModal(false)

  
  //Variable para manejar la varible de loader de carga de estudiantes
  const [loaderTablaEstudiantes, setloaderTablaEstudiantes] = useState(false);
  const [loaderTablaDesempeños, setloaderTablaDesempeños] = useState(false);

  const handleAbrirModal=async(e)=>{
    e.preventDefault();
    abrirModal();
    await cargarActividadesMateriaEnCurso(curso.idcurso,asignatura.idasignatura);
  }
  const handleAbrirModal2=async(e)=>{
    e.preventDefault();
    setloaderTablaEstudiantes(true);
    //Validamos que el curso ya tenga estudiantes registrados
    if(estudiantes.length > 0){
      await cargarEstudiantesCurso(curso.idcurso);
      abrirModal2();
      setloaderTablaEstudiantes(false)
    }else{
      alert(`En el momento el grado (${curso.grado+curso.grupo}) no tiene estudiantes registrados`)
      setloaderTablaEstudiantes(false)
    }
  
  }
  const handleAbrirModal3=(e)=>{
    e.preventDefault();
    abrirModal3();
  }
  const handleAbrirModal4= async(e)=>{

    e.preventDefault();
    setloaderTablaDesempeños(true);
    await cargarDesempeñosDeMateriaEnCurso(curso.idcurso,asignatura.idasignatura);
    console.log('desempeños: ',desempeños);
    //Validamos que el curso tenga desempeños registrados
    if(desempeños.length > 0){
      abrirModal4();
      setloaderTablaDesempeños(false)
    }else{
      alert(`En el momento la asignatura ${asignatura.nombre} no tiene desempeños registrados `)
      setloaderTablaDesempeños(false)
    }
    
  }
  const handleAbrirModal5=async(e)=>{
    e.preventDefault();
    abrirModal5();
    console.log('Modal Subir')
    await cargarActividadesMateriaEnCurso(curso.idcurso,asignatura.idasignatura);
  }
  const handleAbrirModal6= (e)=>{
    e.preventDefault();
    //cargamos cursos asignaturas
    ///console.log(cursosAsignaturas)
    abrirModal6();
  }

 
  return (
    <div className='AgregarCurso'>
     {modal? <ModalAgregarEstudiante cerrarModal={cerrarModal}/>:null}
     {modal3? <ModalAgregarDesempeño cerrarModal={cerrarModal3}/>:null}
     {modal5? <ModalSubirListaEstudiantes cerrarModal={cerrarModal5}/>:null}
     {modal6? <ModalVerCurso cerrarModal={cerrarModal6}/>:null}
     {modal5? <ModalSubirListaEstudiantes isOpen={modal5}  cerrarModal={cerrarModal5}/>:null}

     
     {
      loaderTablaEstudiantes?
      <ModalCargarVista/>
      :
      modal2? <ModalVerEstudiante cerrarModal={cerrarModal2}/>:null
     } 
     {
      loaderTablaDesempeños?
      <ModalCargarVista/>
      :
      modal4? <ModalVerDesempeño cerrarModal={cerrarModal4}/>:null
     } 
    <GestorGrados/>

      <div className='opcion-estudiante'>
        <img src={imgagregar} onClick={handleAbrirModal}  alt="img_"></img>
        <img src={imgsubir} onClick={handleAbrirModal5} alt="img_"></img>
        <img src={imgver} onClick={handleAbrirModal2} alt="img_"></img>      
            
      <img src={imgagregardes} onClick={handleAbrirModal3} alt="img_"></img>
      <img src={imgverdesemp} onClick={handleAbrirModal4} alt="img_"></img>
      <img src={imgvercurso} onClick={handleAbrirModal6} alt="img_"></img>
   
      </div>


      <div>
      

      </div>  
    </div>

  )
}
// prueba para heroku