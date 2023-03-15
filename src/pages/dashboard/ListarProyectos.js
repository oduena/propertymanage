import moment from "moment";

const ListarProyectos = ({proyectos}) => {

    return (
        <>
  
    {proyectos.map((proyecto)=>(
    <tr key={proyecto.p_id}>
    <td>{proyecto.nombre}</td>
    <td>{moment(proyecto.fechainicio).format('YYYY-MM-DD')}</td>
    <td><span className={proyecto.daysleft >= 30 ? "label label-success" : proyecto.daysleft < 29 && proyecto.daysleft > 14 ? "label label-warning" :           
        "label label-danger"}>{moment(proyecto.fechavence).format('YYYY-MM-DD')}</span></td>
   </tr>
  ))}
 </>
)
}

export default ListarProyectos