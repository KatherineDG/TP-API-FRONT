import React, { useState, useEffect } from 'react';
import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBarComponente from '../Navbar/navbar';

function HomeComponente(){

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

    return(
        <div className='Home'>
            <NavBarComponente/>
            <div>
                {console.log(usuario)}
                <h1 className='bienvenida'>¡Bienvenido/a! {usuario.nombre}</h1>

                <p className='parrafo-bienvenida'>
                    En nuestro portal, ofrecemos una plataforma fácil y segura para presentar reclamos relacionados 
                    con edificios. Ya sea problemas con la administración, servicios o mantenimiento, estamos aquí para
                    escucharte. Simplificamos el proceso de comunicación entre residentes y administradores, asegurando 
                    un ambiente habitable y armonioso para todos. ¡Tu voz es importante para mantener nuestros hogares en
                    perfecto estado!
                </p>


                <div className="container-reclamar">
                    <div className="container-botones-reclamar">
                        <div className="text-reclamar">Reportar desperfecto en una unidad en particular</div>
                        <button className="button-reclamar" onClick={ReclamarUnidad}>Reclamar</button>
                    </div>

                    <div className="contenedor-botones">
                            <div className="text-reclamar">Reportar desperfecto en una parte comunitaria</div>
                            <button className="button-reclamar" onClick={ReclamarComun}>Reclamar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeComponente;