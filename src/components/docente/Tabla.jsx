import React, { useState,useContext,useEffect } from 'react'
import '../../style/docente/Tabla.css'
import Logo from '../../img/escudo.png';
//Importamos modal pagos extra y programaciones
import ModalRegistroNota from '../modal/ModalRegistroNota';
import {AppContext} from '../../context/AppContext';
import { PeticioneApi } from '../../helpers/PeticionesApi';



const Tabla = ({estudiantes,faltas,notasDefinitivas}) => {

  const {cargarDesempeñosDeMateriaEnCurso} = PeticioneApi();
  const {curso,allactividades,desempeñosAux,actividades,asignatura,notas,nota, setnota} = useContext(AppContext);
  const [notasFinales, setnotasFinales] = useState([]);
  //Aqui ordenamos los desempeños de forma ascendete 1 ... n
  desempeñosAux.sort(function(a,b) {
    return a.iddesempeño - b.iddesempeño;
  });
  //Calculo de notas finales
  const calcularNotasFinales = () => {
     //Iteramos estudiantes
   let finales = []
   estudiantes.forEach(estudiante => {
     let notasEstudiante = notas.filter(nota => nota.idestudiante === estudiante.idestudiante);
     let sumaNotaEstu = 0;
     let defestu = 0;
     //Iteramos de forma individual las notas del estudiante
     notasEstudiante.forEach(notaEstu => {
       let valor = notaEstu.valor === " " ? 0 : parseFloat(notaEstu.valor);
       sumaNotaEstu += valor; 
     });
     //Calculamos nota final con la cantidad de estudiantes
     defestu = sumaNotaEstu / allactividades.length;
     let defAprox = defestu.toFixed(2);
     finales.push({
       idestudiante:estudiante.idestudiante,
       notadef:defAprox
     });
     
   });
   setnotasFinales(finales);
  }
  useEffect(()=>{
    console.log('Dsmps: ',desempeñosAux)
    calcularNotasFinales();
  },[]);
  
  const [registrarNota, setregistrarNota] = useState(false);
  const [tomarAsistencia, settomarAsistencia] = useState(false);
  const inputsNotas = [];
  /**Modal ------------------------------------------*/
  const [isOpen, setisOpen] = useState(false);
  const openModal = () => setisOpen(true);
  const closeModal = () => setisOpen(false)
  const [idnota, setidnota] = useState("");
  //------------------------------------------------

  const handleRegistrarNota = (e) =>{
    e.preventDefault();
    setregistrarNota(true);
    //Creamos las variables para manejar los valores de los inputs
    actividades.forEach(actividad => {
      inputsNotas.push(actividad.id);
    });
  }
  const handleEditarNotas = (idnota)=>{
    //console.log(estudiantes.filter(estudiante => estudiante.id === id))
    setidnota(idnota);
    setnota(notas.filter(nota => nota.idnota === idnota));
    openModal();

  }
  const handletomarAsistencia = (e) =>{
    e.preventDefault();
    settomarAsistencia(true);
  }
  const handleGuardar = (e) =>{
    e.preventDefault();
    setregistrarNota(false);
    settomarAsistencia(false);
    calcularNotasFinales();
    //Caculamos promedios de desempeño
  }

  const handleCargarPeriodo1 = async (e) => {
    await cargarDesempeñosDeMateriaEnCurso(curso.idcurso,asignatura.idasignatura,"I")
  }
  const handleCargarPeriodo2 = async (e) => {
    await cargarDesempeñosDeMateriaEnCurso(curso.idcurso,asignatura.idasignatura,"II")
  }

  let indice = 0;
           
  return (
    <div class="outer-wrapper-estudiantes">
      {/*<button type="button" onClick={handleCargarPeriodo1}>Periodo 1</button>
      <button type="button" onClick={handleCargarPeriodo2}>Periodo 2</button>
      <button>Periodo 3</button>
      <button>Periodo 4</button> */}
       {isOpen && <ModalRegistroNota isOpen={isOpen} 
                                     closeModal={closeModal}
                                     nota={nota}
                                     estudiantes={estudiantes}
                                     idnota={idnota}
                                     setregistrarNota={setregistrarNota}
                                     calcularNotasFinales={calcularNotasFinales}/>}
            <div class="table-wrapper-estudiantes">
                <div className='header'>
                  <div className='info-institucion'>

                      <img src={Logo} alt="" />
                      <div>
                        <h1>Institucion Educativa Rural Rafael Reyes</h1>
                        <h4>Modalidad Tecnico Comercial</h4>
                        <h4>Santa Lucia - Municipio Puerto Guzman</h4> 
                        <h2>Formato para la evaluacion de desempeños</h2>
                      </div>
                      <div className='acciones'>
                        <button type='submit' onClick={handleRegistrarNota}>Registrar notas</button>
                        {/*<button type='submit' onClick={handletomarAsistencia}>Tomar asistencia</button>*/}
                        <button type='submit' onClick={handleGuardar}>Guardar</button>
                      </div>
                    
                  </div>
                  <div className='info-seguimiento'>
                    <p>Area: <span>{asignatura.nombre}</span></p>
                    <p>Grado: <span>{curso.grado}</span></p>
                    <p>Grupo: {curso.grupo}</p>
                    <p>Periodo: <span>1</span></p>
                  </div>
                </div>
                <table className='tabla-academico'>
                    <thead className='encabezado'>
                      <tr className='encabezado-general'>
                          <th className='info-estudiante' colSpan="2">Estudiantes</th>
                          {
                            desempeñosAux.map(desempeño => (
                              <th key={desempeño.iddesempeño} colSpan={desempeño.actividades}>
                                <th>
                                    {desempeño.nombre}<span> ({desempeño.porcentaje}%)</span>
                                </th>                                                              
                              </th>
                              
                            ))
                          }
                      </tr>
                      <tr>
                          <th width="3%">No</th>
                          <th >Nombre</th>
                          {
                            allactividades.map(actividad => (
                              <th width="3%" key={actividad.idactividad} className="campo-act">{actividad.nombre}</th>
                             
                            ))
                           
                          }
                          
                          {
                            tomarAsistencia && <th className='asistencia'>Asis</th> 
                          }
                          <th className='definitiva'>Def</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        estudiantes.map(estudiante => {
                          indice += 1;
                          return(
                            <tr key={estudiante.nombre}>
                              <td>{indice}</td>
                              <td> {estudiante.apellido}{" "}{estudiante.nombre} </td>
                              {
                                notas.map(nota => (
                                  (nota.idestudiante === estudiante.idestudiante
                                  && nota.idasignatura === asignatura.idasignatura)?
                                      registrarNota?
                                         <td>
                                                  <input 
                                                  readOnly
                                                  className='input' 
                                                  defaultValue={nota.valor}
                                                  onClick={()=>handleEditarNotas(nota.idnota)}/>
                                        </td> 
                                          :
                                        <td key={nota.idnota}>{nota.valor}</td>
                                        
                                  :null
                                ))
                              }
                             
                              {tomarAsistencia && 
                                faltas.map(falta=>(
                                  falta.id_estudiante === estudiante.id?
                                    <td>{falta.cantidad}
                                                <button>X</button>
                                    </td>
                                  :null
                                ))
                              }
                        
                              {notasFinales.map(nota => (
                                  nota.idestudiante === estudiante.idestudiante? 
                                  <td>{nota.notadef}</td>
                                  :
                                  null
                                )
                              )}
                              
                            
                            </tr>
                          ) 
                      })
                      }
                    </tbody>
                </table>
            </div>
        </div>
       
  )
}

export default Tabla