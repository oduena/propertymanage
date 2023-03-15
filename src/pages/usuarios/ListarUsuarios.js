const ListarUsuarios = ({usuarios,handleEditUsuarioForm}) => {

    return (
      <>
      {/* <td>{servicio.nombre}</td>
      <td><span>Edit</span>
      <span className='danger'>Delete</span></td> */}
      {/* {currentServicios.filter(row=>row.nombre.toLowerCase().indexOf(searchQuery) > - 1).map((item, index) => { */}
      
      {/* {servicios.map((servicio)=>( */}
      {/* {servicios.filter(row=>row.nombre.toLowerCase().indexOf(nameFilter) > - 1).map((servicio)=>( */}
      {usuarios.map((usuario)=>(
          <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.role}</td>
              <td>{usuario.estado}</td>
              <td style={{textAlign:"center"}}>
          <div className='row' style={{textAlign:"center"}}>
            <div className='col-lg-6'>
             <i className="far fa-edit fa-lg"
            title="Editar"
            style={{color:"blue",cursor:"pointer"}}
            data-bs-toggle="modal"
            data-bs-target="#editUsuarioForm"
            onClick={(e) => handleEditUsuarioForm(e, usuario)}></i>
            </div>
            <div className='col-lg-6'>
            {/* <i className="far fa-trash-alt fa-lg"
            title="Borrar"
            style={{color:"red",cursor:"pointer"}}
            onClick={(e) => handleDelete(e, servicio)}
            ></i> */}
            </div>
          </div>
        </td>
          </tr>
      ))}
  
      </>
    )
  }
  
  export default ListarUsuarios
  