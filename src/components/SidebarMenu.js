import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {useAuthUser} from 'react-auth-kit';

const SidebarMenu = () => {
const [active, setActive] = useState(null);
const auth = useAuthUser();

const [menuMainList] = useState([
    {
      id: 1,
      menuTitle: "Dashboard",
      imgclass: "fas fa-fw fa-tachometer-alt",
      linkTo: "/dashboard"
    },
    {
      id: 2,
      menuTitle: "Proyectos",
      imgclass: "fas fa-chart-bar mr-3",
      linkTo: "/proyectos"
    },
    {
        id: 3,
        menuTitle: "Proveedores",
        imgclass: "fas fa-user mr-3",
        linkTo: "/proveedores"
      },
      {
        id: 4,
        menuTitle: "Servicios",
        imgclass: "fa fa-paper-plane mr-3",
        linkTo: "/servicios"
      },
      {
        id: 5,
        menuTitle: "Mantenimientos",
        imgclass: "fas fa-align-justify",
        linkTo: "/mantenimientos"
      },
      {
        id: 6,
        menuTitle: "Tareas",
        imgclass: "fas fa-tasks",
        linkTo: "/tareas"
      },
      // {
      //   id: 7,
      //   menuTitle: "Logout",
      //   imgclass: "fas fa-solid fa-right-from-bracket",
      //   linkTo: "/logout"
      // },

  ]);

const [menuAdminList] = useState([
  {
    id: 1,
    menuTitle: "Usuarios",
    imgclass: "fa-solid fa-users",
    linkTo: "/usuarios"
  }
]);


return (
<>
<div className="sidebar">
    {menuMainList.map((item)=>{
        return (
            <Link key={item.id} to={item.linkTo} 
             onClick={()=>setActive(item)}
             className={`nav-link ${active === item && 'active'}`}
            >
                <i className={item.imgclass} />
                <span>{item.menuTitle}</span>         
            </Link>
        )
    })}
  <hr></hr>
  
  {
  
  auth()?.role==='Admin' && (
  menuAdminList.map((item)=>{
        return (
            <Link key={item.id} to={item.linkTo} 
             onClick={()=>setActive(item)}
             className={`nav-link ${active === item && 'active'}`}
            >
                <i className={item.imgclass} />
                <span>{item.menuTitle}</span>         
            </Link>
        )
    })) 
    
    }

  <Link to={'/logout'} className="nav-link">
  <i className="fas fa-solid fa-right-from-bracket"></i>
  <span>Logout</span>
  </Link> 
</div>
</>
 )
}

export default SidebarMenu
