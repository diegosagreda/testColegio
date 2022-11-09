import React,{useContext, useEffect,useRef,useState} from 'react'
import '../../style/modal/ModalRegistroNota.css';
import {PeticioneApi} from '../../helpers/PeticionesApi';




const ModalRegistroNota = ({isOpen,nota,closeModal,estudiantes,idnota,setregistrarNota,calcularNotasFinales}) => {
   
    const {registrarNotaEstudiante,cargarNotas} = PeticioneApi();
    const notaNueva = useRef(null);
    const [nombreEstudiante, setnombreEstudiante] = useState("");

    useEffect(()=>{
        const estudiante = estudiantes.filter(estudiante => estudiante.idestudiante === nota[0].idestudiante);
        setnombreEstudiante(estudiante[0].nombre)

    
    },[nota]);
     
    //Funcion actualizar informacion empleado
    const handleRegistrarNotas = async(e) => {
        e.preventDefault();
        await registrarNotaEstudiante(idnota,notaNueva.current.value);
        //Ahora refrescamos la tabla notas
        setregistrarNota(false);
        await cargarNotas();
        closeModal();
        setregistrarNota(true);
        calcularNotasFinales();
    }
  
    return (
        <div className={`modal ${isOpen && 'is-open'}`}>
            <div className="modal-container">
                
                    <div className="FormularioRegistro">
                        <h3>Registro Nota</h3>
                            <form className="FormularioRegistro-formulario" >
                                <div className="formulario-inputs">
                                    <label 
                                        htmlFor="nombre">Nombre: 
                                        <span> {nombreEstudiante}</span>
                                    </label> 
                                    <input  style={{display:'block'}}
                                            type="number" 
                                            ref={notaNueva} 
                                            defaultValue={nota[0].valor}/>
                                </div>
                                <div class='formulario-botones'>
                                    <button type='submit' 
                                    onClick={handleRegistrarNotas}>
                                    Guardar
                                    </button>
                                </div>
                            </form>
                    </div>
            </div>
        </div>
    )
}

export default ModalRegistroNota;

