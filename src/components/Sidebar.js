import React from 'react';
import Logo from '../../src/images/Logo_Property.jpg';
//import logo from '../../src/assets/images/Logo_Property.jpg';
// import './Sidebar.css';
import { Link } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';
//import {useContext} from 'react';
//import AuthContext from '../context/AuthProvider';
const Sidebar = () => {
// const handleClick = (event) =>{
//     console.log(event);
// event.currentTarget.classList.add('active')
// }
    //const { auth } = useContext(AuthContext);
    return (
        <div>
        <aside>
        
            <div className="top">
                <div className="logo">
                <img className="top-logo" alt="" src={Logo} /> 
                    <h2>MANEJO DE PROPIEDADES</h2>
                </div>
            </div>
            <SidebarMenu />
{/*     
                <div className="sidebar">
              
                <Link id="dashboard" to={'/dashboard'} className="nav-link"
                onClick={handleClick}
                >
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
                
                </Link>
                <Link to={'/proyectos'} className="nav-link">
                  <i className="fas fa-chart-bar mr-3"></i>
                <span>Proyectos</span>
                </Link>
                <Link to={'/proveedores'} className="nav-link">
                <i className="fas fa-user mr-3"></i>
                        <span>Proveedores</span>
                   </Link>
                   <Link to={'/servicios'} className="nav-link">
                    <i className="fa fa-paper-plane mr-3"></i>
                    <span>Servicios</span>
                    </Link>
                    <Link to={'/mantenimientos'} className="nav-link">
                    <i className="fas fa-align-justify"></i>
                    <span>Mantenimientos</span>
                    </Link>
                    <Link to={'/tareas'} className="nav-link">
                    <i className="fas fa-tasks"></i>
                    <span>Tareas</span>
                    </Link>
                    <Link to={'/logout'} className="nav-link">
                    <i className="fas fa-solid fa-right-from-bracket"></i>
                    <span>Logout</span>
                    </Link> 
                </div> */}

</aside>
</div>
);
}

export default Sidebar