import React, { useState } from 'react';
import './navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function NavBarComponente(){

    const navigate = useNavigate();
    const location = useLocation();

    const usuario = location.state && location.state.usuario;

    //Si toca el boton para Reportar desperfecto en una unidad en particular
    function ReclamarUnidad(){
        navigate('/reclamo-unidad', { state: { usuario: usuario } });
    }

    //Si toca el boton para Reportar desperfecto en una parte comunitaria
    function ReclamarComun(){
        navigate('/reclamo-comun', { state: { usuario: usuario } });
    }

    function IrHome(){
        navigate('/home', { state: { usuario: usuario } });
    }

    function MiEdificio(){
        navigate('/mi-edificio', { state: { usuario: usuario } });
      }

    function MisReclamos(){
        navigate('/mis-reclamos', {state : {usuario: usuario}})
    }

    function Perfil(){
        navigate('/perfil', {state : {usuario: usuario}})
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
                        <li onClick={MiEdificio}><p className='item-navbar'>Mi Edificio</p></li>
                        <li onClick={MisReclamos}><p className='item-navbar'>Mis Reclamos</p></li>
                        <li onClick={Perfil}><p className='item-navbar'>Perfil</p></li>
                        <li onClick={CerrarSesion}><p className='item-navbar'>Cerrar Sesion</p></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default NavBarComponente;