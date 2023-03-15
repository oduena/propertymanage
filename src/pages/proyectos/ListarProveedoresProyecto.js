import moment from 'moment';
const ListarProveedoresProyecto = ({proveedoresproyecto,handleEditProyectoProveedorForm})=>{
    return (
        <>
    {proveedoresproyecto.map((item) => (

          <tr className="table-row" key={item.pp_id}>
          <td>{item.proveedor}</td>
          <td>{item.servicio}</td>
          <td>{item.contacto}</td>
          <td>{item.email}</td>
          <td>{item.telefono}</td>
          <td>{item.periodicidad === '12' ? 'Mensual' : item.periodicidad==='6' ? 'Bimestral' : item.periodicidad==='4' ? 'Cada 3  meses' : item.periodicidad==='3' ?
          'Cada 4 meses' : item.periodicidad==='2' ? 'Semestral' : 'Anual'}</td>
          <td>{moment(item.fechainicio).format('YYYY-MM-DD')}</td>
          <td><span className={item.daysleft >= 30 ? "label label-success" : item.daysleft < 29 && item.daysleft > 14 ? "label label-warning" :           
    "label label-danger"}>{moment(item.fechavence).format('YYYY-MM-DD')}</span></td>
        <td>
          <i className="far fa-edit fa-lg"
          title="Editar"
          style={{color:"blue",cursor:"pointer"}}
          data-bs-toggle="modal"
          data-bs-target="#editProveedorProyectoForm"
          onClick={(e) => handleEditProyectoProveedorForm(e, item)}
          >
          </i>
          </td>
          </tr>

    ))}
</>
    )
}
export default ListarProveedoresProyecto