import React, { useState } from 'react';
import './navbarAdm.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function NavBarAdminComponente(){

    const navigate = useNavigate();
    const location = useLocation();

    const administrador = location.state && location.state.administrador;

    //Si toca el boton para Reportar desperfecto en una unidad en particular
    function ReclamarUnidad(){
        navigate('/reclamo-unidad', { state: { administrador: administrador } });
    }

    //Si toca el boton para Reportar desperfecto en una parte comunitaria
    function ReclamarComun(){
        navigate('/reclamo-comun', { state: { administrador: administrador } });
    }

    function IrHome(){
        navigate('/home-admin', { state: { administrador: administrador } });
    }

    function ListadoEdificios(){
        navigate('/edificios', { state: { administrador: administrador } });
      }

    function Perfil(){
        navigate('/perfil-admin', {state : {administrador: administrador}})
    }

    function CerrarSesion(){
        navigate('/login')
    }

    function desplegarMenu(){
        var navList = document.querySelector(".nav-list");
        navList.classList.toggle("active");
    }

    return(
        <div>
            <header>
                <nav className='barra-nav'>
                    <div className="menu-toggle" id="mobile-menu" onClick={desplegarMenu}>
                        ☰
                    </div>
                    <ul className="nav-list">
                        <li onClick={IrHome}><p className='item-navbar'>Home</p></li>
                        <li  onClick={ReclamarUnidad}><p className='item-navbar'>Reclamar Unidad</p></li>
                        <li onClick={ReclamarComun}><p className='item-navbar'>Reclamar Sector Comun</p></li>
                        <li onClick={ListadoEdificios}><p className='item-navbar'>Edificios</p></li>
                        <li onClick={Perfil}><p className='item-navbar'>Perfil</p></li>
                        <li onClick={CerrarSesion}><p className='item-navbar'>Cerrar Sesion</p></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default NavBarAdminComponente;