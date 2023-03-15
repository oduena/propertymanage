import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useContext} from 'react';
import AuthContext from './context/AuthProvider';
// import './styles/Sb-admin.css';
import './styles/App.css';
import './styles/Pagination.css';
//import './styles/Modals.css'
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
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

//import Usuarios from './pages/usuarios/Usuarios';


function App() {

  return (
    <div>
      <div id="wrapper">
       <BrowserRouter>
       
        <Sidebar />
           {/* <Dashboard />  */}
           <div id="content-wrapper" className="d-flex flex-column">
           <div id="content">
           <Topbar />
          <div className="container-fluid">
          
          <Routes>
              <Route path='/*' element={<Dashboard/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/proyectos' element={<Proyectos/>} />
              {/* <Route path='/proyectos/crear' element={<CrearProyecto/>} />*/}
              <Route path='/proyectos/ver/:id' element={<VerProyecto/>}/>
              <Route path='/proyectos/editar/:id' element={<EditarProyecto/>}/>
              <Route path='/proveedores' element={<Proveedores/>} />
              <Route path='/servicios' element={<Servicios/>} />
              <Route path='/mantenimientos' element={<Mantenimientos/>} />
              {/* <Route path='/mantenimientos/ver/:id' element={<VerMantenimiento/>} /> */}
              <Route path='/tareas' element={<Tareas/>} />
              
              {/*<Route path='/servicios/crear' element={<CrearServicio/>} />
              
              <Route path='/tareas' element={<Tareas/>} />
              <Route path='/usuarios' element={<Usuarios/>} /> */}
              <Route path='/logout' element={<Logout/>} />
            </Routes>{" "}
            
            </div>
            </div>
            </div>
          {/* <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                  <div className="copyright text-center my-auto">
                      <span>Copyright &copy; Modulat Technologies 2022</span>
                   </div>
                 </div>
           </footer> */}
    
      </BrowserRouter>
      </div>
    </div>
    );

}

export default App;
