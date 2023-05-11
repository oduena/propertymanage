import React, { useState, useEffect, useMemo } from 'react';
import Axios from '../../api/axios';
import ListarTareas from './ListarTareas';
import ListarTareaNotas from './ListarTareaNotas';
import moment from 'moment';
//import AuthContext from '../../context/AuthProvider';
import {useAuthUser} from 'react-auth-kit';
//import { useNavigate } from 'react-router-dom';

const Tareas = () => {
const [Tareas, setTareas] = useState([]);
//const [FilteredProveedores, setFilteredProveedores] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
const [UsuariosList, setUsuariosList] = useState([]);
const [UsuariosAll, setUsuariosAll] = useState([]);
const [ProyectosList, setProyectosList] = useState([]);
//const [isFiltered, setIsFiltered] = useState(false);
const [selectedUsuario, setSelectedUsuario] = useState("All");
const [selectedProyecto, setSelectedProyecto] = useState("All");
const [seguimientoNota, setSeguimientoNota] = useState("");
const [seguimientoNotas, setSeguimientoNotas] = useState([]);
//let navigate = useNavigate();
//const { auth } = useContext(AuthContext);
const auth = useAuthUser()

const [addTarea, setAddTarea] = useState({
    p_id: '',
    descripcion: '',
    asignadapor: '',
    asignadaa: '',
    fechaasignada: '',
    fechaterminada: '', 
    estado: 'Asignada'
});

const [editFormData, setEditFormData] = useState({
    t_id: '',
    p_id: '',
    descripcion: '',
    asignadapor: '',
    asignadaa: '',
    fechaasignada: '',
    fechaterminada: '',
    estado: ''
});

const [ViewFormData, setViewFormData] = useState({
    t_id: '',
    proyecto: '',
    descripcion: '',
    asignadapor: '',
    asignadaa: '',
    fechaasignada: '',
    estado: 'Asignada'
});

const handleChange = (input) => (e) => {
    e.preventDefault();
    setAddTarea({...addTarea,[input]: e.target.value});
}

const handleEditTareaForm = (e, tarea) => {
    e.preventDefault();
   // setEditServicioId(servicio.s_id);
    const formValues = {
        t_id : tarea.t_id,
        p_id: tarea.p_id,
        descripcion : tarea.descripcion,
        asignadaa: tarea.asignadaa,
        asignadapor: tarea.asignadapor,
        fechaasignada: tarea.fechaasignada,
        fechaterminada: tarea.fechaterminada, 
        estado: tarea.estado
    }
    setEditFormData(formValues);
    //console.log(proveedor.nombre);
    //console.log(editFormData);
}

const handleViewTarea = (e, tarea) =>{
    e.preventDefault();
    const ViewformValues = {
      t_id : tarea.t_id,
      proyecto : tarea.proyecto,
      descripcion : tarea.descripcion,
      asignadapor: tarea.asignedby,
      asignadaa : tarea.asignedto,
      fechaasignada: tarea.fechaasignada,
      estado: tarea.estado
  }
  setViewFormData(ViewformValues);
  loadTareaSeguimientoNotas(tarea.t_id);
  }

const handleEditFormClick = (input) => (e) => {
    e.preventDefault();
    setEditFormData({...editFormData, [input]: e.target.value });
    
  }


  const handleFormSave = (e) => {
    e.preventDefault();
      const editTarea = {
      t_id: editFormData.t_id
  }
  
  Axios.put(`/tareas/editarTarea/${editTarea.t_id}`,{
    t_id:editFormData.t_id,
    p_id:editFormData.p_id,
    descripcion:editFormData.descripcion,
    asignadapor:editFormData.asignadapor,
    asignadaa:editFormData.asignadaa,
    fechaasignada:editFormData.fechaasignada,
    fechaterminada:editFormData.fechaterminada,
    estado:editFormData.estado
  }).then((response)=>{
  
    //loadProveedores();
    loadFilteredTareas();
  
  })
  
  }

const handleAddTarea = (e) => {
    //console.log(addTarea);
    e.preventDefault();
    const newTarea = {
        p_id : addTarea.p_id,
        descripcion : addTarea.descripcion,
        asignadapor : addTarea.asignadapor,
        asignadaa : addTarea.asignadaa,
        fechaasignada : addTarea.fechaasignada,
    //    fechaterminada : addTarea.fechaterminada,
        estado : addTarea.estado
    }

   // const newServicios = [...Servicios, newServicio];
    Axios.post('/AddTarea',{
        p_id: newTarea.p_id,
        descripcion: newTarea.descripcion,
        asignadapor : newTarea.asignadapor,
        asignadaa : newTarea.asignadaa,
        fechaasignada : newTarea.fechaasignada,
      //  fechaterminada : newTarea.fechaterminada,
        estado : newTarea.estado
      }).then(()=>{

      //loadProveedores();
     loadFilteredTareas();
    
      })
}

const handleAddTareaNotas = (e) =>{
    e.preventDefault();
    const newTareaNota = {
      t_id : ViewFormData.t_id,
      tarea_nota : seguimientoNota,
      username : auth().user
    }

    Axios.post('/tareas/AddTareaNotas',{
      t_id : newTareaNota.t_id,
      tarea_nota : newTareaNota.tarea_nota,
      username : newTareaNota.username
    }).then((response)=>{
        setSeguimientoNota("");
        loadTareaSeguimientoNotas(ViewFormData.t_id);
      //  console.log(editFormData.m_id)
    })

  }

const handleFilterClick = async () => {
    if(selectedProyecto==="All"){
    if(selectedUsuario==="All"){
      const response = await Axios.get('/tareas');
      setTareas(response.data);
    }else{
      const response = await Axios.get(`/tareas/byUser_AsignedTo/${selectedUsuario}`);
    setTareas(response.data);
    }
    }else{
      if(selectedUsuario==="All"){
        const response = await Axios.get(`/tareas/byP_Id/${selectedProyecto}`);
        setTareas(response.data)
      }else{
        const response = await Axios.get('/tareas/ByP_idbyUser_Asigned',{
          params:{
              p_id:selectedProyecto,
              user_id:selectedUsuario
          }
      });
      setTareas(response.data);
      }
    }
}

const handleDelete = (e, tarea) => {
    e.preventDefault();
    
    if(window.confirm('Esta seguro de querer Eliminar este Registro?')){
  
     Axios.delete(`/tareas/borrarTarea/${tarea.t_id}`,{
  
     }).then(()=>{
        loadFilteredTareas();
  
     })
    }
  }

//   const loadProveedores = async () => {

//     const response = await Axios.get('http://localhost:3005/api/proveedores');
//     setProveedores(response.data);
//   };

  const loadFilteredTareas = async () => {
    
    if(selectedProyecto==="All"){
        if(selectedUsuario==="All"){
          const response = await Axios.get('/tareas');
          setTareas(response.data);
        }else{
          const response = await Axios.get(`/tareas/byUser_AsignedTo/${selectedUsuario}`);
        setTareas(response.data);
        }
        }else{
          if(selectedUsuario==="All"){
            const response = await Axios.get(`/tareas/byP_Id/${selectedProyecto}`);
            setTareas(response.data)
          }else{
            const response = await Axios.get('/tareas/ByP_idbyUser_Asigned',{
              params:{
                  p_id:selectedProyecto,
                  user_id:selectedUsuario
              }
          });
          setTareas(response.data);
          }
        }
}

const loadTareaSeguimientoNotas = async (t_id) =>{
    const response = await Axios.get(`/tareas/getTareaNotasByt_id/${t_id}`);
    setSeguimientoNotas(response.data);
    //console.log(seguimientoNotas);
  }

const loadListProyectos = async () => {
    const response = await Axios.get('/proyectos/list');
    setProyectosList(response.data);
};


  const loadUsuariosList = async () => {
    if(auth().role==='Admin'){
    const response = await Axios.get('/usuarios/list');
    setUsuariosList(response.data);
    }else{
      const response = await Axios.get(`/usuarios/listuser/${auth().userID}`);
    setUsuariosList(response.data);
    }

  };

  const loadUsuariosAll = async () => {
    
    const response = await Axios.get('/usuarios/list');
    setUsuariosAll(response.data);

  };



  function search() {
    return Tareas.filter(row=>row.descripcion.toLowerCase().indexOf(searchQuery) > - 1);
  }

// if(auth().role==='Admin'){
//   const fetchUrl = "http://localhost:3005/api/tareas";
// }else{
//   const fetchUrl = `http://localhost:3005/api/tareas/byUser_AsignedTo/${auth().userID}`;
// }


  useEffect(() => {

    if(auth().role==='Admin'){
      const fetchUrl = "/tareas";
      async function fetchData(){
        const data = await Axios.get(fetchUrl);
        setTareas(data.data);
        return data
    }
    fetchData();
    }else{
      const fetchUrl = `/tareas/byUser_AsignedTo/${auth().userID}`;
      async function fetchData(){
        const data = await Axios.get(fetchUrl);
        setTareas(data.data);
        return data
    }
    fetchData();
    }
    
    loadUsuariosList();
    loadUsuariosAll();
    loadListProyectos();
    },[]);

const handleUsuarioChange = (e) =>{
  //e.preventDefault();
  setSelectedUsuario(e.target.value);
}

const handleProyectoChange = (e) =>{
    //e.preventDefault();
    setSelectedProyecto(e.target.value);
  }
 
function getFilteredList(){
 if(!selectedUsuario){
  return Tareas;
  }
  else{ 
  return Tareas;
  }
}

var filteredList = useMemo(getFilteredList, [selectedUsuario, Tareas]);

return (
    <>
    <div className="template">
        <div className="card">
            <div className="card-header">
            <h2 className="mb-2 mt-2">Tareas</h2>
            </div>
        <div className="card-body">
        <div className="d-sm-flex align-items-center justify-content-between">
                <input
              type="text"
              className="form-control searchbox"
              placeholder="Buscar por descripcion"              
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="d-flex justify-content-center">
            <select className="form-select dropdown"
            name="ddlProyecto"
            id="ddlProyecto"
           value={selectedProyecto}
            onChange={handleProyectoChange}
            >
        <option value="All">Filtrar por Proyecto</option>
      {ProyectosList.map((item,index) => {
        return (
          <option value={item.p_id} key={item.p_id}>{item.nombre}</option>
        )
      })}
      </select>
      <select className="form-select dropdown"
            name="ddlUsuario"
            id="ddlUsuario"
           value={selectedUsuario}
            onChange={handleUsuarioChange}
            >
        <option value="All">Filtrar por Usuario (Asignada a)</option>
      {UsuariosList.map((item,index) => {
        return (
          <option value={item.id} key={item.id}>{item.nombre}</option>
        )
      })}
      </select>
      <button className="btn btn-primary btn-sm"
      onClick={handleFilterClick}
      >Filtrar</button>
      </div>
            <button type="button" className="btn btn-sm btn-warning shadow-sm" data-bs-toggle="modal" data-bs-target="#addTareaForm"><i className='fas fa-circle-plus p-1 pr-10'></i> Agregar Tarea</button>
            </div>
            <div className="body mt-4">
<div className="tableContainer">
<table className="table table-responsive table-hover">
  <thead className="thead-dark">
          <tr>            
            <th style={{width:"180px"}}>Proyecto</th>
            <th style={{width:"380px"}}>Descripcion</th>
            <th style={{width:"180px"}}>Asignada Por</th>
            <th style={{width:"180px"}}>Asignada A</th>
            <th style={{width:"150px"}}>Fecha/Hora Asignacion</th>
            <th style={{width:"150px"}}>Estado</th>
            <th style={{width:"80px",textAlign:"center"}}>Accion</th>
          </tr>
  </thead>
  <tbody>
  {
  <ListarTareas
  //nameFilter={searchQuery}
  tareas={search(filteredList)}
  userRole={auth().role}
  handleViewTarea={handleViewTarea}
  handleEditTareaForm={handleEditTareaForm}
  handleDelete={handleDelete}
   />
    }
  </tbody>
    </table>
    </div>
    <div className="clearfix">
        <div className="hint-text">Total Registros: <b>{Tareas.length}</b> </div>
    </div>
    {/* <Pagination pages = {totalPagesNum}
                setCurrentPage={setCurrentPage}
                currentRecords ={search(currentProyectos)}
                sortedRecords = {Proyectos} /> */}
  </div>
        </div>
        </div>
   {/* Add Tarea Modal Begin*/}
    <div className="modal fade" id="addTareaForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <form onSubmit={handleAddTarea}>
        <div className="modal-content">
          <div className="modal-header primary">
          <h2 className="modal-title">Crear Tarea</h2>
          </div>
          <div className="modal-body">
         
            <div className="row ml-4 mr-4 mb-4">
            <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="proyecto" className="form-label">Proyecto</label>
              <select className="form-select dropdown"
            name="dllProyectos"
            id="dllProyectos"
            onChange={handleChange("p_id")}
            >
         <option value="All">Seleccione un Proyecto</option>
      {ProyectosList.map((item,index) => {
        return (
          <option value={item.p_id} key={item.p_id}>{item.nombre}</option>
        )
      })}
      </select>
            </div>
            </div>
            <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="descripcion" className="form-label">Descripcion</label>
              <input type="text" name="descripcion" id="descripcion" required className="form-control textbox" placeholder="Descripcion de la Tarea" aria-describedby="helpId"
              onChange={handleChange("descripcion")}>
              </input>
            </div>
            </div>
            </div>

            <div className="row ml-4 mr-4 mb-4">
            <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="" className="form-label">Asignada Por:</label>
              <select className="form-select dropdown"
            name=""
            id=""
            onChange={handleChange("asignadapor")}
            >
       <option value="All">Seleccione un Usuario</option>
      {UsuariosAll.map((item,index) => {
        return (
          <option value={item.id} key={item.id}>{item.nombre}</option>
        )
      })}
      </select>
            </div>
            </div>
            <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="" className="form-label">Asignada A:</label>
              <select className="form-select dropdown"
            name=""
            id=""
            onChange={handleChange("asignadaa")}
            >
       <option value="All">Seleccione un Usuario</option>
      {UsuariosAll.map((item,index) => {
        return (
          <option value={item.id} key={item.id}>{item.nombre}</option>
        )
      })}
      </select>
            </div>
            </div>
            </div>
        
            <div className="row ml-4 mr-4 mb-4">
            <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="" className="form-label">Estado</label>
            <select className="form-select dropdown"
            name="estado"
            id="estado"
     
            onChange={handleChange("estado")}
            >
        <option value="Asignada">Asignada</option>

      </select>
            </div>  
            </div>
            <div className="col-md-9">
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
    {/* Add Tarea Modal End*/}
{/* Edit Tarea Modal Begin*/}
    <div className="modal fade" id="editTareaForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <form onSubmit={handleFormSave}>
        <div className="modal-content">
          <div className="modal-header primary">
          <h2 className="modal-title">Editar Tarea</h2>
          </div>
          <div className="modal-body">
          <div className="row ml-4 mr-4 mb-4">
            <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="proyecto" className="form-label">Proyecto</label>
              <select className="form-select dropdown"
            name="dllProyectos"
            id="dllProyectos"
            value={editFormData.p_id}
            onChange={handleEditFormClick("p_id")}
            >
         <option value="All">Seleccione un Proyecto</option>
      {ProyectosList.map((item,index) => {
        return (
          <option value={item.p_id} key={item.p_id}>{item.nombre}</option>
        )
      })}
      </select>
            </div>
            </div>
            <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="descripcion" className="form-label">Descripcion</label>
              <input type="text" name="descripcion" id="descripcion" required className="form-control textbox" placeholder="Descripcion de la Tarea" aria-describedby="helpId"
              value={editFormData.descripcion}
              onChange={handleEditFormClick("descripcion")}>
              </input>
            </div>
            </div>
            </div>

            <div className="row ml-4 mr-4 mb-4">
            <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="" className="form-label">Asignada Por:</label>
              <select className="form-select dropdown"
            name=""
            id=""
            value={editFormData.asignadapor}
            onChange={handleEditFormClick("asignadapor")}
            >
       {/* <option value="All">Seleccione un Usuario</option> */}
      {UsuariosAll.map((item,index) => {
        return (
          <option value={item.id} key={item.id}>{item.nombre}</option>
        )
      })}
      </select>
            </div>
            </div>
            <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="" className="form-label">Asignada A:</label>
              <select className="form-select dropdown"
            name=""
            id=""
           value={editFormData.asignadaa}
            onChange={handleEditFormClick("asignadaa")}
            >
       {/* <option value="All">Seleccione un Usuario</option> */}
      {UsuariosAll.map((item,index) => {
        return (
          <option value={item.id} key={item.id}>{item.nombre}</option>
        )
      })}
      </select>
            </div>
            </div>
            </div>
        
            <div className="row ml-4 mr-4 mb-4">
            <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="" className="form-label">Estado</label>
            <select className="form-select dropdown"
            name="estado"
            id="estado"
            value={editFormData.estado}
            onChange={handleEditFormClick("estado")}
            >
        <option value="Asignada">Asignada</option>
        <option value="En-Proceso">En-Proceso</option>
        <option value="Pendiente">Pendiente</option>
        <option value="Ejecutada">Ejecutada</option>
      </select>
            </div>  
            </div>
            <div className="col-md-9">
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
{/* Edit Tarea Modal End*/}
{/* View Tarea Modal Begin*/}
<div className="modal fade" id="ViewTareaForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-xl">
  <div className="modal-content" style={{height:"800px"}}>
    <div className="modal-header primary">
       <h2 className="modal-title">Detalles de la Tarea</h2>
    </div>
    <div className="modal-body">
      <div className="template">
        <div className="row mt-4">
          <div className="col-lg-4">
            <div className="card shadow">
            <div className="card-body">
            <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Tarea ID:</b> {ViewFormData.t_id}</div>
            <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Proyecto:</b> {ViewFormData.proyecto}</div>
            <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Descripcion:</b> {ViewFormData.descripcion}</div>
          <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Asignada Por:</b> {ViewFormData.asignadapor}</div>
          <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Asignada A:</b> {ViewFormData.asignadaa}</div>
          <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Fecha Asignacion:</b> {moment(ViewFormData.fechaasignada).format('YYYY-MM-DD HH:mm')}</div>
          <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Estado:</b>
          <span className={ViewFormData.estado==='En-Proceso' ? "label label-success" : ViewFormData.estado==='Asignada' ? "label label-info" : 
    ViewFormData.estado==='Pendiente' ? "label label-warning" : "label label-dark"}>{ViewFormData.estado}</span>
           </div>
          {/* <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Notas:</b> {ViewFormData.notas}</div> */}
          </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card shadow">
              <form onSubmit={handleAddTareaNotas}>
                <div className="d-sm-flex align-items-center justify-content-around card-header">
                <h2 className="mb-0 text-gray-800">Seguimiento</h2>
                <input className="form-control" value={seguimientoNota} onChange={(e)=>setSeguimientoNota(e.target.value)} required type="text" name="tarea_notas"/>
                <button type="submit" className="btn btn-primary btn-sm" name="save">Guardar</button>
                </div>
              </form>
            </div>
 
            {<ListarTareaNotas
            tareanotas={seguimientoNotas}/>}
          </div>
        </div>
      </div>
    </div>
    <div className="modal-footer">
    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
    </div>
  </div>
  </div>
</div>
{/* View Mantenimiento Modal End*/}
    </div>
    </>
  )
}

export default Tareas
