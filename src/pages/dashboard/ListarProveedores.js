import moment from "moment";

const ListarProveedores = ({proveedores}) => {

return (
 <>
  
    {proveedores.map((proveedor)=>(
    <tr key={proveedor.pp_id}>
    <td>{proveedor.proveedor}</td>
    <td>{proveedor.servicio}</td>
    <td>{proveedor.proyecto}</td>
    <td>{moment(proveedor.fechainicio).format('YYYY-MM-DD')}</td>
    <td><span className={proveedor.daysleft >= 30 ? "label label-success" : proveedor.daysleft < 29 && proveedor.daysleft > 14 ? "label label-warning" :           
        "label label-danger"}>{moment(proveedor.fechavence).format('YYYY-MM-DD')}</span></td>
   </tr>
  ))}
 </>
)
}

export default ListarProveedores