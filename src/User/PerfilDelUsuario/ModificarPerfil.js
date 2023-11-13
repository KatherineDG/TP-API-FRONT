import React, { useState } from 'react';
import './/MiPerfil.css';
import lapiz from '../../recursos/lapizmodificar.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBarComponente from '../navbar/navbar';

function ModificarPerfilComponente(){

    const navigate = useNavigate();
    const location = useLocation();

    const usuario = location.state && location.state.usuario;

    //TODO
    //- hacer metodo para manejar los cambios de entrada 
    //- llamar a la api para modificar persona

    return(
        <div className='Home'>
            <NavBarComponente/>
            <div>
                
                <div className='datos-usuario'>
                    <h5>Nombre:</h5>
                    <input className='globo' type="text" placeholder="Nombre" name="nombre" id='nombre' defaultValue={usuario.nombre} required/>
                    <h5>Numero de Documento:</h5>
                    <p style={{backgroundColor:"white"}}>{usuario.documento}</p>
                    <h5>Mail:</h5>
                    <input className='globo' type="text" placeholder="Mail" name="mail" id='mail' defaultValue={usuario.mail} required/>
                    <h5>Contraseña:</h5>
                    <input className='globo' type="text" placeholder="Contraseña" name="password" id='password' defaultValue={usuario.password} required/>
                    <br></br>
                    <button className='btn-guardar'>Guardar Cambios</button>
                </div>
                
            </div>
        </div>
    );
}

export default ModificarPerfilComponente;