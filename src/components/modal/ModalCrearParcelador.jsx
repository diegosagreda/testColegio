import React,{useState,useContext,useRef} from "react";
import '../../style/modal/ModalCrearParcelador.css';
import { AppContext } from "../../context/AppContext";
import {PeticioneApi} from '../../helpers/PeticionesApi';


const ModalCrearObservador =({cerrarModal})=>{

    const {desempeños,setDesempeño,setActividad,allactividades,actividades, setActividades,asignatura,curso,docente,actividadesParcel,parcelador,setParcelador} = useContext(AppContext);
    const {registrarParcelador,cargarParceladores,cargarAllActividades,actualizarParcelador} = PeticioneApi();
    const desmp = useRef(null);
    const activ = useRef(null);
    const periodo = useRef(null);
    const [desempeñosPeriodo, setdesempeñosPeriodo] = useState([]);

    
    const handleCerrarModal=(e)=>{
        e.preventDefault();
        cerrarModal();
        setActividad({});
        setDesempeño({});
        setActividades([]);
        setParcelador({})
    }
    
    const [dataParcelador, setdataParcelador] = useState({
        fecha:parcelador.fecha ? parcelador.fecha: "",
        hora:parcelador.hora ? parcelador.hora:"",
        periodo:parcelador.periodo ? parcelador.periodo: "",
        estandar:parcelador.estandar ? parcelador.estandar: "",
        competencia:parcelador.competencia ? parcelador.competencia: "",
        tema:parcelador.tema ? parcelador.tema: "",
        recursos:parcelador.recursos ? parcelador.recursos: "",
        evaluacion:parcelador.evaluacion ? parcelador.evaluacion: "",
        idasignatura:parcelador.idasignatura ? parcelador.idasignatura : asignatura.idasignatura,
        iddocente:parcelador.iddocente ? parcelador.iddocente : docente.iddocente,
        iddesempeño:parcelador.iddesempeño ? parcelador.iddesempeño: "",
        idactividad:parcelador.idactividad ? parcelador.idactividad:"",
        idcurso:parcelador.idcurso ? parcelador.idcurso:curso.idcurso
    });
    const handleChange=(e)=>{
        setdataParcelador({
            ...dataParcelador,
            [e.target.name]:e.target.value
        });
    }
    const seleccionarDesempeño =()=>{
    
        //Necesitamos la id del desempeño seleccionado
        const desempeñoSelec = desempeños.find(desempeño => desempeño.descripcion === desmp.current.value);
        setDesempeño(desempeñoSelec)
        const activiDesem = actividadesParcel.filter(actividad => actividad.iddesempeño === desempeñoSelec.iddesempeño)
       
        //Seteamos las actividades para el select actividades
        setActividades(activiDesem);
        setdataParcelador({
            ...dataParcelador,
            iddesempeño:desempeñoSelec.iddesempeño
        })
    }
    const seleccionarActividad =()=>{
        let act = actividadesParcel.find(actividad => actividad.nombre === activ.current.value);
        setActividad(act);
        setdataParcelador({
            ...dataParcelador,
            idactividad:act.idactividad
        })
    }
    const handleGuardar = async(e)=>{
      e.preventDefault();
      //Realizamos validacion de campos 
      if(dataParcelador.fecha && dataParcelador.hora && dataParcelador.periodo && dataParcelador.estandar &&
      dataParcelador.competencia && dataParcelador.tema && dataParcelador.recursos &&
      dataParcelador.evaluacion && dataParcelador.idasignatura &&dataParcelador.iddocente &&
      dataParcelador.iddesempeño && dataParcelador.idactividad){
          //Validacion si de actualizacion o registro
          if(parcelador.idparcelador){
                await actualizarParcelador(dataParcelador,parcelador.idparcelador);
          }else{
              await registrarParcelador(dataParcelador);
          }
          await cargarParceladores();
      }else{
        alert("Informacion incompleta");
      }
    }
    //Funcion para seleccionar el periodo y filtrar los desempeños correspondientes a ese desempeños
  
    const handleSeleccionarPeriodo = async ()=>{
        //Aqui tenemos el periodo seleccionado entonces filtramos los desempeños del periodo
        //console.log('All: ',desempeños)
        const desemPeriodo = desempeños.filter(d => d.periodo === periodo.current.value);
        //console.log('Filtr: ',desemPeriodo);
        setdesempeñosPeriodo(desemPeriodo);
        await cargarAllActividades();

    }
    const handleVerificarDesemPerido = ()=>{
        /* if(desempeñosPeriodo.length === 0){
            alert('En el perido seleccionado no hay desempeños registrados');
        } */
    }
    return(       
            <>      
                <div className="ModalCrearParcelador">                 
                    <div className="contenedor-crearParcelador">
                    <section className=" encabezado-modal-parcelador">
                        <div className="encab-modal-titulo">
                                <h3>{parcelador.idparcelador ? 'Actualizar Parcelador':'Crear Parcelador'}</h3>
                            </div>
                            <a className="salir-modal" onClick={handleCerrarModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"      
                                    viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                            </a>  
                            </section>
                            <div className="cur-grad-mat">                       
                                
                                {
                                    !parcelador.idparcelador &&
                                    <>
                                        <h3>Periodo</h3>
                                        <select
                                            id="periodo"
                                            name="periodo"
                                            ref={periodo} 
                                            onClick={handleSeleccionarPeriodo}   
                                            onChange={handleChange}>
                                            <option>--Seleccionar--</option>
                                            {
                                                parcelador.periodo === 'I'?
                                                <option selected='selected' defaultValue='I'>I</option>:
                                                <option defaultValue='I'>I</option>
                                            }
                                            {
                                                parcelador.periodo === 'II'?
                                                <option selected='selected' defaultValue='II'>II</option>:
                                                <option >II</option>
                                            }
                                            {
                                                parcelador.periodo === 'III'?
                                                <option selected='selected' defaultValue='III'>III</option>:
                                                <option >III</option>
                                            }
                                            {
                                                parcelador.periodo === 'IV'?
                                                <option selected='selected' defaultValue='IV'>IV</option>:
                                                <option >IV</option>
                                            }
                                        
                                        </select>  
                                    </>
                                }

                                <form action="" method="">
                                    <input onClick={handleVerificarDesemPerido} name="fecha" onChange={handleChange} type="date" defaultValue={parcelador.fecha? parcelador.fecha:""}></input>
                                </form>
                                <form action="" method="">
                                    <input onClick={handleVerificarDesemPerido} name="hora" onChange={handleChange} type="time" defaultValue={parcelador.hora ? parcelador.hora : ""}></input>
                                </form>
                        </div>

                        
                        <form className="cont-parcelador">
                            <label>Estandar</label>
                            <textarea onClick={handleVerificarDesemPerido} name="estandar" onChange={handleChange} rows="3" cols="90" defaultValue={parcelador.estandar ? parcelador.estandar : ""}></textarea>

                            <label>competencia</label>
                            <textarea onClick={handleVerificarDesemPerido} name="competencia" onChange={handleChange} rows="3" cols="90" defaultValue={parcelador.competencia ? parcelador.competencia : ""}></textarea>

                            <label>Tema Clase</label>
                            <textarea onClick={handleVerificarDesemPerido} name="tema" onChange={handleChange} rows="3" cols="90" defaultValue={parcelador.tema ? parcelador.tema : ""}></textarea>  

                            {
                                !parcelador.idparcelador && 
                                <>
                                    <label>Desempeño Clase</label>
                                    <select 
                                        id="iddesempeño"
                                        name="iddesempeño" 
                                        ref={desmp}
                                        onClick={seleccionarDesempeño}
                                        >
                                            <option>--Seleccionar</option>
                                            {
                                                desempeñosPeriodo.map(desempeño =>(
                                                    <option>{desempeño.descripcion}</option>
                                                ))
                                            }
                                    </select>                            
                                    <label>Actividades</label>
                                    <select 
                                        name="idactividad"
                                        ref={activ}
                                        onClick={seleccionarActividad} 
                                        >
                                            <option>--Seleccionar</option>
                                            
                                            {
                                            actividades.map(actividad =>(
                                                <option>{actividad.nombre}</option>
                                            ))
                                            }
                                    </select>
                                
                                </>
                            }

                            <label>Recursos</label>
                            <textarea onClick={handleVerificarDesemPerido} name="recursos" onChange={handleChange} rows="3" cols="90" defaultValue={parcelador.recursos ? parcelador.recursos : ""}></textarea>

                            <label>Evaluación</label>
                            <textarea onClick={handleVerificarDesemPerido} name="evaluacion" onChange={handleChange} rows="3" cols="90" defaultValue={parcelador.evaluacion ? parcelador.evaluacion : ""}></textarea>  
                        </form>    
                        <button type="button" onClick={handleGuardar}>
                            {parcelador.idparcelador ?
                                'Actualizar': "Guardar"
                            }    
                        </button>     
    
                    </div>
                </div>
        
            </>
        );
    }         

export default ModalCrearObservador;
