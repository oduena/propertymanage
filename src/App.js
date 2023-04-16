import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import './styles/Pagination.css';

import Layout from './pages/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Dashprofile from './pages/dashboard/Dashprofile';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Proyectos from './pages/proyectos/Proyectos';
//import CrearProyecto from './pages/proyectos/CrearProyecto';
import EditarProyecto from './pages/proyectos/EditarProyecto';
import VerProyecto from './pages/proyectos/VerProyecto';
import Proveedores from './pages/proveedores/Proveedores';
import Servicios from './pages/servicios/Servicios';
//import CrearServicio from './pages/servicios/CrearServicio';
import Mantenimientos from './pages/mantenimientos/Mantenimientos';
//import VerMantenimiento from './pages/mantenimientos/VerMantenimiento';
import Tareas from './pages/tareas/Tareas';
//import RequireAuth from '../src/components/RequireAuth';
import { RequireAuth } from 'react-auth-kit';
import Usuarios from './pages/usuarios/Usuarios';
//import useAuth from './hooks/useAuth';

function App() {

  //const auth = useAuth();

  return (
    <>
          <Routes>
          <Route path='/*' element={<Login/>} />
          <Route path="/" element={<Layout/>}>

              <Route path='/dashboard' element={<RequireAuth loginPath={'/login'}>
                <Dashboard/>
              </RequireAuth>}/>

              <Route path='/dashprofile' element={<RequireAuth loginPath={'/login'}>
                <Dashprofile/>
              </RequireAuth>}/>


              <Route path='/proyectos' element={<RequireAuth loginPath={'/login'}>
              <Proyectos/>
              </RequireAuth>}/>

              <Route path='/proyectos/ver/:id' element={<VerProyecto/>}/>
              <Route path='/proyectos/editar/:id' element={<EditarProyecto/>}/>
              
              <Route path='/proveedores' element={<RequireAuth loginPath={'/login'}>
              <Proveedores/>
              </RequireAuth>}/>

              {/* <Route path='/servicios' element={<Servicios/>} /> */}

            
      <Route path={'/servicios'} element={<RequireAuth loginPath={'/login'}>
          <Servicios/>
        </RequireAuth>}/>
    

              <Route path='/mantenimientos' element={<RequireAuth loginPath={'/login'}>
              <Mantenimientos/>
              </RequireAuth>}/>

              <Route path='/tareas' element={<RequireAuth loginPath={'/login'}>
              <Tareas/>
              </RequireAuth>}/>

              <Route path='/usuarios' element={<RequireAuth loginPath={'/login'}>
              <Usuarios/>
              </RequireAuth>}/>

              <Route path='/logout' element={<Logout/>} />

            </Route>

            </Routes>
            
    </>
    );

}

export default App;
