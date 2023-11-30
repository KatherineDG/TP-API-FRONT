import React, { useState, useEffect } from 'react';
import './/perfilAdmin.css';
import lapiz from '../../recursos/lapizmodificar.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBarAdminComponente from '../NavbarAdmin/navbarAdm';

function PerfilAdmin(){

    const navigate = useNavigate();
    const location = useLocation();

    const administrador = location.state && location.state.administrador;
    


    function Modificar(){
            navigate('/modificar-perfil', {state: {administrador: administrador}})  
    }

    return(
        <div className='Home'>
            <NavBarAdminComponente/>
            <div>
                {console.log(administrador)}
                <button className='btn-modificar' onClick={Modificar}><img src={lapiz} style={{width:"20px", height:"20px"}}></img></button>
                <div className='datos-usuario'>
                    <h5>Nombre:</h5>
                    <p style={{backgroundColor:"white"}}>{administrador.nombre}</p>
                    <h5>Numero de Documento:</h5>
                    <p style={{backgroundColor:"white"}}>{administrador.documento}</p>
                </div>
            </div>
        </div>
    );
}

export default PerfilAdmin;