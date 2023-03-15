import React, { useState, useEffect, useMemo } from 'react';
//import axios from 'axios';
import axios from '../../api/axios';
import ListarProveedores from './ListarProveedores';

//import { useNavigate } from 'react-router-dom';
//const GET_URL = '/proveedores';
//const GET_SERV_URL = '/servicios';

const Proveedores = () => {
const [Proveedores, setProveedores] = useState([]);
//const [FilteredProveedores, setFilteredProveedores] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
const [servicios, setServicios] = useState([]);
//const [isFiltered, setIsFiltered] = useState(false);
const [selectedServicio, setSelectedServicio] = useState();

const [addProveedor, setAddProveedor] = useState({
    s_id: '',
    nombre: '',
    nit: '',
    contacto: '',
    telefono: '',
    cuenta: '', 
    email: ''
});

const [editFormData, setEditFormData] = useState({
    s_id: '',
    nombre: '',
    nit: '',
    contacto: '',
    telefono: '',
    cuenta: '', 
    email: ''
});

const handleChange = (input) => (e) => {
    e.preventDefault();
    setAddProveedor({...addProveedor,[input]: e.target.value});
}

const handleEditProveedorForm = (e, proveedor) => {
    e.preventDefault();
  
    const formValues = {
        pv_id : proveedor.pv_id,
        s_id: proveedor.s_id,
        nombre : proveedor.nombre,
        nit: proveedor.nit,
        contacto: proveedor.contacto,
        telefono: proveedor.telefono,
        cuenta: proveedor.cuenta, 
        email: proveedor.email
    }
    setEditFormData(formValues);
}

const handleEditFormClick = (input) => (e) => {
    e.preventDefault();
    setEditFormData({...editFormData, [input]: e.target.value });
  }


  const handleFormSave = (e) => {
    e.preventDefault();
      const editProveedor = {
      pv_id: editFormData.pv_id
  }

  axios.put(`http://localhost:3005/api/proveedores/editarProveedor/${editProveedor.pv_id}`,{
    pv_id:editFormData.pv_id,
    s_id:editFormData.s_id,
    nombre:editFormData.nombre,
    nit:editFormData.nit,
    contacto:editFormData.contacto,
    telefono:editFormData.telefono,
    cuenta:editFormData.cuenta,
    email:editFormData.email
  }).then((response)=>{
  
    loadFilteredProveedores(selectedServicio);
  
  })
  
  }

const handleAddProveedor = (e) => {
    e.preventDefault();
    const newProveedor = {
        s_id : addProveedor.s_id,
        nombre : addProveedor.nombre,
        nit : addProveedor.nit,
        contacto : addProveedor.contacto,
        telefono : addProveedor.telefono,
        cuenta : addProveedor.cuenta,
        email : addProveedor.email
    }

    axios.post('http://localhost:3005/api/AddProveedor',{
        s_id: newProveedor.s_id,
        nombre: newProveedor.nombre,
        nit : newProveedor.nit,
        contacto : newProveedor.contacto,
        telefono : newProveedor.telefono,
        cuenta : newProveedor.cuenta,
        email : newProveedor.email
      }).then(()=>{

     loadFilteredProveedores(selectedServicio);
    
      })
}

const handleDelete = (e, proveedor) => {
    e.preventDefault();
    
    if(window.confirm('Esta seguro de querer Eliminar este Registro?')){
  
     axios.delete(`http://localhost:3005/api/proveedores/borrarProveedor/${proveedor.pv_id}`,{
  
     }).then(()=>{
        loadFilteredProveedores(selectedServicio);
  
     })
    }
  }


  const loadFilteredProveedores = async (s_id) => {
        if(s_id==="All" || s_id===undefined){
            const response = await axios.get('http://localhost:3005/api/proveedores');
            setProveedores(response.data);
        }else{
            const response = await axios.get(`http://localhost:3005/api/proveedores/byS_Id/${s_id}`);
            setProveedores(response.data)
        }
   }

  const loadServicios = async () => {
    const response = await axios.get('http://localhost:3005/api/servicios/list');
    //const response = await axios.get(GET_SERV_URL);
    
    setServicios(response.data);
  };

  function search() {
    return Proveedores.filter(row=>row.nombre.toLowerCase().indexOf(searchQuery) > - 1);
  }

const fetchUrl = "http://localhost:3005/api/proveedores";

useEffect(() => {
    async function fetchData(){
        const data = await axios.get(fetchUrl);
        setProveedores(data.data);
        return data
    }
    fetchData();
    loadServicios();
    },[fetchUrl]);

    function handleServicioChange(e){
        setSelectedServicio(e.target.value);
        loadFilteredProveedores(e.target.value);
}
 
function getFilteredList(){
 if(!selectedServicio){
  return Proveedores;
  }
  else{ 
  return Proveedores;   
  }
}

var filteredList = useMemo(getFilteredList, [selectedServicio, Proveedores]);

return (
    <>
    <div className="template">
        <div className="card">
            <div className="card-header">
            <h2 className="mb-2 mt-2">Proveedores</h2>
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
            <select className="form-select dropdown"
            name="ddlServicio"
            id="ddlServicio"
            value={selectedServicio}
            onChange={handleServicioChange}
            >
        <option value="All">Filtrar por Servicio</option>
      {servicios.map((item,index) => {
        return (
          <option value={item.s_id} key={item.s_id}>{item.nombre}</option>
        )
      })}
      </select>
            <button type="button" className="btn btn-sm btn-warning shadow-sm" data-bs-toggle="modal" data-bs-target="#addProveedorForm"><i className='fas fa-circle-plus p-1 pr-10'></i> Agregar Proveedor</button>
            </div>
            <div className="body mt-4">
<div className="tableContainer">
<table className="table table-responsive table-hover">
  <thead className="thead-dark">
          <tr>            
            <th style={{width:"200px"}}>Nombre</th>
            <th style={{width:"180px"}}>NIT</th>
            <th style={{width:"180px"}}>Cuenta</th>
            <th style={{width:"250px"}}>Servicio</th>
            <th style={{width:"150px"}}>Contacto</th>
            <th style={{width:"150px"}}>Telefono</th>
            <th style={{width:"180px"}}>Email</th>
            <th style={{width:"100px",textAlign:"center"}}>Accion</th>
          </tr>
  </thead>
  <tbody>
  {
  <ListarProveedores
  //nameFilter={searchQuery}
  proveedores={search(filteredList)}
  handleEditProveedorForm={handleEditProveedorForm}
  handleDelete={handleDelete}
   />
    }
  </tbody>
    </table>
    </div>
    <div className="clearfix">
        <div className="hint-text">Total Registros: <b>{Proveedores.length}</b> </div>
    </div>
    {/* <Pagination pages = {totalPagesNum}
                setCurrentPage={setCurrentPage}
                currentRecords ={search(currentProyectos)}
                sortedRecords = {Proyectos} /> */}
  </div>
        </div>
        </div>
   {/* Add Proveedores Modal Begin*/}
    <div className="modal fade" id="addProveedorForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <form onSubmit={handleAddProveedor}>
        <div className="modal-content">
          <div className="modal-header primary">
          <h2 className="modal-title">Crear Proveedor</h2>
          </div>
          <div className="modal-body">
         
            <div className="row ml-4 mr-4 mb-4">
            <div className="col">
            <div className="form-group">
              <label htmlFor="nombre" className="form-label">Nombre del Proveedor</label>
              <input type="text" name="nombre" id="nombre" required className="form-control textbox" placeholder="Nombre del Proveedor" aria-describedby="helpId"              
              onChange={handleChange("nombre")}>
              </input>
            </div>
            </div>
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">NIT</label>
              <input type="text" name="nit" id="nit" required className="form-control textbox" placeholder="NIT del Proyecto" aria-describedby="helpId"
              onChange={handleChange("nit")}>
              </input>
            </div>
            </div>
            </div>

            <div className="row ml-4 mr-4 mb-4">
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Cuenta de Banco</label>
              <input type="text" name="cuenta" id="cuenta" className="form-control textbox" placeholder="Cuenta de Banco del Proveedor" aria-describedby="helpId"
              onChange={handleChange("cuenta")}
              ></input>
            </div>
            </div>
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Email</label>
              <input type="text" name="email" id="email" required  className="form-control textbox" placeholder="Ciudad" aria-describedby="helpId"
              onChange={handleChange("email")}></input>
            </div>
            </div>
            </div>
        
           <div className="row ml-4 mr-4 mb-4">
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Nombre del Contacto</label>
              <input type="text" name="contacto" id="contacto" required className="form-control textbox" placeholder="Nombre del Contacto" aria-describedby="helpId"
              onChange={handleChange("contacto")}
              ></input>
            </div>
            </div>
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Telefono</label>
              <input type="text" name="telefono"  id="telefono" required className="form-control textbox" placeholder="Telefono" aria-describedby="helpId"
              onChange={handleChange("telefono")}
              ></input>
            </div>  
            </div>
            </div>
            <div className="row ml-4 mr-4 mb-4">
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Servicio</label>
              {/* <input type="email" name="email" id="email" required className="form-control textbox" placeholder="Email del Proyecto" aria-describedby="helpId"
              onChange={handleChange("email")}></input> */}
            <select className="form-select dropdown"
            name="s_id"
            id="s_id"
            //value={selectedServicio}
            onChange={handleChange("s_id")}
            >
        {/* <option value="">Filtrar por Servicio</option> */}
      {servicios.map((item,index) => {
        return (
          <option value={item.s_id} key={item.s_id}>{item.nombre}</option>
        )
      })}
      </select>
            </div>  
            </div>
            <div className="col">
            <div className="form-group">
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
    {/* Add Proveedor Modal End*/}
{/* Edit Proveedor Modal Begin*/}
    <div className="modal fade" id="editProveedorForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <form onSubmit={handleFormSave}>
        <div className="modal-content">
          <div className="modal-header primary">
          <h2 className="modal-title">Editar Proveedor</h2>
          </div>
          <div className="modal-body">
         
            <div className="row ml-4 mr-4 mb-4">
            <div className="col">
            <div className="form-group">
              <label htmlFor="nombre" className="form-label">Nombre del Proveedor</label>
              <input type="text" name="nombre" id="nombre" required className="form-control textbox" placeholder="Nombre del Proveedor" aria-describedby="helpId"
              value={editFormData.nombre}
              onChange={handleEditFormClick("nombre")}>
              </input>
            </div>
            </div>
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">NIT</label>
              <input type="text" name="nit" id="nit" required className="form-control textbox" placeholder="NIT del Proyecto" aria-describedby="helpId"
              value={editFormData.nit}
              onChange={handleEditFormClick("nit")}>
              </input>
            </div>
            </div>
            </div>

            <div className="row ml-4 mr-4 mb-4">
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Cuenta de Banco</label>
              <input type="text" name="cuenta" id="cuenta" required  className="form-control textbox" placeholder="Cuenta de Banco del Proveedor" aria-describedby="helpId"
              value={editFormData.cuenta}
              onChange={handleEditFormClick("cuenta")}
              ></input>
            </div>
            </div>
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Email</label>
              <input type="text" name="email" id="email" required  className="form-control textbox" placeholder="Ciudad" aria-describedby="helpId"
              value={editFormData.email}
              onChange={handleEditFormClick("email")}></input>
            </div>
            </div>
            </div>
        
           <div className="row ml-4 mr-4 mb-4">
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Nombre del Contacto</label>
              <input type="text" name="contacto" id="contacto" required className="form-control textbox" placeholder="Nombre del Contacto" aria-describedby="helpId"
              value={editFormData.contacto}
              onChange={handleEditFormClick("contacto")}
              ></input>
            </div>
            </div>
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Telefono</label>
              <input type="text" name="telefono"  id="telefono" required className="form-control textbox" placeholder="Telefono" aria-describedby="helpId"
              value={editFormData.telefono}
              onChange={handleEditFormClick("telefono")}
              ></input>
            </div>  
            </div>
            </div>
            <div className="row ml-4 mr-4 mb-4">
            <div className="col">
            <div className="form-group">
            <label htmlFor="" className="form-label">Servicio</label>
            <select className="form-select dropdown"
            name="s_id"
            id="s_id"
            value={editFormData.s_id}
            onChange={handleEditFormClick("s_id")}
            >
      {servicios.map((item,index) => {
        return (
          <option value={item.s_id} key={item.s_id}>{item.nombre}</option>
        )
      })}
      </select>
            </div>  
            </div>
            <div className="col">
            <div className="form-group">
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
{/* Edit Proveedor Modal Begin*/}
    </div>
    </>
  )
}

export default Proveedores
