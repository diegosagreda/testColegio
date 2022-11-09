import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Swal from 'sweetalert2';

export const PeticioneApi = () => {

    let production = 'https://api-colegiorafaelreyes.herokuapp.com';
    //let production = 'http://localhost:3050';
    //let production = 'http://192.168.1.14:3050';
    //peticiones

    const { setUsuario, 
            setParceladores, 
            setCursos, 
            setDocente, 
            setAsignaturas, 
            setAsignatura, 
            setCurso,
            setEstudiantes, 
            setDesempeño, 
            setActividades, 
            setDesempeños, 
            setallActividades, 
            desempeñosAux, 
            setNotas, 
            asignaturas,
            curso, 
            asignatura,
            allactividades,
            setEstudiante,
            setActividad,
            desempeño,
            setcursosAsignaturas,
            docente,parceladores,
            setParcelador,desempeños,
            cursos,
            actividades,
            setActividadeParcel,
            actividadesParcel,
            setparceladoresFecha,
            setTodoDesempeños,
            todoDesempeños,
            setTodoCursos,
            todoCursos,
            todoAsignaturas,
            setTodoAsignaturas,
            setDesempeñosAux,
                     
         } = useContext(AppContext);

    const cargarDocentePorID = async (id) => {
        try {
            const respuesta = await fetch(production + '/docentes/' + id);
            if (respuesta.status === 200) {
                const resp = await respuesta.json();
                await setDocente(resp[0]);
            } else {
                setDocente([]);
            }

        } catch (error) {
            console.log("Algo salio mal con iniciar sesion")
        }
    }
    const cargarEstudianteById = async (id) => {
        try {
            const respuesta = await fetch(production + '/estudiantes/' + id);
            if (respuesta.status === 200) {
                const resp = await respuesta.json();
                await setEstudiante(resp[0]);
            } else {
                setEstudiante([]);
            }

        } catch (error) {
            console.log("Algo salio mal con iniciar sesion")
        }
    }
    //Metodo para cargar todos los parceladores con la fecha actual una vez se inicie sesion
    const cargarParceladores = async () => {
        
        try {
            const respuesta = await fetch(production + '/parceladores');
            if (respuesta.status === 200) {
                const resp = await respuesta.json()
                //console.log(resp)
                //Filtramos parceladores docente
                const parceFecha = resp.filter(p =>  p.iddocente === docente.iddocente);
                setParceladores(parceFecha);
                
            } else {
                setParceladores([]);
                setparceladoresFecha([]);
            }

        } catch (error) {
            console.log("Algo salio mal al cargar parceladores")
        }
    }
    const cargarParceladoresPorFecha = async (fecha) =>{
        const parceFecha = parceladores.filter(p => p.fecha === fecha);
        if(parceFecha.length > 0){
            setparceladoresFecha(parceFecha);
        }else{
            setparceladoresFecha([]);
        }
    }

    //Metodo para cargar los cursos del docente logeado
    const cargarCursosDocente = async (id) => {
        try {
            const respuesta = await fetch(production + '/docentes/cursos/' + id);
            if (respuesta.status === 200) {
                const resp = await respuesta.json()
                let resul = resp.reduce((a, e) => {
                    if (!a.find(d => d.idcurso === e.idcurso)) {
                        a.push(e)
                    }
                    return a;
                }, []);
                await setCursos(resul);
            } else {
                setCursos([]);
            }

        } catch (error) {
            console.log("Algo salio mal con iniciar sesion")
        }
    }
    //Metodo para cargar cursos y asignaturas
    const cargarCursosAsignaturas = async(iddocente)=>{
        try {
            const respuesta = await fetch(production + '/cursosasignaturas/' + iddocente);
            if (respuesta.status === 201) {
                const resp = await respuesta.json()
                setcursosAsignaturas(resp);
            } else {
                setcursosAsignaturas([]);
            }

        } catch (error) {
            console.log("Algo salio mal con iniciar sesion")
        }
    }
    //Cargar todos los cursos 
    const cargarTodosLosCursos = async()=>{
        try {
            const respuesta = await fetch(production + '/cursos');
            if (respuesta.status === 201) {
                const resp = await respuesta.json()
                setTodoCursos(resp);
            } else {
                setTodoCursos([]);
            }

        } catch (error) {
            console.log("Algo salio mal con cargar todos los cursos")
        }
    }
    //Metodo para cargar las actividades de un desempeño
    const cargarActividadesDesempeño = async (id) => {
        try {
            const respuesta = await fetch(production + '/actividades/' + id);
            if (respuesta.status === 200) {
                const resp = await respuesta.json()
                await setActividades(resp);
                return resp;
            } else {
                setActividades([]);
            }

        } catch (error) {
            console.log("Algo salio mal con iniciar sesion")
        }
    }
    //Metodo para cargar todas la actividades de la base de datos
    const cargarAllActividades = async ()=>{
       
        try {
            const respuesta = await fetch(production + '/actividades');
          
            if (respuesta.status === 201) {
                const resp = await respuesta.json()
                await setActividadeParcel(resp);
             
                return resp;
            } else {
                setActividadeParcel([]);
            }

        } catch (error) {
            console.log("Algo salio mal al cargar todas las actividades")
        }
    }
    //Metodo para cargar todas las actividades de una materia en un curso
    const cargarActividadesMateriaEnCurso = async (idcurso, idasignatura) => {

        try {
            const respuesta = await fetch(production + '/cursos/' + idcurso + '/' + idasignatura);

            if (respuesta.status === 200) {
                const resp = await respuesta.json()
                await setallActividades(resp);
              
                return resp;
            } else {
                setallActividades([]);
               
            }

        } catch (error) {
            console.log("Algo salio mal con iniciar sesion")
        }
    }
    //Metodo para cargar las asignaturas que el docente dicta en el curso
    const cargarAsignaturasCurso = async (iddocente, idcurso) => {
        try {
            const respuesta = await fetch(production + '/docentes/' + iddocente + '/cursos/' + idcurso);
            if (respuesta.status === 200) {
                const resp = await respuesta.json()
                await setAsignaturas(resp);
            } else {
                setAsignaturas([]);
            }

        } catch (error) {
            console.log("Algo salio mal con iniciar sesion")
        }
    }
    //Metodo para cargar todas las asignaturas
    const cargarAsignaturas = async ()=> {
        try {
            const respuesta = await fetch(production + '/asignaturas');
            if (respuesta.status === 200) {
                const resp = await respuesta.json()
                await setTodoAsignaturas(resp);
            } else {
                setTodoAsignaturas([]);
            }

        } catch (error) {
            console.log("Algo salio mal con cargar todas las asignaturas")
        }
    }
    //Metodo para cargar los estudiantes de un curso
    const cargarEstudiantesCurso = async (idcurso) => {
        try {
            const respuesta = await fetch(production + '/estudiantes/cursos/' + idcurso);
            if (respuesta.status === 200) {
                const resp = await respuesta.json()
                await setEstudiantes(resp);
            } else {
                setEstudiantes([]);
            }

        } catch (error) {
            console.log("Algo salio mal con iniciar sesion")
        }
    }
    //Cargar notas
    const cargarNotas = async () => {
        try {
            const respuesta = await fetch(production + '/notas');
            if (respuesta.status === 200) {
                const resp = await respuesta.json()
             /*    //Recorremos array de allactividades
                let notasEnv = []
                resp.forEach(nota => {
                    allactividades.forEach(actividad => {
                        if(nota.idactividad === actividad.idactividad){
                            notasEnv.push(nota);
                        }
                    });
                }); */
                await setNotas(resp);

            } else {
                setNotas([]);
            }

        } catch (error) {
            console.log("Algo salio mal con cargar notas")
        }
    }
    //Metodo para cargar los desempeños de una materia en un curso
    const cargarDesempeñosDeMateriaEnCurso = async (idcurso, idasignatura) => {

        try {
            const respuesta = await fetch(production + '/desempenos/cursos/' + idcurso + '/asignaturas/' + idasignatura);
            console.log('rta api: ',respuesta)
            if (respuesta.status === 200) {
                const resp = await respuesta.json()
                
                setDesempeños(resp);
                
                return resp;
            } else {
                setDesempeños([]);
            }
        } catch (error) {
            console.log("Algo salio mal con iniciar sesion")
        }
    }


    //Metodo para cargar todos los desempeños 
    const cargarTodoLosDesempeños = async()=> {
        console.log('Se estan cargando todos los desempeños');
        try {
            const respuesta = await fetch(production + '/desempenosas');

            if (respuesta.status === 200) {
                const resp = await respuesta.json()
                await setTodoDesempeños(resp);
            } else {
                setTodoDesempeños([]);
            }
        } catch (error) {
            console.log("Algo salio mal con cargar todos los desempenos")
        }
    }
    

    const iniciarSesion = async (usuario, contraseña) => {
        try {
            const respuesta = await fetch(production + '/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usuario: usuario,
                    contrasena: contraseña
                })
            });
            if (respuesta.status === 200) {
                const resp = await respuesta.json()
                await setUsuario(resp[0]);
                await cargarDocentePorID(resp[0].iddocente);
                await cargarCursosDocente(resp[0].iddocente);
                await cargarAllActividades();
                await cargarTodoLosDesempeños();
                await cargarAsignaturas()
                await cargarTodosLosCursos()
                await cargarParceladores()

                //console.log('res:',resp[0].iddocente)            
                return true;
            } else {
                return false;
            }

        } catch (error) {
            console.log("Algo salio mal con iniciar sesion",error)
        }
    }

    const registrarUsuario = async (datadocente) => {
        const { nombre, apellido, iddocente, titulo, correo, usuario, contrasena } = datadocente; //desestructurando el objeto es decir los separa
        try {
            //fetch es para consumir una api
            const respuesta = await fetch(production + '/docentes', { // produccion es la url de la api
                method: 'POST', //crear objetos en la base de datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // aqui voy a crear el objeto docente
                    iddocente,
                    nombre,
                    apellido,
                    titulo,
                    correo,
                    usuario,
                    contrasena
                })
            });
            if (respuesta.status === 201) {
                alert('Usuario creado con exito...');
            } else {
                alert('No se puedo crear el usuario...');
            }

        } catch (error) {
            console.log("Algo salio mal al registrar el usuario...")
            console.log(error)
        }
    }
    //Metodo para seleccionar una asignatura
    const seleccionarAsignatura = async (id) => {

       console.log('idasig: ',id)
        try {
            const respuesta = await fetch(production + '/asignaturas/' + id);
            if (respuesta.status === 200) {
                const resp = await respuesta.json();

                await setAsignatura(resp[0]);
            } else {
                setAsignatura([]);
            }

        } catch (error) {
            console.log("Algo salio mal con iniciar sesion")
        }
    }
    //Metodo para obtener un curso por su id
    const seleccionarCurso = async (id) => {
        try {
            const respuesta = await fetch(production + '/cursos/' + id);
            if (respuesta.status === 200) {
                const resp = await respuesta.json();
                await setCurso(resp[0]);
            } else {
                setCurso([]);
            }

        } catch (error) {
            console.log("Algo salio mal con iniciar sesion")
        }
    }
    //Metodo para seleccionar desempeño
    const seleccionarDesempeño = async (id) => {
        try {
            const respuesta = await fetch(production + '/desempenos/' + id);
            if (respuesta.status === 200) {
                const resp = await respuesta.json();
                await setDesempeño(resp[0]);
            } else {
                setDesempeño([]);
            }

        } catch (error) {
            console.log("Algo salio mal con iniciar sesion")
        }
    }
    const seleccionarDesempeño2 = async (id) => {
        setDesempeño(await todoDesempeños.find(d => d.iddesempeño === id));
    }
    
    //Metodo para seleccionar un actividad
    const seleccionarActividad = async(id) =>{
        try {
            const respuesta = await fetch(production + '/actividades/info/' + id);
            if (respuesta.status === 200) {
                const resp = await respuesta.json();
                await setActividad(resp[0]);
            } else {
                setActividad([]);
            }

        } catch (error) {
            console.log("Algo salio mal con iniciar sesion")
        }
    }
    //Seleccionar parceldor del
    const seleccionarParcelador = (id) =>{
        setParcelador(parceladores.find(p => p.idparcelador === id));
    }
    //Metodo para registrar curso y asignatura
    const registrarCursoYAsignatura = async (data) => {
        const { grado, grupo, materia, iddocente } = data; //desestructurando el objeto es decir los separa
        try {
            //fetch es para consumir una api
            const respuesta = await fetch(production + '/cursos', { // produccion es la url de la api
                method: 'POST', //crear objetos en la base de datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // aqui voy a crear el objeto docente
                    grado,
                    grupo,
                    materia,
                    iddocente
                })
            });
            //Pendiente
            if (respuesta.status === 201) {
                Swal.fire({
                    position: 'top-right',
                    icon: 'success',
                    title: 'Registro Exitoso',
                    showConfirmButton: false,
                    timer: 1500
                })
                return respuesta.json();
            }
            if (respuesta.status === 400) {
                alert('La asignatura ya se encuentra registrada en este curso');
            } else {
                alert('No se puedo crear el usuario...');
            }

        } catch (error) {
            console.log("Algo salio mal al registrar el usuario...")
            console.log(error)
        }
    }
    //Metodo para registrar estudiantes
    const registrarEstudiante = async (data) => {
        const { idestudiante, nombre, apellido, telefono, telacudiente, direccion, nomacudiente, idcurso } = data; //desestructurando el objeto es decir los separa
        try {
            //fetch es para consumir una api
            const respuesta = await fetch(production + '/estudiantes', { // produccion es la url de la api
                method: 'POST', //crear objetos en la base de datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // aqui voy a crear el objeto docente
                    idestudiante, nombre, apellido, telefono, telacudiente, direccion, nomacudiente, idcurso
                })
            });
            //Pendiente
            if (respuesta.status === 201) {
                //Cargamos las activades del curso
                //Ahora creamos para el estudiante registrado su respectiva plantilla de notas
                //Siempre y cuando existan actividades 
                if (allactividades.length > 0){
                    allactividades.forEach(actividad => {
                    
                        let dataNota = {
                            valor:" ",
                            iddesempeño: actividad.iddesempeño,
                            idactividad: actividad.idactividad,
                            idestudiante: idestudiante,
                            idcurso: curso.idcurso,
                            idasignatura: asignatura.idasignatura
                        }
                        //Ahora registramos la plantilla de nota
                        registrarNota(dataNota);
                        //console.log(respuesta.json());
                    });
                }else{
                    console.log('No hay activicades')
                }
                await cargarEstudiantesCurso(curso.idcurso);
                return respuesta.json();
                } else if (respuesta.status === 400) {
                    return false;
                }
            else {
                alert('No se puedo crear el usuario...');
            }

        } catch (error) {
            console.log("Algo salio mal al registrar a estudiante...")
            console.log(error)
        }
    }
    //Metodo para actualizar estudiante
    const actualizarEstudiante = async (data) => {
        try {
            //fetch es para consumir una api
            const respuesta = await fetch(production + '/estudiantes/' +data.idestudiante, { // produccion es la url de la api
                method: 'PUT', //crear objetos en la base de datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (respuesta.status === 201) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Informacion actualizada',
                    showConfirmButton: false,
                    timer: 1500
                })
                await cargarEstudiantesCurso(curso.idcurso);
                return respuesta.json();
            }
        } catch (error) {
            console.log("Algo salio al actualizarEstudiante...")
            console.log(error)
        }
    }
    //Metodo para registrar desempeños
    const registrarDesempeño = async (data) => {
        const { nombre, descripcion, porcentaje, idasignatura, periodo, idcurso } = data; //desestructurando el objeto es decir los separa
        try {
            //fetch es para consumir una api
            const respuesta = await fetch(production + '/desempenos', { // produccion es la url de la api
                method: 'POST', //crear objetos en la base de datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // aqui voy a crear el objeto docente
                    nombre, descripcion, porcentaje, idasignatura, periodo, idcurso
                })
            });
            if (respuesta.status === 201) {
                alert('Desempeño registrado con exito...');
                return respuesta.json();
            }
            else {
                alert('No se puedo crear el Desempeño...');
            }

        } catch (error) {
            console.log("Algo salio mal al registrar desempeño...")
            console.log(error)
        }
    }
    //Metodo actualizar desempeño
    const actualizarDesempeño = async (data,iddesempeño) =>{
        try {
            //fetch es para consumir una api
            const respuesta = await fetch(production + '/desempenos/' +iddesempeño, { // produccion es la url de la api
                method: 'PUT', //crear objetos en la base de datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (respuesta.status === 201) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Informacion actualizada',
                    showConfirmButton: false,
                    timer: 1500
                })
                //await cargarEstudiantesCurso(curso.idcurso);
                return respuesta.json();
            }
        } catch (error) {
            console.log("Algo salio al actualizarDesempeño...")
            console.log(error)
        }
    }
    //Metodo para registrar actividad
    const registrarActividad = async (data) => {
        const { nombre, iddesempeño, periodo } = data; //desestructurando el objeto es decir los separa
        try {
            //fetch es para consumir una api
            const respuesta = await fetch(production + '/actividades', { // produccion es la url de la api
                method: 'POST', //crear objetos en la base de datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // aqui voy a crear el objeto docente
                    nombre, iddesempeño, periodo
                })
            });
            if (respuesta.status === 201) {
                alert('Actividad registrada con exito...');
                return respuesta.json();
            }
            else {
                alert('No se puedo crear el Desempeño...');
            }

        } catch (error) {
            console.log("Algo salio mal al registrar Actividad...")
            console.log(error)
        }
    }
    //Metodo para actualizar actividad
    const actualizarActividad = async(data,idactividad) => {
        try {
            //fetch es para consumir una api
            const respuesta = await fetch(production + '/actividades/' +idactividad, { // produccion es la url de la api
                method: 'PUT', //crear objetos en la base de datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (respuesta.status === 201) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Informacion actualizada',
                    showConfirmButton: false,
                    timer: 1500
                })
                //await cargarEstudiantesCurso(curso.idcurso);
                return respuesta.json();
            }
        } catch (error) {
            console.log("Algo salio al actualizarActividad...")
            console.log(error)
        }
    }
    //Metodo para actualizar parcelador
    const actualizarParcelador = async(data,idparcelador) => {
        try {
            //fetch es para consumir una api
            const respuesta = await fetch(production + '/parceladores/' +idparcelador, { // produccion es la url de la api
                method: 'PUT', //crear objetos en la base de datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (respuesta.status === 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Informacion actualizada',
                    showConfirmButton: false,
                    timer: 1500
                })
                //await cargarEstudiantesCurso(curso.idcurso);
                return respuesta.json();
            }
        } catch (error) {
            console.log("Algo salio al actualizar Parcelador...")
            console.log(error)
        }
    }
    //Metodo para registrar una notas plantilla
    const registrarNota = async (data) => {
        const { valor, idactividad, iddesempeño, idestudiante, idcurso, idasignatura } = data; //desestructurando el objeto es decir los separa
        try {
            //fetch es para consumir una api
            const respuesta = await fetch(production + '/notas', { // produccion es la url de la api
                method: 'POST', //crear objetos en la base de datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // aqui voy a crear el objeto docente
                    valor, idactividad, iddesempeño, idestudiante, idcurso, idasignatura
                })
            });
            if (respuesta.status === 201) {
                return respuesta.json();
            }
        } catch (error) {
            console.log("Algo salio mal al registrar Nota...")
            console.log(error)
        }
    }
    //Metodo para registrar parcelador
    const registrarParcelador = async (data) => {
        try {
            //fetch es para consumir una api
            const respuesta = await fetch(production + '/parceladores', { // produccion es la url de la api
                method: 'POST', //crear objetos en la base de datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (respuesta.status === 201) {
                alert("Parcelador Registrado con exito")
                return respuesta.json();
            }
        } catch (error) {
            console.log("Algo salio mal al registrar parcelador...")
            console.log(error)
        }
    }
    /* PENDIENTE FALTAS */
    /*const cargarFaltas = async (data) =>{
        
    }*/
    //Obtener la informacion de un desempeño 
    const getAsignatura = (idasignatura) => {
        return todoAsignaturas.find(asignatura => asignatura.idasignatura === idasignatura);
    }
    //Obtener informacion de cursos
    const getCurso = (idcurso) =>{
        return cursos.find(curso => curso.idcurso === idcurso);
    }
    //Obtener informacion de actividad
    const getActividad = (idactividad) =>{
        return actividadesParcel.find(a => a.idactividad === idactividad);
    }
    //Obtener informacion de desempeño
    const getDesempeño = (iddesempeño) => {
        return desempeños.find(d => d.iddesempeño === iddesempeño);
    }

    //Metodo para registrar nota
    const registrarNotaEstudiante = async (idnota, nota) => {

        try {
            //fetch es para consumir una api
            const respuesta = await fetch(production + '/notas/' + idnota, { // produccion es la url de la api
                method: 'PUT', //crear objetos en la base de datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // aqui voy a crear el objeto docente
                    nota
                })
            });
            if (respuesta.status === 201) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Nota registrada',
                    showConfirmButton: false,
                    timer: 1500
                })
                return respuesta.json();
            }
        } catch (error) {
            console.log("Algo salio mal al registrar Nota...")
            console.log(error)
        }
    }
    ///COLUMUNAS 
    const getNumeroActividadesDesempeño = (iddesempeño) => {
        desempeñosAux.forEach(desem => {
            if (desem.iddesempeño === iddesempeño) {
                console.log('idD: ', iddesempeño, ' Act: ', desem.actividades);
                return desem.actividades;
            }
        });
    }
    //METODOS ELIMINACION
    const eliminarEstudiante = async (idestudiante) => {
        try {
            const response = await fetch(production+'/estudiantes/'+idestudiante,{
                method: 'DELETE', //crear objetos en la base de datos
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.status === 200){
                Swal.fire({
                    title:'Eliminado con exito!',
                    icon:'success',
                    timer:"2000",
                    showConfirmButton:false
                })
                await cargarEstudiantesCurso(curso.idcurso);
            }else{
                Swal.fire({
                    title:'No se pudo eliminar!',
                    icon:'error',
                    timer:"2000",
                    showConfirmButton:false
            })
        }
        }catch {
          console.log('Algo fallo al eliminar estudiante');
        }     
    }
    const eliminarDesempeño = async (iddesempeño ) =>{
        try {
            const response = await fetch(production+'/desempenos/'+iddesempeño,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.status === 200){
                Swal.fire({
                    title:'Eliminado con exito!',
                    icon:'success',
                    timer:"2000",
                    showConfirmButton:false
                })
                await cargarDesempeñosDeMateriaEnCurso(curso.idcurso,asignatura.idasignatura);
            }else{
                Swal.fire({
                    title:'No se pudo eliminar!',
                    icon:'error',
                    timer:"2000",
                    showConfirmButton:false
            })
        }
        }catch {
          console.log('Algo fallo al eliminar desempeño');
        }
    }
    const eliminarActividad = async (idactividad) =>{
        try {
            const response = await fetch(production+'/actividades/'+idactividad,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.status === 200){
                Swal.fire({
                    title:'Eliminada con exito!',
                    icon:'success',
                    timer:"2000",
                    showConfirmButton:false
                })
                await cargarActividadesDesempeño(desempeño.iddesempeño);
                await cargarActividadesMateriaEnCurso(curso.idcurso,asignatura.idasignatura);
            }else{
                Swal.fire({
                    title:'No se pudo eliminar!',
                    icon:'error',
                    timer:"2000",
                    showConfirmButton:false
            })
        }
        }catch {
          console.log('Algo fallo al eliminar actividad');
        }
    }
    const eliminarCurso = async (idcurso) =>{
        try {
            const response = await fetch(production+'/cursosasignaturas/'+idcurso,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.status === 200){
                Swal.fire({
                    title:'Eliminada con exito!',
                    icon:'success',
                    timer:"2000",
                    showConfirmButton:false
                })
                await cargarCursosDocente(docente.iddocente);
                await cargarCursosAsignaturas(docente.iddocente);  
            }else{
                Swal.fire({
                    title:'No se pudo eliminar!',
                    icon:'error',
                    timer:"2000",
                    showConfirmButton:false
            })
        }
        }catch {
          console.log('Algo fallo al eliminar curso');
        }
    }
    const eliminarParcelador = async (idparcelador) => {
        try {
            const response = await fetch(production+'/parceladores/'+idparcelador,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.status === 200){
                Swal.fire({
                    title:'Eliminado con exito!',
                    icon:'success',
                    timer:"2000",
                    showConfirmButton:false
                })
                await cargarParceladores();   
            }else{
                Swal.fire({
                    title:'No se pudo eliminar!',
                    icon:'error',
                    timer:"2000",
                    showConfirmButton:false
            })
        }
        }catch {
          console.log('Algo fallo al eliminar curso');
        }
    }


    //---------------------------------------------------------------
    
    //Metodo para registrar configuracion
    const registrarConfiguracion = async (data) => {
        const { nombreInstitucion, lemaInstitucion, fotoDocente, escudoDocente, iddocente } = data; //desestructurando el objeto es decir los separa
        try {
            //fetch es para consumir una api
            const respuesta = await fetch(production + '/configuracion', { // produccion es la url de la api
                method: 'POST', //crear objetos en la base de datos
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // aqui voy a crear el objeto docente
                    nombreInstitucion,
                    lemaInstitucion,
                    fotoDocente,
                    escudoDocente,
                    iddocente
                })
            });
            //Pendiente
            if (respuesta.status === 201) {
                Swal.fire({
                    position: 'top-right',
                    icon: 'success',
                    title: 'Registro Exitoso',
                    showConfirmButton: false,
                    timer: 1500
                })
                return respuesta.json();
            }
            if (respuesta.status === 400) {
                alert('El nombre de la institucion ya esta registrada');
            } else {
                alert('No se puedo crear la configuracion');
            }

        } catch (error) {
            console.log("Algo salio mal al registrar la configuracion...")
            console.log(error)
        }
    }

    //Eliminar configuracion
    const eliminarConfiguracion = async (idconfiguracion) => {
        try {
            const response = await fetch(production+'/configuracion/'+idconfiguracion,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.status === 200){
                Swal.fire({
                    title:'Eliminado con exito!',
                    icon:'success',
                    timer:"2000",
                    showConfirmButton:false
                })
                await cargarParceladores();   
            }else{
                Swal.fire({
                    title:'No se pudo eliminar!',
                    icon:'error',
                    timer:"2000",
                    showConfirmButton:false
            })
        }
        }catch {
          console.log('Algo fallo con eliminar la configuracion');
        }
    }

    

    return {
        iniciarSesion,
        cargarParceladores,
        cargarCursosDocente,
        cargarAsignaturasCurso,
        registrarUsuario, //se exporto la funcion registrar usuario, vamos al modal e importamo
        seleccionarAsignatura,
        registrarCursoYAsignatura,
        seleccionarCurso,
        registrarEstudiante,
        cargarEstudiantesCurso,
        registrarDesempeño,
        seleccionarDesempeño,
        cargarActividadesDesempeño,
        registrarActividad,
        cargarDesempeñosDeMateriaEnCurso,
        cargarActividadesMateriaEnCurso,
        getNumeroActividadesDesempeño,
        registrarNota,
        cargarNotas,
        registrarNotaEstudiante,
        getAsignatura,
        eliminarEstudiante,
        eliminarDesempeño,
        cargarEstudianteById,
        actualizarEstudiante,
        actualizarDesempeño,
        seleccionarActividad,
        actualizarActividad,
        eliminarActividad,
        cargarCursosAsignaturas,
        cargarAsignaturas,
        eliminarCurso,
        registrarParcelador,
        eliminarParcelador,
        seleccionarParcelador,
        seleccionarDesempeño2,
        getCurso,
        getActividad,
        cargarAllActividades,
        cargarParceladoresPorFecha,
        cargarTodoLosDesempeños,
        getDesempeño,        
        registrarConfiguracion,
        eliminarConfiguracion

    }

}