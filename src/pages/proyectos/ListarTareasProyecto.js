import moment from 'moment';
const ListarTareasProyecto = ({tareasproyecto,handleEditTareaProyectoForm})=>{
    return (
        <>
    {tareasproyecto.map((item) => (

          <tr className="table-row" key={item.t_id}>
          <td>{item.descripcion}</td>
          <td>{item.asignadapor}</td>
          <td>{item.asignadaa}</td>
          <td>{moment(item.fechaasignada).format('YYYY-MM-DD HH:mm')}</td>
          <td><span className={item.estado==='En-Proceso' ? "label label-success" : item.estado==='Asignada' ? "label label-info" : 
    item.estado==='Pendiente' ? "label label-warning" : "label label-dark"}>{item.estado}</span></td>
        {/* <td>
          <i className="far fa-edit fa-lg"
          title="Editar"
          style={{color:"blue",cursor:"pointer"}}
          data-bs-toggle="modal"
          data-bs-target="#editProveedorProyectoForm"
          onClick={(e) => handleEditTareaProyectoForm(e, item)}
          >
          </i>
          </td> */}
          </tr>

    ))}
</>
    )
}
export default ListarTareasProyecto