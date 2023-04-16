const ListarProveedores = ({proveedores, handleEditProveedorForm, handleDelete}) => {

    return (
      <>

      {proveedores.map((proveedor)=>(
          <tr key={proveedor.pv_id}>
              <td>{proveedor.nombre}</td>
              <td>{proveedor.direccion}</td>
              <td>{proveedor.nit}</td>
              <td>{proveedor.cuenta}</td>
              <td>{proveedor.servicio}</td>
              <td>{proveedor.contacto}</td>
              <td>{proveedor.telefono}</td>
              <td>{proveedor.email}</td>
        

              <td><span className={proveedor.estado==='Activo' ? "label label-success" : "label label-warning"}>{proveedor.estado}</span></td>


              <td style={{textAlign:"center"}}>
          <div className="row">
            <div className="col-lg-6">
            <i className="far fa-edit fa-lg"
            title="Editar"
            style={{color:"blue",cursor:"pointer"}}
            data-bs-toggle="modal"
            data-bs-target="#editProveedorForm"
            onClick={(e) => handleEditProveedorForm(e, proveedor)}></i>
            </div>
            <div className='col-lg-6'>
            <i className="far fa-trash-alt fa-lg"
            title="Borrar"
            style={{color:"red",cursor:"pointer"}}
            onClick={(e) => handleDelete(e, proveedor)}
            ></i>
            </div>
          </div>
        </td>
          </tr>
      ))}
  
      </>
    )
  }
  
  export default ListarProveedores
  