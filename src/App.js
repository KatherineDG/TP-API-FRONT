import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import LoginComponente from './User/LoginDeUsuario/Login';
import ReclamoComponente from './User/FormulariosDeReclamo/Reclamo';
import HomeComponente from './User/InicioDeUsuario/Home';
import ReclamoComunComponente from './User/FormulariosDeReclamo/ReclamoComun';
import Edificios from './Componentes/Edificios';
import Unidades from './Componentes/Unidades'
import MiEdificioComponente from './User/ReclamosDeSuEdificio/MiEdificio';
import PerfilComponente from './User/PerfilDelUsuario/miPerfil';
import ModificarPerfilComponente from './User/PerfilDelUsuario/ModificarPerfil';
import Unidad from './Componentes/Unidad';
import MisReclamosComponente from './User/ReclamosDelUsuario/misReclamos';
import LoginAdministradorComponente from './UserAdmin/LoginDeAdmin/LoginAdm';
import HomeAdmin from './UserAdmin/HomeAdmin/homeAdmin';
import PerfilAdmin from './UserAdmin/PerfilAdmin/perfilAdmin';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<LoginComponente/>} />
        <Route exact path='/login-administrador' element={<LoginAdministradorComponente/>}/>

        <Route exact path='/home' element={<HomeComponente/>} />
        <Route exact path='/reclamo-unidad' element={<ReclamoComponente/>} />
        <Route exact path='/reclamo-comun' element={<ReclamoComunComponente/>} />
        <Route exact path='/mi-edificio' element={<MiEdificioComponente/>} />
        <Route exact path='/mis-reclamos' element={<MisReclamosComponente/>} />
        <Route exact path='/perfil' element={<PerfilComponente />}/>
        <Route exact path='/modificar-perfil' element={<ModificarPerfilComponente />}/>

        
        <Route exact path='/home-admin' element={<HomeAdmin/>} />
        <Route exact path='/perfil-admin' element={<PerfilAdmin/>} />
        <Route exact path='/edificios' element={<Edificios/>} />
        <Route exact path='/edificios/:id' element={<Unidades/>} />
        <Route exact path='/unidad/:id' element={<Unidad/>} />
      </Routes>
    </Router>
  );
}

export default App;
