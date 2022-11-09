import React, {createContext, useState} from 'react'
export const AppContext=createContext();

export const DataProvider=({children})=>{

  const [logueado, setLogueado] = useState(false);
  const [usuario, setUsuario] = useState({});
  const [parceladores, setParceladores] = useState([]);
  const [parcelador, setParcelador] = useState({});
  const [cursos, setCursos] = useState([]);
  const [curso, setCurso] = useState({});
  const [docente, setDocente] = useState({});
  const [asignaturas,setAsignaturas] = useState([]);
  const [asignatura,setAsignatura] = useState({});
  const [estudiantes,setEstudiantes] = useState([]);
  const [desempeño, setDesempeño] = useState({});
  const [actividades,setActividades] = useState([]);
  const [desempeños, setDesempeños] = useState([]);
  const [allactividades,setallActividades] = useState([]);
  const [desempeñosAux, setDesempeñosAux] = useState([]);
  const [notas,setNotas] = useState([]);
  const [nota, setnota] = useState({});
  const [faltas,setFaltas] = useState([]);
  const [estudiante, setEstudiante] = useState({});
  const [actividad, setActividad] = useState({});
  const [cursosAsignaturas, setcursosAsignaturas] = useState([]);
  const [actividadesParcel, setActividadeParcel ] = useState([]);
  const [parceladoresFecha, setparceladoresFecha] = useState([]);
 
  
  const [todoDesempeños, setTodoDesempeños] = useState([]);
  const [todoCursos, setTodoCursos] = useState([]);
  const [todoAsignaturas, setTodoAsignaturas] = useState([]);
 
  
  
  
  return (
    <AppContext.Provider value={{
      logueado, setLogueado, 
      usuario, setUsuario,
      parceladores, setParceladores,
      parcelador,setParcelador,
      cursos, setCursos,
      docente,setDocente,
      curso,setCurso,
      asignaturas,setAsignaturas,
      asignatura,setAsignatura,
      estudiantes,setEstudiantes,
      desempeño,setDesempeño,
      actividades,setActividades,
      desempeños, setDesempeños,
      allactividades,setallActividades,
      desempeñosAux,setDesempeñosAux,
      notas,setNotas,
      nota,setnota,
      faltas,setFaltas,
      estudiante,setEstudiante,
      actividad,setActividad,
      cursosAsignaturas,setcursosAsignaturas,
      actividadesParcel,setActividadeParcel,
      parceladoresFecha,setparceladoresFecha,
      todoDesempeños, setTodoDesempeños,
      todoCursos,setTodoCursos,
      todoAsignaturas,setTodoAsignaturas

     
      
    }}>{children}</AppContext.Provider>
  )
}
