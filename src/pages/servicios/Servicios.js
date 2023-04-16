import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
//import { useNavigate } from 'react-router-dom';
//import Axios from 'axios';
import Axios from '../../api/axios';
//import { axiosPrivate } from '../../api/axios';
import ListarServicios from './ListarServicios';
//import AuthContext from '../../context/AuthProvider';
//import Pagination from '../../components/Pagination';
const Servicios = () => {

const [Servicios, setServicios] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
//const [errMsg, setErrMsg] = useState('');
//const [successMsg, setSuccessMsg] = useState('');
//const errRef = useRef();
//const successRef = useRef();
//const [nombre, setNombre] = useState("");
//const { auth } = useContext(AuthContext);
const [addServicio, setAddServicio] = useState({
    nombre: ''
});
//Get Servicio ID
//const [editServicioId, setEditServicioId] = useState(null);
//let navigate = useNavigate();

const [editFormData, setEditFormData] = useState({
    s_id: '',
    nombre: ''
});

// const [currentPage, setCurrentPage] = useState(1);
// const [PerPage] = useState(15);

const handleChange = (input) => (e) => {
e.preventDefault();
setAddServicio({...addServicio,[input]: e.target.value});
}

const handleEditServicioForm = (e, servicio) => {
    e.preventDefault();
   // setEditServicioId(servicio.s_id);
    const formValues = {
        s_id : servicio.s_id,
        nombre : servicio.nombre
    }
    setEditFormData(formValues);
}

const handleEditFormClick = (input) => (e) => {
  e.preventDefault();
  setEditFormData({...editFormData, [input]: e.target.value });
}

const handleFormSave = (e) => {
  e.preventDefault();

try {
    const editServicio = {
    s_id: editFormData.s_id
}

//Axios.put(`http://localhost:3005/api/servicios/editarServicio/${editServicio.s_id}`,{
  Axios.put(`/servicios/editarServicio/${editServicio.s_id}`,{
    s_id:editFormData.s_id,
    nombre:editFormData.nombre
  }).then((response)=>{
    if(response?.status === 200) {
      //setSuccessMsg("Servicio ha sido Modificado!");
      Swal.fire({
        icon:'success',
        title: 'Rregistro ha sido Modificado',
        timer : 2000,
        showConfirmButton: false,
        timerProgressBar:true,
        position: 'top',
        heightAuto: false,
        toast: true
      })
      //setErrMsg("");
      loadServicios();
    }
    
  })
} catch (error) {
Swal.fire({
  icon:'error',
  title: 'Registro NO fue Modificado',
  timer : 2000,
  showConfirmButton: false,
  timerProgressBar:true,
  position: 'top',
  toast: true,
  text: 'Error : ' + error
})
//setSuccessMsg("");
}
}

const handleAddServicio = (e) => {
    e.preventDefault();
    const newServicio = {
        nombre : addServicio.nombre
    }

   // const newServicios = [...Servicios, newServicio];
    //Axios.post('http://localhost:3005/api/AddServicio',{
      Axios.post('/AddServicio',{
        nombre: newServicio.nombre
      }).then(()=>{

      loadServicios();
    
      })
}


const handleDelete = (e, servicio) => {
  e.preventDefault();
  
try {
  Swal.fire({
    icon:'warning',
    title: 'Esta seguro de querer Inactivar este Registro?',
    showConfirmButton: true,
    confirmButtonText: 'Si',
    showDenyButton : true,
    position: 'top',
  }).then((response)=>{
    if(response.isConfirmed){
      Axios.delete(`/servicios/borrarServicio/${servicio.s_id}`,{

      }).then(()=>{
       loadServicios();
   
      })
    }

  })

} catch (error) {
  Swal.fire({
  icon:'error',
  title: 'Registro NO fue Inactivado',
  showConfirmButton: true,
  position: 'top',
  toast: true,
  text: 'Error : ' + error
})

}



  
}

const loadServicios = async () => {
    //const response = await Axios.get('http://localhost:3005/api/servicios');
    const response = await Axios.get('/servicios');
    setServicios(response.data);
  };


//const fetchUrl = "http://localhost:3005/api/servicios";
const fetchUrl = process.env.REACT_APP_API_URL+"/servicios";

useEffect(() => {
  async function fetchData(){
      const data = await Axios.get(fetchUrl);
      setServicios(data.data);
      return data
  }
  fetchData();
  },[fetchUrl]);

function search() {
 return Servicios.filter(row=>row.nombre.toLowerCase().indexOf(searchQuery) > - 1);
}
    
  return (
    <>

<div className="template">
<div className='container'>

<div className="card">
  <div className="card-header">
  <h2 className="mb-2 mt-2">Servicios</h2>
  </div>
  <div className="card-body">
  {/* {errMsg !== "" ? (<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>)
   : <p ref={successRef} className={successMsg ? "successmsg" : "offscreen"} aria-live="assertive">{successMsg}</p>} */}
  
  <div className="d-sm-flex align-items-center justify-content-between">
               <input
              type="text"
              className="form-control searchbox"
              placeholder="Buscar por Nombre"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
             <button type="button" className="btn btn-sm btn-warning shadow-sm" data-bs-toggle="modal" data-bs-target="#addServicioForm"><i className='fas fa-circle-plus pr-10'></i>
             Agregar Servicio
            </button>
  </div>
  <div className="body mt-4">
  <div className="tableContainer">
 <table className="table table-responsive table-hover">
  <thead className="thead-dark">
          <tr>
            <th style={{width:"80%"}}>Servicio</th>
            <th style={{width:"20%",textAlign:"center"}}>Accion</th>
          </tr>
  </thead>
  <tbody>

<ListarServicios
//nameFilter={searchQuery}
servicios={search(Servicios)}
handleEditServicioForm={handleEditServicioForm}
handleDelete={handleDelete}
/>
</tbody>
</table>
</div>
<div className="clearfix">
  <div className="hint-text">Total Registros: <b>{Servicios.length}</b> </div>
</div>
{/* <Pagination pages = {totalPagesNum}
                setCurrentPage={setCurrentPage}
                currentRecords ={search(currentServicios)}
                sortedRecords = {Servicios} /> */}
</div>
</div>
</div>
{/* Add Servicio Modal Begin*/}
<div className="modal fade" id="addServicioForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
   <div className="modal-dialog">
   <form onSubmit={handleAddServicio}>
     <div className="modal-content">
       <div className="modal-header primary">
         <h2 className="modal-title">Agregar Servicio</h2>
         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
       </div>
       <div className="modal-body">
            
            <div className="row ml-4 mr-4">
            <div className="col">
            <div className="form-group">
              <label htmlFor="nombre" className="form-label">Nombre del Servicio</label>
              <input
              type="text"
              name="nombre"
              required
              className="form-control textbox"
              placeholder="Nombre del Servicio"
              aria-describedby="helpId"
              onChange={handleChange("nombre")}
              >
              </input>
            </div>
            </div>
            </div>
            <div className="modal-footer">
  
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
         <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
          </div>
            
          </div>
     </div>
     </form>
   </div>
 </div>
{/* Add Servicio Modal Begin*/}
{/* Edit Servicio Modal Begin*/}
<div className="modal fade" id="editServicioForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
   <div className="modal-dialog">
     <div className="modal-content">
       <div className="modal-header primary">
         <h1 className="modal-title fs-5" id="staticBackdropLabel">Editar Servicio</h1>
         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
       </div>
       <div className="modal-body">
            <form onSubmit={handleFormSave}>
            <div className="row ml-4 mr-4">
            <div className="col">
            <div className="form-group">
              <input
              type="hidden"
              name= "s_id"
              value={editFormData.s_id}
              className="form-control"
              >
              </input>
              <label htmlFor="nombre" className="form-label">Nombre del Servicio</label>
              <input
              type="text"
              name="nombre"
              value={editFormData.nombre}
              required
              className="form-control"
              placeholder="Nombre del Servicio"
              aria-describedby="helpId"
              onChange={handleEditFormClick("nombre")}
              >
              </input>
            </div>
            </div>
            </div>
            <div className="modal-footer d-block">
  
            <button type="button" className="btn btn-warning float-start" data-bs-dismiss="modal">Cancelar</button>
         <button type="submit" className="btn btn-primary float-end" data-bs-dismiss="modal">Actualizar</button>
          </div>
            </form>
          </div>
     </div>
   </div>
 </div>
{/* Edit Servicio Modal End*/}
 </div>
 </div>   

    </>
  );
}

export default Servicios