import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MiEdificio.css';
import imagenOOPS from '../../recursos/oops.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBarComponente from '../navbar/navbar';

import Dropdown from 'react-bootstrap/Dropdown';
import { getAllEdificios } from '../../api/getAllEdificios';


function MiEdificioComponente(){

    const navigate = useNavigate();
    const location = useLocation();

    const usuario = location.state && location.state.usuario;

    const [listaEdificios, setListaEdificios] = useState([]);
    const [edificioSeleccionado, setEdificioSeleccionado] = useState({});
    //const usuario = useState({documento:persona.documento});
    //const [edificio, setEdificio] = useState({codigo:'', nombre:''});
    const [nombreEdificio, setNombreEdificio] = useState('');
    const [verificarHabilitacion, setVerificarHabilitacion] = useState('');

    const [reclamos, setReclamos] = useState([]);

    //const manejarCambioEntradaEdificio = (e) => {
    //    const ed = { ...edificio, [e.target.name]: e.target.value };
    //    setEdificio(ed);
    //};

    /*
    //quiero el nombre del edificio
    const ObtenerNombreEdificio = async () => {
        try {
          const respuesta = await fetch(`http://localhost:8080/api/edificios/${edificio.codigo}`);
          const datos = await respuesta.json();

          if (respuesta.ok){
            ObtenerReclamos()
          }
          else{
            alert('No se puedo obtener en edificio')
          }
          
          // Actualiza el estado con el nombre del edificio
          setNombreEdificio(datos.nombre); // Ajusta según la estructura de tu API
        } catch (error) {
          console.error('Error al obtener el edificio', error);
        }
      };
      */

//Quiero obtener todos los reclamos del edificio al que es duenio o habita
const ObtenerReclamos = async () => {
    setVerificarHabilitacion(true)
    //console.log(edificio)
    try {
        const respuesta = await fetch(`http://localhost:8080/api/reclamos/edificio/${edificioSeleccionado.codigo}`);
        const datos = await respuesta.json();
        console.log(datos)
          setReclamos(datos);
        } catch (error) {
          console.error('Error al obtener reclamos', error);
        }
    }

const obtenerHabilitadosPorEdificio = async () => {
    setVerificarHabilitacion(null)
    try {
        const respuesta = await fetch(`http://localhost:8080/api/edificios/${edificioSeleccionado.codigo}/habilitados`)
        
        if (respuesta.ok){
            const data = await respuesta.json()
            console.log(data)
            
            for(const habilitado of data){
                if(habilitado.documento === usuario.documento){
                    setVerificarHabilitacion(true)
                    ObtenerReclamos()
                    //ObtenerNombreEdificio()
                    console.log('Este usuario esta habilitado')
                    break;
                }
                else{
                    setVerificarHabilitacion(false)
                    console.log('Este usuario no esta hbailitado')  
                }
            }
        }
    }
    catch (error){
        console.log('Error al obtener respuesta')
    }
}

  
  //ingreso minimo y cerrado - edificios
  const edificios = async () => {
    try{
      const respuesta = await getAllEdificios();
      if (respuesta.ok){
        //todos los edificios
        const data = await respuesta.json()
        console.log(data)
        setListaEdificios(data)
      }
    }
    catch (error){
      console.log('Hubo un error al obtener respuesta')
    }
  }


  useEffect(() => {
    edificios();
  }, [])


  function manejarEdificioSeleccionado(edificio) {
    console.log(edificio)
    // Establecer el edificio seleccionado
    setEdificioSeleccionado(edificio);
  }
    
    
    return(
        <div className='PantallaMiEdificio'>
        <NavBarComponente/>

        <div className='cuerpo'>
            <div className='contenedor-edificio'>
                <p>Ingrese el codigo de su edificio del que desea ver los reclamos</p>
                <Dropdown>
                    <Dropdown.Toggle style={{backgroundColor:"#5f3aee", width:"100%", marginTop:"5px", marginBottom:"5px"}} variant="success" id="dropdown-basic">Edificio</Dropdown.Toggle>
                    <Dropdown.Menu style={{width:"100%"}}>
                        {listaEdificios.map((edificio) => (
                        <Dropdown.Item key={edificio.id}  onClick={() => manejarEdificioSeleccionado(edificio)}>
                            {edificio.nombre}
                        </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                {edificioSeleccionado.nombre != undefined &&(
                <p>{edificioSeleccionado.nombre}</p>
                )}
                <button className='boton-verificar' type='submit' onClick={() => { obtenerHabilitadosPorEdificio()}}> ver </button>
            </div>
            
            

            <h2 className='tituloReclamos'>Reclamos</h2>

            
            {verificarHabilitacion === null && (
                <div className='loading'>
                    <div className="spinner"></div>
                    <p>Buscando reclamos de su edificio</p>
                </div>)}
            
            
            
            {verificarHabilitacion === true && (
                <div className='tabla-reclamos'>
                    <h1>{edificioSeleccionado.nombre}</h1><br></br>
                    {reclamos.length > 0 && (
                        <table border="1">
                            <thead>
                            <tr>
                                <th>Nombre de Persona</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reclamos.map(reclamo => (
                                <tr key={reclamo.id_reclamo}>
                                    <td>{`${reclamo.usuario.nombre}`}</td>
                                    <td>{reclamo.descripcion}</td>
                                    <td>{reclamo.estado}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                     )}
                     {reclamos.length === 0 && (
                        <h3>No hay reclamos</h3>
                     )}
                </div>
            
            )}

            {verificarHabilitacion === false && <div className="ups">
                <img src={imagenOOPS} alt="OOPS!" style={{width:"250px", height:"250px"}}/>
                <p>Ups, no es dueño ni inquilino de este edificio para visualizar sus reclamos.</p>
                </div>} 

            </div>
        </div>
    );
}

export default MiEdificioComponente;