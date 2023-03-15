import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ListarProyectos from './ListarProyectos';
//import AuthContext from '../../context/AuthProvider';
//import { useNavigate } from 'react-router-dom';
const Proyectos = () => {
const [Proyectos, setProyectos] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
//const { auth } = useContext(AuthContext);
//  const [currentPage, setCurrentPage] = useState(1);
//  const [perPage, setPerPage] = useState(8);

//let navigate = useNavigate();
const axiosInstace = Axios.create({baseURL:process.env.REACT_APP_API_URL});

const [addProyecto, setAddProyecto] = useState({
    nombre: '',
    nit: '',
    direccion: '',
    ciudad: '',
    telefono: '',
    cuentasbancos: '', 
    email: '',
    claveemail: '',
    fechainicio: '', 
    fechavence: ''
});

const handleChange = (input) => (e) => {
    e.preventDefault();
    setAddProyecto({...addProyecto,[input]: e.target.value});
}

const handleAddProyecto = (e) => {
    e.preventDefault();
    const newProyecto = {
        nombre : addProyecto.nombre,
        nit: addProyecto.nit,
        direccion: addProyecto.direccion,
        ciudad: addProyecto.ciudad,
        telefono: addProyecto.telefono,
        cuentasbancos: addProyecto.cuentasbancos, 
        email: addProyecto.email,
        claveemail: addProyecto.claveemail,
        fechainicio: addProyecto.fechainicio, 
        fechavence: addProyecto.fechavence
    }

    Axios.post('http://localhost:3005/api/AddProyecto',{
        nombre: newProyecto.nombre,
        nit: newProyecto.nit,
        direccion: newProyecto.direccion,
        ciudad: newProyecto.ciudad,
        telefono: newProyecto.telefono,
        cuentasbancos: newProyecto.cuentasbancos, 
        email: newProyecto.email,
        claveemail: newProyecto.claveemail,
        fechainicio: newProyecto.fechainicio, 
        fechavence: newProyecto.fechavence
      }).then(()=>{

        loadProyectos();
    
      })
}

const handleDelete = (e, proyecto) => {
    e.preventDefault();
    
    if(window.confirm('Esta seguro de querer Eliminar este Registro?')){
  
     Axios.delete(`http://localhost:3005/api/proyectos/borrarProyecto/${proyecto.p_id}`,{
  
     }).then(()=>{
      loadProyectos();
  
     })
    }
  }

  const loadProyectos = async () => {
    //const response = await Axios.get('http://localhost:3005/api/proyectos');
    const response = await axiosInstace.get('/proyectos');
     setProyectos(response.data);
  };

  function search() {
    return Proyectos.filter(row=>row.nombre.toLowerCase().indexOf(searchQuery) > - 1);
  }

  const fetchUrl = "http://localhost:3005/api/proyectos";

  useEffect(() => {
    async function fetchData(){
        const response = await Axios.get(fetchUrl);
        setProyectos(response.data);
        return response
    }
    fetchData();
    },[fetchUrl]);

return (
<>
<div className="template">
<div className="card">
<div className="card-header">
<h2 className="mb-2 mt-2">Proyectos</h2>
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
            <button type="button" className="btn btn-sm btn-warning shadow-sm" data-bs-toggle="modal" data-bs-target="#addProyectoForm"><i className='fas fa-circle-plus p-1 pr-10'></i> Agregar Proyecto</button>
</div>
<div className="body mt-4">
<div className="tableContainer">
<table className="table table-responsive table-hover">
  <thead className="thead-dark">
          <tr>
            
            <th style={{width:"200px"}}>Proyecto</th>
            <th style={{width:"180px"}}>NIT</th>
            <th style={{width:"250px"}}>Direccion</th>
            <th style={{width:"180px"}}>Ciudad</th>
            <th style={{width:"150px"}}>Telefono</th>
            <th style={{width:"180px"}}>Email</th>
            <th style={{width:"100px"}}>Clave Email</th>
            <th style={{width:"130px"}}>Fecha Inicio</th>
            <th style={{width:"130px"}}>Fecha Vencimiento</th>
            <th style={{width:"100px",textAlign:"center"}}>Accion</th>
          </tr>
  </thead>
  <tbody>
  {
  <ListarProyectos
  //nameFilter={searchQuery}
  proyectos={search(Proyectos)}
  handleDelete={handleDelete}
   />
    }
  </tbody>
    </table>
    </div>
    <div className="clearfix">
        <div className="hint-text">Total Registros: <b>{Proyectos.length}</b> </div>
    </div>
    {/* <Pagination pages = {totalPagesNum}
                setCurrentPage={setCurrentPage}
                currentRecords ={search(currentProyectos)}
                sortedRecords = {Proyectos} /> */}
  </div>
</div>
</div>
    {/* Add Proyecto Modal Begin*/}
    <div className="modal fade" id="addProyectoForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <form onSubmit={handleAddProyecto}>
        <div className="modal-content">
          <div className="modal-header primary">
          <h2 className="modal-title">Crear Proyecto</h2>
          </div>
          <div className="modal-body">
         
            <div className="row ml-4 mr-4 mb-4">
            <div className="col">
            <div className="form-group">
              <label htmlFor="nombre" className="form-label">Nombre del Proyecto</label>
              <input type="text" name="nombre" id="nombre" required className="form-control textbox" placeholder="Nombre del Proyecto" aria-describedby="helpId"              
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
              <label htmlFor="" className="form-label">Direccion</label>
              <input type="text" name="direccion" id="direccion" required  className="form-control textbox" placeholder="Direccion del Proyecto" aria-describedby="helpId"
              onChange={handleChange("direccion")}
              ></input>
            </div>
            </div>
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Ciudad</label>
              {/* <input type="text" name="ciudad" id="ciudad" required  className="form-control textbox" placeholder="Ciudad" aria-describedby="helpId"
              onChange={handleChange("ciudad")}></input> */}
            <select className="form-select dropdown"
            name="ciudad"
            id="ciudad"
            //value={selectedServicio}
            
            onChange={handleChange("ciudad")}
            >
            <option value={''}>Seleccione una Ciudad</option>  
            <option value={'Bogota'}>Bogota</option>
            <option value={'Cali'}>Cali</option>
            <option value={'Medellin'}>Medellin</option>
            </select>
            </div>
            </div>
            </div>
        
           <div className="row ml-4 mr-4 mb-4">
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Telefono</label>
              <input type="text" name="telefono" id="telefono" required className="form-control textbox" placeholder="Telefono de Contacto" aria-describedby="helpId"
              onChange={handleChange("telefono")}
              ></input>
            </div>
            </div>
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Cuentas Bancos</label>
              <input type="text" name="cuentasbancos"  id="cuentasbancos" required className="form-control textbox" placeholder="Cuentas Bancos" aria-describedby="helpId"
              onChange={handleChange("cuentasbancos")}
              ></input>
            </div>  
            </div>
            </div>
            <div className="row ml-4 mr-4 mb-4">
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Email</label>
              <input type="email" name="email" id="email" required className="form-control textbox" placeholder="Email del Proyecto" aria-describedby="helpId"
              onChange={handleChange("email")}></input>
            </div>  
            </div>
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Clave Email</label>
              <input type="password" name="claveemail" id="claveemail" required className="form-control textbox" placeholder="Clave de Email" aria-describedby="helpId"
              onChange={handleChange("claveemail")}
              ></input>
            </div>
            </div>
            </div>
            <br/>
            <div className="row ml-4 mr-4 mb-4">
            <div className="col">
            <div className="form-group">
              <label htmlFor="" className="form-label">Fecha Inicio Contrato</label>
              <input type="date" name="fechainicio" id="fechainicio" required className="form-control textbox" placeholder="Entre la fecha de Inicio del Contrato" aria-describedby="helpId"
              onChange={handleChange("fechainicio")}
              ></input>
            </div>
            </div>
            <div className="col">
            <div className="form-group">
            <label htmlFor="" className="form-label">Fecha Vencimiento Contrato</label>
            <input type="date" name="fechavence" id="fechavence" required className="form-control textbox" placeholder="Entre la fecha de Vencimiento del Contrato" aria-describedby="helpId"
            onChange={handleChange("fechavence")}
            ></input>
            </div>

            </div>
            </div>
          

          </div>
          <div className="modal-footer">
  
  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
<button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
</div>
        </div>
        </form>
      </div>
    </div>
    {/* Add Proyecto Modal End*/}
    </div>
  
</>
  )
}

export default Proyectos