import moment from "moment";
//import { useNavigate } from 'react-router-dom';
const ListarNextMant = ({nextmants}) => {

   // let navigate = useNavigate();

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