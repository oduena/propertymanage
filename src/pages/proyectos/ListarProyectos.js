//import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import EditarModal from './EditarModal';
import  moment from 'moment';
const ListarProyectos = ({proyecto, handleDelete, proyectos}) => {
    //const [openEditModal, setOpenEditModal] = useState(false);
  let navigate = useNavigate();

    return (
      <>
       {/* {proyectos.filter(row=>row.nombre.toLowerCase().indexOf(nameFilter) > - 1).map((proyecto)=>( */}
      
      {/* {proyectos.filter(row=>row.nombre.toLowerCase().indexOf(nameFilter) > - 1).map((proyecto)=>( */}
      {proyectos.map((proyecto)=>(
      
      <tr key={proyecto.p_id}>
      
      <td>{proyecto.nombre}</td>
      <td>{proyecto.nit}</td>
      <td>{proyecto.direccion}</td>
      <td>{proyecto.ciudad}</td>
      <td>{proyecto.telefono}</td>
      <td>{proyecto.email}</td>
      <td>{proyecto.claveemail}</td>
      <td>{moment(proyecto.fechainicio).format('YYYY-MM-DD')}</td>
      {/* {proyecto.daysleft >= 30 ? fechavencelabel="success" : fechavencelabel="warning"} */}
      <td><span className={proyecto.daysleft >= 30 ? "label label-success" : proyecto.daysleft < 29 && proyecto.daysleft > 14 ? "label label-warning" :           
        "label label-danger"}>{moment(proyecto.fechavence).format('YYYY-MM-DD')}</span></td>
         <td style={{textAlign:"center"}}>
          <div className="row">
            <div className="col-lg-6">
            <i className="far fa-eye fa-lg" title="Ver Detalles" style={{color:"blue",cursor:"pointer"}} onClick={()=>navigate(`/proyectos/ver/${proyecto.p_id}`)}></i>
            {/* <i className="far fa-eye fa-lg"
            title="Ver Detalles"
            style={{color:"blue",cursor:"pointer"}}
            data-bs-toggle="modal"
            data-bs-target="#editProyectoForm"
            onClick={(e) => handleEditProyectoForm(e, proyecto)}
            >
            </i> */}
            {/* <i className="far fa-edit fa-lg" title="Editar" style={{color:"blue",cursor:"pointer"}} onClick={()=>setOpenEditModal(true)}></i> */}
            </div>
            <div className="col-lg-6">
            <i className="far fa-trash-alt fa-lg"
            title="Borrar"
            style={{color:"red",cursor:"pointer"}}
            onClick={(e) => handleDelete(e, proyecto)}
            ></i>
            </div>
          </div>
        </td>
          </tr>
      ))}
  
  
  {/* {openEditModal && <EditarModal closeEditModal={setOpenEditModal}/>} */}
  
  
      </>
    )
  }
  
  export default ListarProyectos
  