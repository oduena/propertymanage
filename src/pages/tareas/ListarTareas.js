import moment from 'moment';
const ListarTareas = ({tareas, userRole, handleEditTareaForm, handleViewTarea, handleDelete}) => {

    return (
      <>

      {tareas.map((tarea)=>(
          <tr key={tarea.t_id}>
              <td>{tarea.proyecto}</td>
              <td>{tarea.descripcion}</td>
              <td>{tarea.asignedby}</td>
              <td>{tarea.asignedto}</td>
              <td>{moment(tarea.fechaasignada).format('YYYY-MM-DD HH:mm')}</td>
              

              <td><span className={tarea.estado==='En-Proceso' ? "label label-success" : tarea.estado==='Asignada' ? "label label-info" : 
    tarea.estado==='Pendiente' ? "label label-warning" : "label label-dark"}>{tarea.estado}</span></td>

              <td>
          <div className="d-flex justify-content-between mt-2">
            {/* <div className="col"> */}
            <i className="far fa-eye fa-lg" 
              title="Ver Detalles"
              style={{color:"blue",cursor:"pointer"}}
              data-bs-toggle="modal"
              data-bs-target="#ViewTareaForm"
              onClick={(e)=>handleViewTarea(e, tarea)}></i>  
            <i className="far fa-edit fa-lg"
            title="Editar"
            style={{color:"blue",cursor:"pointer"}}
            data-bs-toggle="modal"
            data-bs-target="#editTareaForm"
            onClick={(e) => handleEditTareaForm(e, tarea)}></i>
            {userRole==='Admin' ? (
              <i className="far fa-trash-alt fa-lg"
            title="Borrar"
            style={{color:"red",cursor:"pointer"}}
            onClick={(e) => handleDelete(e, tarea)}
            ></i>
            ) : (<></>) }
            
            </div>
          {/* </div> */}
        </td>
          </tr>
      ))}
  
      </>
    )
  }
  
  export default ListarTareas
  