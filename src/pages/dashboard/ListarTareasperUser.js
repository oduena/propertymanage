import moment from "moment";

const ListarTareasperUser = ({tareas}) => {

return (
 <>
  
    {tareas.map((tarea)=>(
    <tr key={tarea.t_id}>
    <td>{tarea.descripcion}</td>
    <td>{tarea.asignedby}</td>
    <td>{tarea.asignedto}</td>
    <td>{moment(tarea.fechaasignada).format('YYYY-MM-DD HH:ss')}</td>
    <td></td>
   </tr>
  ))}
 </>
)
}

export default ListarTareasperUser