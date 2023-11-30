import React, { useState, useEffect } from 'react';
import './homeAdmin.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBarAdminComponente from '../NavbarAdmin/navbarAdm';

function HomeAdmin(){

    const navigate = useNavigate();
    const location = useLocation();

    const administrador = location.state && location.state.administrador;

    return(
        <div className='Home'>
            <NavBarAdminComponente/>
            <div>
                {console.log(administrador)}
                <h1 className='bienvenida'>¡Bienvenido/a! {administrador.nombre}</h1>
            </div>
        </div>
    );
}

export default HomeAdmin;