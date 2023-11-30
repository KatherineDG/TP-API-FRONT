import React, { useState } from 'react';
import imagenUsu from '../../recursos/usu.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

//Dentro de la función puedo hacer lógica


//Iniciar Sesion
//Registrarse
function LoginAdministradorComponente(){

  const navigate = useNavigate();

    //Control para cambiar de pantalla
    const [logeado, setLogeado] = useState(false);

    const [esAdmin, setEsAdmin] = useState(false);
    //Persona
    const [administrador, setAdministrador] = useState({documento:'', nombre:''});

    
    //Guarda a la persona con sus datos
    const manejarCambioEntrada = (e) => {
      setAdministrador({ ...administrador, [e.target.name]: e.target.value });
  };

  const esperarTresSegundos = () => new Promise(resolve => setTimeout(resolve, 3000));

    //Llama al metodo buscarPersona del PerosnaController es de tipo GET
    const obtenerAdministrador = async () => {
        try {
          const respuesta = await fetch(`http://localhost:8080/api/administradores`);
      
          if (respuesta.ok) {
            const data = await respuesta.json();

            for (const admin of data){
              if (admin.documento === administrador.documento) {
                console.log('La persona existe');
                return true
                }
            }
            console.log('Persona no encontrada en el array');
            return false;
            
          } else {
            console.log('Respuesta no existosa');
            return false;
          }
        } catch (error) {
          console.log('Error al buscar la persona o no se encuentra registrado');
          return false;
        }
      };
      

    //Verifica que al menos que se ingresó algo en el "docmuento"
    const verificarInputs = () =>{
      //const nombre = document.getElementById('nombre').value;
      //const contrasenia = document.getElementById('password').value;
      const documento = document.getElementById('documento').value;
      if (documento !== ''){
        return true
      }
      else{
        return false
      }
    }

    async function IniciarSesion(){
        if (verificarInputs() === true){
            const respuestaObtenerAdmin = await obtenerAdministrador();
            if (respuestaObtenerAdmin === true){
                alert('Entraste a la plataforma')
                console.log(administrador)
                //Permiso para poder ir a la siguiente pantalla
                setLogeado(true);
                navigate('/home-admin', { state: { administrador: administrador } });
             }
             else{
                alert('No tienes permisos de administrador para entrar en este modo')
             }
        }
        else{
            alert('Complete con sus datos')
        }    
    }


    function IngresarUsuario(){
      navigate('/login');
    }
        
    return(
        <div className='Login'>
          {!logeado ? (
            //Usuario no autenticado, muestro el formulario Login
            <div className='contenedor-datos'>
              <h1 className='bienvenido'>¡Bienvenido/a admin!</h1>
                <form>
                <input className='globo' type="text" placeholder="Nombre" name="nombre" id='nombre' value={administrador.nombre} onChange={manejarCambioEntrada} required/>
                  <input className='globo' type="text" placeholder="Documento" name="documento" id='documento' value={administrador.documento} onChange={manejarCambioEntrada} required/>
                  <button className='globo-boton' type='button' onClick={() => IniciarSesion()}>Iniciar Sesion </button>
                 
                </form>
                <img className="imagenRol" src={imagenUsu} alt="ingresar admin" onClick={IngresarUsuario} title="Ingresar Usuario"></img>
            </div>
          ) : (

            null
            
          )};  
            
        </div>
    );
}


export default LoginAdministradorComponente;