import React, { useRef, useState, useEffect, useMemo } from 'react';
import Axios from 'axios';
import ListarUsuarios from './ListarUsuarios';

const Usuarios = () => {
const [Usuarios, setUsuarios] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
const [errMsg, setErrMsg] = useState('');
const errRef = useRef();
const [addUsuario, setAddUsuario] = useState({
    nombre: '',
    email: '',
    role: '',
    estado: 'Activo',
    password: ''
});

const [editFormData, setEditFormData] = useState({
  id: '',
  nombre: '',
  email: '',
  role: '',
  estado: '',
  password: ''
});

const handleChange = (input) => (e) => {
    e.preventDefault();
    setAddUsuario({...addUsuario,[input]: e.target.value});
}

const handleAddUsuario = (e) => {


try {
        e.preventDefault();
    const newUsuario = {
        nombre : addUsuario.nombre,
        email : addUsuario.email,
        role : addUsuario.role,
        estado: addUsuario.estado,
        password : addUsuario.password
}
    Axios.post('http://localhost:3005/api/AddUsuario',{
        nombre: newUsuario.nombre,
        email : newUsuario.email,
        role : newUsuario.role,
        estado: newUsuario.estado,
        password : newUsuario.password
      }).then(()=>{

        loadUsuarios();
    
      })
} catch (err) {
    console.log(err);
    if(err.response?.data?.status===23000){
        setErrMsg("El Email ya ha sido registrado con anterioridad");
    }
}

}

const handleEditUsuarioForm = (e, usuario) => {
  e.preventDefault();

  const formValues = {
      id : usuario.id,      
      nombre : usuario.nombre,
      email: usuario.email,
      role: usuario.role,
      estado: usuario.estado,
      password: usuario.password
  }
  setEditFormData(formValues);
}

const handleEditFormClick = (input) => (e) => {
  e.preventDefault();
  setEditFormData({...editFormData, [input]: e.target.value });
}

const handleFormSave = (e) => {
  e.preventDefault();
    const editUsuario = {
    id: editFormData.id
}

Axios.put(`http://localhost:3005/api/usuarios/editarUsuario/${editUsuario.id}`,{
  id:editFormData.id,
  nombre:editFormData.nombre,
  email:editFormData.email,
  role:editFormData.role,
  estado:editFormData.estado,
  password:editFormData.password,
  
}).then((response)=>{

  loadUsuarios();

})

}


const loadUsuarios = async () => {
   
        const response = await Axios.get('http://localhost:3005/api/usuarios');
        setUsuarios(response.data);
}

const fetchUrl = "http://localhost:3005/api/usuarios";

function search() {
    return Usuarios.filter(row=>row.nombre.toLowerCase().indexOf(searchQuery) > - 1);
   }

useEffect(() => {
    async function fetchData(){
        const data = await Axios.get(fetchUrl);
        setUsuarios(data.data);
        return data
    }
    fetchData();
    },[fetchUrl]);


return (
<>
<div className="template">
<div className='container'>
<div className="card">
<div className="card-header">
  <h2 className="mb-2 mt-2">Usuarios</h2>
  </div>
  <div className="card-body">
  <div className="d-sm-flex align-items-center justify-content-between">
               <input
              type="text"
              className="form-control searchbox"
              placeholder="Buscar por Nombre"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
             <button type="button" className="btn btn-sm btn-warning shadow-sm" data-bs-toggle="modal" data-bs-target="#addUsuarioForm"><i className='fas fa-circle-plus pr-10'></i>
             Agregar Usuario
            </button>
  </div>
  <div className="body mt-4">
  <div className="tableContainer">
  <table className="table table-responsive table-hover">
  <thead className="thead-dark">
          <tr>
            <th style={{width:"180px"}}>Nombre</th>
            <th style={{width:"180px"}}>Email</th>
            <th style={{width:"80px"}}>Role</th>
            <th style={{width:"100px"}}>Estado</th>
            <th style={{width:"20px",textAlign:"center"}}>Accion</th>
          </tr>
  </thead>
  <tbody>

<ListarUsuarios
//nameFilter={searchQuery}
usuarios={search(Usuarios)}
handleEditUsuarioForm={handleEditUsuarioForm}
//handleDelete={handleDelete}
/>
</tbody>
</table>
  </div>
  <div className="clearfix">
  <div className="hint-text">Total Registros: <b>{Usuarios.length}</b> </div>
</div>
  </div>
</div>
</div>
   {/* Add Usuarios Modal Begin*/}
   <div className="modal fade" id="addUsuarioForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <form onSubmit={handleAddUsuario}>
        <div className="modal-content">
          <div className="modal-header primary">
          <h2 className="modal-title">Crear Usuario</h2>
          </div>
          <div className="modal-body">
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className="row ml-4 mr-4 mb-4">
            <div className="col">
            <div className="form-group">
              <label htmlFor="nombre" className="form-label">Nombre del Usuario</label>
              <input type="text" name="nombre" required className="form-control textbox" placeholder="Nombre del Usuario" aria-describedby="helpId"              
              onChange={handleChange("nombre")}>
              </input>
            </div>
            </div>
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Email</label>
              <input type="text" name="email" required className="form-control textbox" placeholder="email" aria-describedby="helpId"
              onChange={handleChange("email")}>
              </input>
            </div>
            </div>
            </div>

            <div className="row ml-4 mr-4 mb-4">
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Role</label>
              <select className="form-select dropdown"
            name="role"
            onChange={handleChange("role")}
            >
        <option value="">Seleccione un Role</option>
        <option value="Admin">Admin</option>
        <option value="Usuario">Usuario</option>
      </select>
            </div>
            </div>
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Password</label>
              <input type="password" name="password" required  className="form-control textbox" placeholder="Password" aria-describedby="helpId"
              onChange={handleChange("password")}></input>
            </div>
            </div>
            </div>
            <br/>
          </div>
          <div className="modal-footer">
  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
<button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
</div>
        </div>
        </form>
      </div>
    </div>
    {/* Add Usuario Modal End*/}

 {/* Edit Usuarios Modal Begin*/}
 <div className="modal fade" id="editUsuarioForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <form onSubmit={handleFormSave}>
        <div className="modal-content">
          <div className="modal-header primary">
          <h2 className="modal-title">Editar Usuario</h2>
          </div>
          <div className="modal-body">
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className="row ml-4 mr-4 mb-4">
            <div className="col">
            <div className="form-group">
              <label htmlFor="nombre" className="form-label">Nombre del Usuario</label>
              <input type="text" name="nombre" id="nombre" required className="form-control textbox" placeholder="Nombre del Usuario" aria-describedby="helpId"              
              value={editFormData.nombre}
              onChange={handleEditFormClick("nombre")}>
              </input>
            </div>
            </div>
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Email</label>
              <input type="text" name="email" id="email" required className="form-control textbox" placeholder="email" aria-describedby="helpId"
              value={editFormData.email}
              onChange={handleEditFormClick("email")}>
              </input>
            </div>
            </div>
            </div>

            <div className="row ml-4 mr-4 mb-4">
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Role</label>
              <select className="form-select dropdown"
            name="role"
            id="role"
            value={editFormData.role}
            onChange={handleEditFormClick("role")}
            >
        <option value="">Seleccione un Role</option>
        <option value="Admin">Admin</option>
        <option value="Usuario">Usuario</option>
      </select>
            </div>
            </div>
            <div className="col-6">
            <div className="form-group">
              <label htmlFor="" className="form-label">Estado</label>
              <select className="form-select dropdown"
            name="estado"
            id="estado"
            value={editFormData.estado}
            onChange={handleEditFormClick("estado")}
            >
        <option value="">Seleccione un Estado</option>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>
            </div>





            </div>
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Password</label>
              <input type="password" name="password" id="password" required  className="form-control textbox" placeholder="Password" aria-describedby="helpId"
              value={editFormData.password}
              onChange={handleEditFormClick("password")}></input>
            </div>
            </div>
            </div>
            <br/>
          </div>
          <div className="modal-footer">
  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
<button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
</div>
        </div>
        </form>
      </div>
    </div>
    {/* Add Usuario Modal End*/}




</div>
</div>  
</>
)
}

export default Usuarios
