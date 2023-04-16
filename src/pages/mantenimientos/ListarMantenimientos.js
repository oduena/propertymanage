import moment from "moment";

const ListarMantenimientos = ({mantenimientos, handleEditMantenimientoForm, handleViewMantenimiento, handleDelete}) => {

return (
<>
  
{mantenimientos.map((mantenimiento)=>(
<tr key={mantenimiento.m_id}>
 <td>{mantenimiento.proyecto}</td>
    <td>{mantenimiento.proveedor}</td>
    <td>{mantenimiento.servicio}</td>
    <td>{moment(mantenimiento.fecha).format('YYYY-MM-DD')}</td>
    <td>{mantenimiento.hora}</td>
    {/* <td>{item.estado}</td> */}
    <td><span className={mantenimiento.estado==='Ejecutandose' ? "label label-success" : mantenimiento.estado==='Programado' ? "label label-info" : 
    mantenimiento.estado==='Pendiente' ? "label label-warning" : "label label-dark"}>{mantenimiento.estado}</span></td>
    {/* <td>{item.periodicidad}</td> */}
    <td>{mantenimiento.periodicidad === '12' ? 'Mensual' : mantenimiento.periodicidad==='6' ? 'Bimestral' : mantenimiento.periodicidad==='4' ? 'Cada 3  meses' : mantenimiento.periodicidad==='3' ?
              'Cada 4 meses' : mantenimiento.periodicidad==='2' ? 'Semestral' : 'Anual'}</td>
              
    <td>{mantenimiento.notas}</td>
    <td style={{textAlign:"center"}}>
            <div className="row">
              <div className="col-lg-4">
              <i className="far fa-eye fa-lg" 
              title="Ver Detalles"
              style={{color:"blue",cursor:"pointer"}}
              //onClick={()=>navigate(`/mantenimientos/ver/${mantenimiento.m_id}`)}
              data-bs-toggle="modal"
              data-bs-target="#ViewMantenimientoForm"
              onClick={(e)=>handleViewMantenimiento(e, mantenimiento)}></i>
              
              </div>
              <div className='col-lg-4'>
              <i className="far fa-edit fa-lg"
              title="Editar"
              style={{color:"blue",cursor:"pointer"}}
              data-bs-toggle="modal"
              data-bs-target="#editMantenimientoForm"
              onClick={(e) => handleEditMantenimientoForm(e, mantenimiento)}></i>
              </div>
              <div className='col-lg-4'>
              <i className="far fa-trash-alt fa-lg"
              title="Borrar"
              style={{color:"red",cursor:"pointer"}}
              onClick={(e) => handleDelete(e, mantenimiento)}
              ></i>              
              </div>
            </div>
          </td>
            </tr>
        ))}
    
        </>
      )
}

export default ListarMantenimientos