import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Reclamo.css'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBarComponente from '../navbar/navbar';

import Dropdown from 'react-bootstrap/Dropdown';
import { getAllEdificios } from '../../api/getAllEdificios';


function ReclamoComunComponente(){

    const navigate = useNavigate();
    const location = useLocation();

    const usuario = location.state && location.state.usuario;
    //const [usuario, setUsuario] = useState({documento:persona.documento});

    const [listaEdificios, setListaEdificios] = useState([]);
    const [edificioSeleccionado, setEdificioSeleccionado] = useState({});

    //const [edificio, setEdificio] = useState({codigo:'0'});
    //const [unidad, setUnidad] = useState({piso:'', numero:''}); 
    //ver lo de imagenes
    const [reclamo, setReclamo] = useState({documento:usuario.documento, codigoEdificio:'', ubicacion:'', descripcion:'', estado:'nuevo'});
    

    //Manejadores de entrada
    
    const manejarCambioEntradaReclamo = (e) => {
        setReclamo({ ...reclamo, [e.target.name]: e.target.value });
    };

    
  //agregar el reclamo
  const agregarReclamo = async (reclamo) => {
    console.log(reclamo)
    try {
        console.log("ENTRO")
        const respuesta = await fetch('http://localhost:8080/api/reclamos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify((
            reclamo
          )),

        });
        if (respuesta.ok) {
            alert('Reclamo agregado con exito');
        } else {
            alert('No se pudo agregar e reclamo.');
        }
        } catch (error) {
          alert('Error de red');
        }
};



    function enviarFormulario(e) {
        // Evitar la recarga de la página
        e.preventDefault();
      
        // Lógica para procesar el formulario
        console.log("Formulario enviado, pero la página no se recargará");
    }


    //SOBRE IMAGENES
    const [imagenes, setImagenes] = useState([]);

    const mostrarImagenes = (event) => {
    const nuevosArchivos = Array.from(event.target.files);

    setImagenes([...imagenes, ...nuevosArchivos]);
    };

    const eliminarImagen = (index) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes.splice(index, 1);
    setImagenes(nuevasImagenes);
    };
  

    
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
  
    // Actualizar el estado de unidad y reclamo con el código del edificio seleccionado
    const codigoEdificio = edificio.codigo;
    setReclamo((prevReclamo) => ({ ...prevReclamo, codigoEdificio }));

  }


    return(
        <div className='PantallaReclamoComun'>
        <NavBarComponente/>

      <div className='cuerpo'>

        <p>Cualquiera puede hacer un reclamo sobre una parte comun del edificio dentro de los habilitados.</p>

        <h1 className='bienvenido'>¡Haz tu reclamo!</h1>
        <div className='contenedor-datos'>

        <form onSubmit={enviarFormulario}>
            <input className='input-lectura' type='text' placeholder="Documento" name="documento" id='documento' value={usuario.documento} readOnly/>
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
            )}            <input className='globo' type='text' placeholder='Ubicacion' name='ubicacion' id='ubicacion' value={reclamo.ubicacion} onChange={manejarCambioEntradaReclamo}  required/>

            <textarea className='globo' type='text' placeholder='Descripción' name='descripcion' id='descripcion' value={reclamo.descripcion} maxLength='1000' onChange={manejarCambioEntradaReclamo}  required></textarea>
            <p className='contador-caracteres'>1000 caracteres</p>

            <input type="file" id="imagenes" name="imagenes" multiple onChange={mostrarImagenes}/>
            <div id="contenedor-imagenes">
            {imagenes.map((imagen, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img
                  src={URL.createObjectURL(imagen)}
                  style={{ width: '100px', marginLeft:'50px', marginTop:'20px' }}
                  alt={`Imagen ${index}`}
                />
                <button style={{ width: '100px', marginLeft:'50px', marginTop:'20px' }} onClick={() => eliminarImagen(index)}>Eliminar</button>
              </div>
            ))}
          </div>


            <button className='globo-boton' type='submit' onClick={ () => { agregarReclamo(reclamo) }}> Enviar Reclamo </button>
        
          </form>


        </div>
        
    </div>
  </div>


    )
}

export default ReclamoComunComponente;