import React, { useState,useContext } from 'react'
import '../../style/modal/ModalRegistroNota.css';
import {AppContext} from '../../context/AppContext';
import { PeticioneApi } from '../../helpers/PeticionesApi';
import ModalCargaVista from './ModalCargaVista';
import '../../style/modal/ModalSubirListaEstudiantes.css'

const ModalSubirListaEstudiantes = ({isOpen,cerrarModal}) => {
   
    const [estudiantes, setEstudiantes] = useState([]);
    const [loaderCargaEstudiantes, setloaderCargaEstudiantes] = useState(false);
    const {registrarEstudiante,cargarEstudiantesCurso} = PeticioneApi();
    const {curso} = useContext(AppContext);

    const handleChange= (e)=> {
        
        const file = e.target.files[0]
        const fileReader = new FileReader();
        fileReader.onload = (e) =>{
            setEstudiantes([
                ...estudiantes,e.target.result.split(/\r?\n|\r/)
            ])
        }
        fileReader.readAsText(file) 
    }
    const handleGuardar = async () => {
        setloaderCargaEstudiantes(true);
        const registrar = async (estudiante) => {
            for (let i = 0; i < estudiante.length; i++) {
                const auxArrayEStudiante = estudiante[i].split(",");
                let  dataEstudiante = {
                    idestudiante:auxArrayEStudiante[0],
                    nombre :auxArrayEStudiante[1],
                    apellido :auxArrayEStudiante[2],
                    telefono:auxArrayEStudiante[3],
                    telacudiente :auxArrayEStudiante[4],
                    direccion :auxArrayEStudiante[5],
                    nomacudiente :auxArrayEStudiante[6],
                    idcurso :curso.idcurso
                }
                if(dataEstudiante.nombre){
                    /** Registramos la informacion en la base de datos*/
                    registrarEstudiante(dataEstudiante);
                }
            }
        }
        estudiantes.forEach(estudiante =>  {
          registrar(estudiante);
        });
        //console.log(estudiantes);
        await cargarEstudiantesCurso(curso.idcurso);
        setloaderCargaEstudiantes(false);
        cerrarModal();
    }
    const handleCancelar =() =>{
        cerrarModal();    
    }
    return (
        <div className={`modal ${isOpen && 'is-open'}`}>
            {loaderCargaEstudiantes ? <ModalCargaVista/> : null}
            <div className="modal-container">                
                    <div className="formulario-subirestudiantes">
                        <h3>Subir listado de estudiantes</h3>
                            <form className="FormularioRegistro-formulario" >
                                <input type="File" onChange={handleChange}/>
                                <div className='btn-subirestudiantes'>
                                <button type="button" onClick={handleGuardar}>Guardar</button>
                                <button type="button" onClick={handleCancelar}>Cancelar</button>
                                </div>
                            </form>
                    </div>
            </div>
        </div>
    )
}

export default ModalSubirListaEstudiantes;