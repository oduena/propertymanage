import React from 'react';
//import logo from '../../src/assets/images/Logo_Property.jpg';
// import './Sidebar.css';
import { Link } from 'react-router-dom';
import {useContext} from 'react';
import AuthContext from '../context/AuthProvider';

const Sidebar = () => {

    const { auth } = useContext(AuthContext);

    return (
        <div>
        <aside>
        
            <div className="top">
                <div className="logo">
                    
                    <h2>PMS <span className="danger">SOFTWARE v4.0</span></h2>
                </div>
            </div>
    
                <div className="sidebar">
                {
                auth.success===true ? (<>
                <Link to={'/dashboard'} className="nav-link">
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
                    </Link> </>)
                
                
                
                : <></>}

                </div>

</aside>
</div>
);
}

export default Sidebar