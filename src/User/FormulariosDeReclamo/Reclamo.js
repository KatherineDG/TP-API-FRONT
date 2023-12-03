import React, { useEffect, useState } from "react";
import "./Reclamo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavBarComponente from "../Navbar/navbar";
import { getAllEdificios } from "../../api/getAllEdificios";

import Dropdown from "react-bootstrap/Dropdown";

function ReclamoComponente() {
  const navigate = useNavigate();

  //Se requiere que el ingreso sea mínimo y cerrado.
  const location = useLocation();

  const usuario = location.state && location.state.usuario;

  const [listaEdificios, setListaEdificios] = useState([]);
  const [edificioSeleccionado, setEdificioSeleccionado] = useState({});
  const [seleccionoEdificio, setSeleccionoEdificio] = useState(false)

  const [listaUnidades, setListaUnidades] = useState([])
  const [unidadSeleccionada, setUnidadSeleccionada] = useState({})


  const [unidad, setUnidad] = useState({
    piso: "",
    numero: "",
    codigoEdificio: edificioSeleccionado.codigo,
  });
  
  const [reclamo, setReclamo] = useState({
    documento: usuario.documento,
    codigoEdificio: "",
    ubicacion: "",
    descripcion: "",
    unidad: "",
    estado: "nuevo",
  });

  const manejarCambioEntradaUnidad = (e) => {
    //console.log(e);
    //console.log(unidad);
    const nuevoValor = e.target.value;

    setUnidad((prevUnidad) => ({ ...prevUnidad, [e.target.name]: nuevoValor }));

    // Actualiza el objeto reclamo con el estado más reciente de la unidad (teng que tener la unidad en reclamo y el codigoEdificio)
    setReclamo((prevReclamo) => ({
      ...prevReclamo,
      unidad: { ...prevReclamo.unidad, [e.target.name]: nuevoValor },
      codigoEdificio: unidad.codigoEdificio, 
    }));
  };

  const manejarCambioEntradaReclamo = (e) => {
    setReclamo({ ...reclamo, [e.target.name]: e.target.value });
  };

  //agregar el reclamo
  const agregarReclamo = async (reclamo) => {
    try {
      console.log("unidad ->", unidad);
      console.log("reclamo ->", reclamo);
      console.log(edificioSeleccionado);
      console.log("ENTRO");
      const respuesta = await fetch("http://localhost:8080/api/reclamos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reclamo),
      });
      if (respuesta.ok) {
        alert("Reclamo agregado con exito");
      } else {
        alert(
          "No se pudo agregar el reclamo, puede que no tenga los permisos necesarios."
        );
      }
    } catch (error) {
      alert("Error de red");
    }
  };

  function enviarFormulario(e) {
    // Evitar la recarga de la página
    e.preventDefault();
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
    try {
      const respuesta = await getAllEdificios();
      if (respuesta.ok) {
        //todos los edificios
        const data = await respuesta.json();
        //console.log(data);
        setListaEdificios(data);
      }
    } catch (error) {
      console.log("Hubo un error al obtener respuesta");
    }
  };

  useEffect(() => {
    edificios();
  }, []);

  function manejarEdificioSeleccionado(edificio) {
    //console.log(edificio);
    // Establecer el edificio seleccionado
    setEdificioSeleccionado(edificio);
    setSeleccionoEdificio(true)

    // Actualizar el estado de unidad y reclamo con el código del edificio seleccionado
    const codigoEdificio = edificio.codigo;
    setUnidad((prevUnidad) => ({ ...prevUnidad, codigoEdificio }));
    setReclamo((prevReclamo) => ({ ...prevReclamo, codigoEdificio }));

    setReclamo((prevReclamo) => ({
      ...prevReclamo,
      unidad: { ...prevReclamo.unidad, codigoEdificio: codigoEdificio },
    }));
  }



   //ingreso minimo y cerrado - unidades
   const unidades = async () => {
    try {
      const respuesta = await fetch(`http://localhost:8080/api/edificios/${edificioSeleccionado.codigo}/unidades`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (respuesta.ok) {
        //todas las unidades
        const data = await respuesta.json();
        console.log(data);
        if(data.length === 0){
          alert("Este edificio no tiene unidades")
        }
        else{
          setListaUnidades(data);
        }
      }
    } catch (error) {
      console.log("Hubo un error al obtener respuesta");
    }
  };

  function manejarUnidadSeleccionada(unidad) {
    //console.log(edificio);
    // Establecer el edificio seleccionado
    setUnidadSeleccionada(unidad);

    // Actualizar el estado de unidad y reclamo con el código del edificio seleccionado
    const pisoUnidad = unidad.piso;
    const numeroUnidad = unidad.numero
    setUnidad((prevUnidad) => ({ ...prevUnidad, pisoUnidad }));
    setUnidad((prevUnidad) => ({ ...prevUnidad, numeroUnidad }));

    setReclamo((prevReclamo) => ({
      ...prevReclamo,
      unidad: { ...prevReclamo.unidad, piso: pisoUnidad },
    }));
    setReclamo((prevReclamo) => ({
      ...prevReclamo,
      unidad: { ...prevReclamo.unidad, numero: numeroUnidad },
    }));
  }


  return (
    <div className="PantallaReclamo">
      <NavBarComponente />

      <div className="cuerpo">
        <p>
          Sólo puede hacer el reclamo si es propietario del edificio o inquilino
          de la unidad.
        </p>

        <h1 className="bienvenido">¡Haz tu reclamo!</h1>
        <div className="contenedor-datos">
          <form onSubmit={enviarFormulario}>
            <input
              className="input-lectura"
              type="text"
              placeholder="Documento"
              name="documento"
              id="documento"
              value={usuario.documento}
              onChange={manejarCambioEntradaReclamo}
              readOnly
            />

            <Dropdown>
              <Dropdown.Toggle style={{backgroundColor: "#5f3aee", width: "100%", marginTop: "5px", marginBottom: "5px",}} variant="success" id="dropdown-basic">
                Edificio
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: "100%" }}>
                {listaEdificios.map((edificio) => (
                  <Dropdown.Item key={edificio.id} onClick={() => manejarEdificioSeleccionado(edificio)}>
                    {edificio.nombre}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            {edificioSeleccionado.nombre != undefined && (
              <p>{edificioSeleccionado.nombre}</p>
            )}

            {seleccionoEdificio == true && (
              <div><button style={{backgroundColor:'grey', color:'white', borderRadius:'10px'}} onClick={() => unidades()}>obtener unidades de este edificio</button></div>
            )}

            {listaUnidades.length != 0 && (
                    <Dropdown>
                    <Dropdown.Toggle style={{backgroundColor: "#5f3aee", width: "100%", marginTop: "5px", marginBottom: "5px",}} variant="success" id="dropdown-basic">
                      Unidad
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ width: "100%", maxHeight: "250px", overflowY: "auto" }}>
                      {listaUnidades.map((unidad) => (
                        <Dropdown.Item key={unidad.id} onClick={() => manejarUnidadSeleccionada(unidad)}>
                          <table style={{width:'100%', textAlign:'center', borderCollapse:'collapse'}}>
                            <thead>
                              <tr>
                                <th>Piso: {unidad.piso}</th>
                                <th>Nro: {unidad.numero}</th>
                              </tr>
                            </thead>
                          </table>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
            )}
            {unidadSeleccionada.piso != undefined && (
              <table style={{width:'100%', textAlign:'center', borderCollapse:'collapse'}}>
              <thead>
                <tr>
                  <th>Piso: {unidadSeleccionada.piso}</th>
                  <th>Nro: {unidadSeleccionada.numero}</th>
                </tr>
              </thead>
            </table>
            )}
            

            <input className="globo" type="text" placeholder="Ubicacion" name="ubicacion" id="ubicacion" value={reclamo.ubicacion} onChange={manejarCambioEntradaReclamo} required />

            <textarea className="globo" type="text" placeholder="Descripción" name="descripcion" id="descripcion" value={reclamo.descripcion} maxLength="1000" onChange={manejarCambioEntradaReclamo} required></textarea>
            <p className="contador-caracteres">1000 caracteres</p>

            <input type="file" id="imagenes" name="imagenes" multiple onChange={mostrarImagenes}/>
            <div id="contenedor-imagenes">
              {imagenes.map((imagen, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px"}}>
                  <img src={URL.createObjectURL(imagen)} style={{ width: "100px", marginLeft: "50px", marginTop:"20px",}} alt={`Imagen ${index}`}/>
                  <button style={{ width: "100px", marginLeft: "50px", marginTop: "20px"}} onClick={() => eliminarImagen(index)}>
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <button className="globo-boton" type="submit" onClick={() => { agregarReclamo(reclamo); }}>
              {" "}Enviar Reclamo{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReclamoComponente;
