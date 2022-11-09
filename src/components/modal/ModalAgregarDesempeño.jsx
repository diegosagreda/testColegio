import React,{useState,useContext,useEffect} from "react";
import '../../style/modal/ModalAgregarDesempeño.css';
import TablaVistaPrevia from "../docente/TablaVistaPrevia";
import {AppContext} from '../../context/AppContext';
import { PeticioneApi} from '../../helpers/PeticionesApi';

const ModalAgregarDesempeño =({cerrarModal})=>{


    const {asignatura,desempeño,curso,estudiantes,setDesempeño,setActividades,actividad,setActividad} = useContext(AppContext);
    const {registrarDesempeño,seleccionarDesempeño,registrarActividad,cargarActividadesDesempeño,registrarNota,cargarDesempeñosDeMateriaEnCurso,actualizarDesempeño,actualizarActividad,cargarAllActividades} = PeticioneApi();
    const handleCerrarModal=async(e)=>{
        e.preventDefault();
        cerrarModal();
        setDesempeño({});
        setActividad({});
        setActividades([]);
        await cargarAllActividades();
    }
    const [descripcionActividad, setdescripcionActividad] = useState(actividad.nombre ? actividad.nombre: '');
    const [dataActividad, setdataActividad] = useState({
        nombre: actividad.nombre ? actividad.nombre:"",
        iddesempeño: desempeño.iddesempeño,
        periodo: desempeño.periodo
    });
    const [nuevaActividad, setnuevaActividad] = useState(false);
    useEffect(()=>{
        !actividad.nombre?
        document.getElementById('text-actividad').setAttribute('disabled','disabled') 
        :
        document.getElementById('text-actividad').removeAttribute('disabled') 
        !actividad.nombre?
        document.getElementById('btn-add-actividad').setAttribute('disabled','disabled')
        :
        document.getElementById('btn-add-actividad').removeAttribute('disabled')
        setdescripcionActividad(actividad.nombre);

        document.getElementById('text-actividad').value = actividad.nombre? actividad.nombre: "" ;
        dataActividad.nombre = actividad.nombre;

        //Validacion nueva actividad
    },[actividad])
    useEffect(()=>{
        setActividad({});
    },[nuevaActividad])


    const [dataDesempeño, setdataDesempeño] = useState({
        nombre: desempeño.nombre? desempeño.nombre : "Desempeño ",
        descripcion: desempeño.descripcion? desempeño.descripcion: "",
        porcentaje: desempeño.porcentaje? desempeño.porcentaje : "",
        idasignatura: desempeño.idasignatura? desempeño.idasignatura : asignatura.idasignatura,
        periodo: desempeño.periodo? desempeño.periodo : "",
        idcurso: desempeño.idcurso ? desempeño.idcurso : curso.idcurso
    });
   
    
    const handleChangeDesempeño=(e)=>{
        setdataDesempeño({
            ...dataDesempeño,
            [e.target.name]:e.target.value
        });
    }
    const handleChangeActividad=(e)=>{
        setdataActividad({
            ...dataActividad,
            [e.target.name]:e.target.value
        });
    }
    const handleGuardarDesempeño= async(e)=>{
        e.preventDefault();
        //Antes de registrar el desempeños revisampos que la infromacion este completa
        if(dataDesempeño.descripcion && dataDesempeño.porcentaje && dataDesempeño.periodo){
            //Validacion de registro o actualizacion
            if(desempeño.iddesempeño){
                 await actualizarDesempeño(dataDesempeño,desempeño.iddesempeño);
                 setDesempeño(dataDesempeño);
                 //Actualizamos desempeños en el frontend
                 await cargarDesempeñosDeMateriaEnCurso(curso.idcurso,asignatura.idasignatura);
                
            }else{
                const response = await registrarDesempeño(dataDesempeño);
                await seleccionarDesempeño(response[0].iddesempeño);
                if(response.length > 0){
                    setdataActividad({
                        ...dataActividad,
                        iddesempeño:response[0].iddesempeño
                    });
                    //Actualizamos desempeños en el frontend
                    await cargarDesempeñosDeMateriaEnCurso(curso.idcurso,asignatura.idasignatura);
                }
            }
            //Manipulacion del ciclo de vida del componente
            //Limpiamos campo desempeño y bloqueamos los campos correspondientes
            document.getElementById('campodesempeño').value = '';
            document.getElementById('campodesempeño').setAttribute('disabled','disabled');
            document.getElementById('btn-add-desempeño').setAttribute('disabled','disabled');
            document.getElementById('porcentaje').setAttribute('disabled','disabled');
            document.getElementById('porcentaje').value = '';
            document.getElementById('periodo').setAttribute('disabled','disabled');
            document.getElementById('text-actividad').removeAttribute('disabled');
            document.getElementById('btn-add-actividad').removeAttribute('disabled');

            //Limpiamos el objeto data desempeño
            dataDesempeño.descripcion = '';
            dataDesempeño.periodo = '';
            dataDesempeño.porcentaje = '';

        }else{
            alert('Informacion incompleta para registrar el desempeño');
        }
    }
    const handleGuardarActividad= async(e)=>{
        e.preventDefault();
        //Validamos que el campo de actividad este con cpntenidp
        if(dataActividad.nombre){
            //Validacion de registro o actualizacion
            if(actividad.nombre){
                await actualizarActividad(dataActividad,actividad.idactividad);
                await cargarActividadesDesempeño(dataActividad.iddesempeño);
                setActividad(dataActividad);
                //document.getElementById('text-actividad').value = '';
            }else{
                const response = await registrarActividad(dataActividad);
                await cargarActividadesDesempeño(dataActividad.iddesempeño);
                //Registramos la plantilla de nota para esta actividad
                //Recorremos estudiantes
                if (response.length > 0){
                    estudiantes.forEach(estudiante => {
                        let dataNota = {
                            valor:" ",
                            idactividad: response[0].idactividad,
                            iddesempeño:dataActividad.iddesempeño,
                            idestudiante:estudiante.idestudiante,
                            idcurso: curso.idcurso,
                            idasignatura: asignatura.idasignatura
                        }
                        //Ahora registramos la plantilla de nota
                        registrarNota(dataNota);
                    });
                }

            }
            //Limpiamos campo actividad
            document.getElementById('text-actividad').value = '';
            //Borramos buffer del campo
            dataActividad.nombre = '';
        }else{
            alert('Registra la actividad a registrar');
        }

    }
    const handleNuevoDesempeño= async(e)=>{
        e.preventDefault();
        document.getElementById('campodesempeño').value = '';
        document.getElementById('campodesempeño').removeAttribute('disabled');
        document.getElementById('btn-add-desempeño').removeAttribute('disabled');
        document.getElementById('porcentaje').removeAttribute('disabled');
        document.getElementById('periodo').removeAttribute('disabled');
        document.getElementById('text-actividad').setAttribute('disabled','disabled');
        document.getElementById('btn-add-actividad').setAttribute('disabled','disabled');

        //Reseteamos la tabla de visualizacion de desempeños y actividades
        setActividades([]);
        setDesempeño({});
    }
 
    
    const handleNuevaActividad = (e)=>{
        e.preventDefault();
        setnuevaActividad(true);
        document.getElementById('text-actividad').removeAttribute('disabled') 
        document.getElementById('btn-add-actividad').removeAttribute('disabled');
    }

    return(
        <>      
            <div className="inf-desempeño">  
                          
                <div className="contenedor-inf-desempeño">
                <section className=" encabezado-modal-desempeño">
                    <div className="titulo-modal-desempeño">
                            <h3>{desempeño.iddesempeño? 'Actualizar desempeño': 'Registro de Desempeños'}
                            </h3>
                        </div>
                        <a className="salir-modal" onClick={handleCerrarModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"      
                                viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                        </a>  
                        </section>
                        <main className="vista-general">
                        <div className="datos-desempeño">
                                <div className="desempeño-informacion">
                                    <div className="seleccionar-periodo">
                                    <h3>Periodo</h3>
                                    <select 
                                        id="periodo"
                                        name="periodo" 
                                        onChange={handleChangeDesempeño}>
                                        <option>--Seleccionar--</option>
                                        {desempeño.iddesempeño && desempeño.periodo === 'I'?
                                            <option selected='selected'>I</option>
                                            :
                                            <option>I</option>
                                        }
                                        {desempeño.iddesempeño && desempeño.periodo === 'II'?
                                            <option selected='selected'>II</option>
                                            :
                                            <option>II</option>
                                        }
                                        {desempeño.iddesempeño && desempeño.periodo === 'III'?
                                            <option selected='selected'>III</option>
                                            :
                                            <option>III</option>
                                        }
                                        {desempeño.iddesempeño && desempeño.periodo === 'IV'?
                                            <option selected='selected'>IV</option>
                                            :
                                            <option>IV</option>
                                        }
                                    </select>                               
                                </div>                                                           
                                </div>
                                <h3>Desempeño</h3>
                                <div className="actividades">
                                 <input
                                    id="porcentaje"
                                    placeholder="%" 
                                    name="porcentaje" 
                                    type="text"
                                    defaultValue={desempeño.iddesempeño?desempeño.porcentaje:""} 
                                    onChange={handleChangeDesempeño}/>   
                                <textarea 
                                    id="campodesempeño" 
                                    name="descripcion" 
                                    rows="8" 
                                    cols="90" 
                                    defaultValue={desempeño.iddesempeño ? desempeño.descripcion:""} 
                                    onChange={handleChangeDesempeño}></textarea> 
                                <button
                                    id="btn-add-desempeño" 
                                    type="button" 
                                    onClick={handleGuardarDesempeño}>
                                        {desempeño.iddesempeño?"Actualizar":"Guardar"} 
                                    </button>
                                </div>

                                <h3>Actividades</h3>
                                <div className="actividades">                                    
                                    <textarea 
                                        id="text-actividad"
                                        name="nombre"
                                        defaultValue={actividad.nombre ? actividad.nombre : ""} 
                                        onChange={handleChangeActividad} 
                                        rows="7" 
                                        cols="74"></textarea> 
                                    <button type="button" 
                                            id="btn-add-actividad"
                                            onClick={handleGuardarActividad}>
                                            {actividad.nombre ? 'Actualizar' : ' Agregar Actividad'}    
                                           
                                            </button>
                                </div>
                                {!desempeño.iddesempeño?
                                    <div className="btn-inf-desempeño">                             
                                        <button type="button" 
                                            onClick={handleNuevoDesempeño}>Nuevo Desempeño</button>  
                                    </div>
                                    :
                                    <div className="btn-inf-desempeño">                             
                                        <button type="button" 
                                            onClick={handleNuevaActividad}>Nueva Actividad</button>  
                                    </div>
                                }
                                </div>

                                <div className="vista-previa">
                                    
                                    <TablaVistaPrevia/>
                                    
                                    
                                </div>
                       
                        
                        </main>                

                </div>
            </div>
    
        </>
    );
}

export default ModalAgregarDesempeño;
