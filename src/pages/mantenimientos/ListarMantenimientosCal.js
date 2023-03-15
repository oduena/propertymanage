//import moment from "moment";
//import { useNavigate } from 'react-router-dom';
const ListarMantenimientos = ({mantenimientoscal}) => {

//let navigate = useNavigate();

return (
<>

{mantenimientoscal.map((mantenimiento)=>(
  <tr key={mantenimiento.m_id}>
          <td>{mantenimiento.proyecto}</td>
          <td>{mantenimiento.proveedor}</td>
          <td>{mantenimiento.servicio}</td>
          <td>{mantenimiento.enero}</td>
          <td>{mantenimiento.febrero}</td>
          <td>{mantenimiento.marzo}</td>
          <td>{mantenimiento.abril}</td>
          <td>{mantenimiento.mayo}</td>
          <td>{mantenimiento.junio}</td>
          <td>{mantenimiento.julio}</td>
          <td>{mantenimiento.agosto}</td>
          <td>{mantenimiento.septiembre}</td>
          <td>{mantenimiento.octubre}</td>
          <td>{mantenimiento.noviembre}</td>
          <td>{mantenimiento.diciembre}</td>
          </tr>
        ))}
    
        </>
      )




}

export default ListarMantenimientos