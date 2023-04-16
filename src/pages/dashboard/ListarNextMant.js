import moment from "moment";

const ListarNextMant = ({nextmants}) => {

    return (
        <>
  
    {nextmants.map((mantenimiento)=>(
    <tr key={mantenimiento.m_id}>
    <td>{mantenimiento.proyecto}</td>
    <td>{mantenimiento.proveedor}</td>
    <td>{mantenimiento.servicio}</td>
    <td>{moment(mantenimiento.fecha).format('YYYY-MM-DD')}</td>
    <td>{mantenimiento.hora}</td>

    <td><span className={mantenimiento.estado==='Ejecutandose' ? "label label-success" : mantenimiento.estado==='Programado' ? "label label-info" : 
    mantenimiento.estado==='Pendiente' ? "label label-warning" : "label label-dark"}>{mantenimiento.estado}</span></td>
   </tr>
  ))}
 </>
)
}

export default ListarNextMant