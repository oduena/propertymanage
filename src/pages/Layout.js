import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
//import AuthContext from '../context/AuthProvider';

const Layout = () => {

//const auth = useContext(AuthContext);

//const user = auth.currentUser;

  return (
    <>
    <div id="wrapper">
        <Sidebar/>
        <div id="content-wrapper" className="d-flex flex-column">
           <div id="content">
           <div className="container-fluid">
            <Topbar />
              
                <Outlet />
            </div>
            </div>
            </div>
    </div>
    </>
  )
}

export default Layout;
