import React, { useState, useEffect } from 'react';
//import Axios from 'axios';
import Axios from '../../api/axios';
//import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ListarNextMant from './ListarNextMant';
import {useAuthUser} from 'react-auth-kit'
import ListarTareasperUser from './ListarTareasperUser';
//import ListarProveedores from './ListarProveedores';
//import useRefreshToken from '../../hooks/useRefreshToken';
//import AuthContext from '../../context/AuthProvider';
//import { useNavigate } from 'react-router-dom';

const  Dashprofile = () => {

  const auth = useAuthUser();

    const [nextMants, setNextMants] = useState([]);
    const [Tareas, setTareas] = useState([]);
  //  const [Proveedores, setProveedores] = useState([]);
    const [totalProyectos, setTotalProyectos] = useState([]);
    const [totalMantenimientos, setTotalMantenimientos] = useState([]);
    const [totalTareasCompleted, setTotalTareasCompleted] = useState([]); 

//const fetchUrl = "http://localhost:3005/api/mantenimientos/dashboard";
const fetchUrl = process.env.REACT_APP_API_URL+"/mantenimientos/dashboard";

useEffect(() => {

      async function fetchData(){
          const data = await Axios.get(fetchUrl);
          setNextMants(data.data);
          return data
      }
      fetchData();
      loadTareasperUser();
     // loadProveedores();
      loadTotalProyectos();
      loadTotalMantenimientosThisMonth();
      loadTotalTareas();
},[fetchUrl]);

const loadTareasperUser = async () => {
       
        const response = await Axios.get(`/tareas/byUser_AsignedTo/${auth().userID}`);
        setTareas(response.data);
};

// const loadProveedores = async () => {
    
//     const response = await Axios.get('/proveedores/dashboard');
//     setProveedores(response.data);
// };

const loadTotalProyectos = async () => {
    //const response  = await Axios.get('http://localhost:3005/api/proyectos/dashboard/totalproyectos');
    const response = await Axios.get('/proyectos/dashboard/totalproyectos');
    setTotalProyectos(...response.data);
}

const loadTotalMantenimientosThisMonth = async () => {
    //const response  = await Axios.get('http://localhost:3005/api/mantenimientos/dashboard/totalmantenimientos');
    const response = await Axios.get('/mantenimientos/dashboard/totalmantenimientos');
    setTotalMantenimientos(...response.data);
}

const loadTotalTareas = async () => {
    //const response = await Axios.get('http://localhost:3005/api/tareas/dashboard/porcentajecompletadas');
    const response = await Axios.get('/tareas/dashboard/porcentajecompletadas');
    setTotalTareasCompleted(...response.data)
}

//console.log(totalTareasCompleted.TotalTareas);
//console.log(totalMantenimientos.TotalMantenimientos);
function percent(quantity, percent)
{
    return (percent / quantity) * 100;
}

let porcentageTareas = percent(totalTareasCompleted.TotalTareas,totalTareasCompleted.TotalCompleted).toFixed(2);

return (
<div>
<div className='row mt-0'>
<div className='col-lg-9'>
<main>
<div className="insights mb-3">
  <div className="proyectos">
    <div className="middle">
        <div className="left">
            <h2>Total Proyectos</h2>
            <h1>{totalProyectos.TotalProyectos}</h1>
        </div>
        <i className="fas fa-chart-bar fa-2x"></i>
    </div>           
   </div>
   <div className="tareas">
    <div className="middle">
        <div className="left">
            <h2>% de Tareas Completadas ({totalTareasCompleted.TotalCompleted} de {totalTareasCompleted.TotalTareas})</h2>
                   <div className="row no-gutters align-items-center">
                                                <div className="col-auto">
                                                    <h1>{porcentageTareas}%</h1>
                                                </div>
                                                <div className="col">
                                                    <div className="progress progress-sm mr-2">
                                                        <div className="progress-bar bg-info" role="progressbar"
                                                            style={{width: `${porcentageTareas}%`}} aria-valuenow="50" aria-valuemin="0"
                                                            aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                            </div>
        </div>
        <i className="fas fa-tasks fa-2x"></i>
    </div>           
   </div>
   <div className="mantenimientos">
    <div className="middle">
        <div className="left">
            <h2>Mantenimientos Este Mes</h2>
            <h1>{totalMantenimientos.TotalMantenimientos}</h1>
        </div>
        <i className="fas fa-align-justify fa-2x"></i>
    </div>           
   </div>
</div>

<div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h1 className="accordion-header" id="headingOne">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Proximos Mantenimientos
      </button>
      {/* <button onClick={()=>refresh()}>Refresh</button> */}
    </h1>
    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <div className="recent-orders mt-0 mb-0">
                {/* <h2>Proximos Mantenimientos</h2> */}
                <table className='table table-hover'>
                    <thead>
                        <tr>
                        <th style={{width:"280px"}}>Proyecto</th>
                            <th style={{width:"280px"}}>Proveedor</th>
                            <th style={{width:"280px"}}>Servicio</th>
                            <th style={{width:"120px"}}>Fecha</th>
                            <th style={{width:"60px"}}>Hora</th>
                            <th style={{width:"100px"}}>Estado</th>                           
                        </tr>
                    </thead>
                     <tbody>                                            
                    {<ListarNextMant 
                    nextmants={nextMants}
                    />}
                    </tbody>
                </table>
            </div>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingTwo">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Tareas Asignadas
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      <div className="recent-orders mt-0 mb-0">
                {/* <h2>Proximos Mantenimientos</h2> */}
                <div className="tableContainer">
                <table className='table table-hover'>
                    <thead>
                        <tr>
                        <th style={{width:"780px"}}>Tarea</th>
                            <th style={{width:"200px"}}>Asignada Por</th>
                            <th style={{width:"200px"}}>Asignada A</th>
                            <th style={{width:"280px"}}>Fecha/Hora Asignacion</th>
                        </tr>
                    </thead>
                     <tbody>                                            
                    {<ListarTareasperUser
                    tareas={Tareas}
                    />}
                    </tbody>
                </table>
                </div>
            </div>
      </div>
    </div>
  </div>
</div>
 </main>
  </div>
  <div className='col-lg-3'>
     <div className="right">

            <div className="recent-updates">
                <h2>Notificaciones Recientes</h2>
                <div className="updates">
                    <div className="update">
                        <div className="profile">
                        <i className="fas fa-bell"></i>
                        </div>
                        <div className="message">
                            <p><b>Tatiana Robles</b> Notificacion 1</p>
                            <small className="text-muted">2 minutes ago</small>
                        </div>
                    </div>
                    <div className="update">
                        <div className="profile">
                        <i className="fas fa-bell"></i>
                        </div>
                        <div className="message">
                            <p><b>Diana Ross</b> Received her order if the Night Lion tech GPS drone</p>
                            <small className="text-muted">2 minutes ago</small>
                        </div>
                    </div>
                    <div className="update">
                        <div className="profile">
                        <i className="fas fa-bell"></i>
                        </div>
                        <div className="message">
                            <p><b>Yeny Mora</b> Received her order if the Night Lion tech GPS drone</p>
                            <small className="text-muted">2 minutes ago</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sales-analytics">
                <h2>Sales Analytics</h2>
                <div className="item online">
                    <div className="icon">
                        {/* <span className="material-icons-sharp">shopping_cart</span> */}
                        <i className="fa-solid fa-calendar-days"></i>
                    </div>
                    <div className="right">
                        <div className="info">
                            <h3>Online Orders</h3>
                            <small className="text-muted">Last 24 hours</small>
                        </div>
                        <h5 className="success">+39%</h5>
                        <h3>3849</h3>
                    </div>
                </div>
                <div className="item offline">
                    <div className="icon">
                        {/* <span className="material-icons-sharp">local_mall</span> */}
                        <i className="fa-solid fa-layer-group"></i>
                    </div>
                    <div className="right">
                        <div className="info">
                            <h3>Offline Orders</h3>
                            <small className="text-muted">Last 24 hours</small>
                        </div>
                        <h5 className="danger">-17%</h5>
                        <h3>1100</h3>
                    </div>
                </div>
                <div className="item customers">
                    <div className="icon">
                        {/* <span className="material-icons-sharp">person</span> */}
                        <i className="fa-solid fa-rocket"></i>
                    </div>
                    <div className="right">
                        <div className="info">
                            <h3>New Customers</h3>
                            <small className="text-muted">Last 24 hours</small>
                        </div>
                        <h5 className="success">+25%</h5>
                        <h3>849</h3>
                    </div>
                </div>
                {/* <div className="item add-product">
                    <div>
                        <span className="material-icons-sharp">add</span>
                        <h3>Add Product</h3>
                    </div>
                </div> */}
            </div>
        </div>
        </div>
</div>
</div>
)
}

export default Dashprofile
