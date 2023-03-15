import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
import ListarProveedoresProyecto from './ListarProveedoresProyecto';

const VerProyecto = () => {

  const [Proyecto, setProyecto] = useState([]);
  const [Proveedores, setProveedores] = useState([]);
  const [ListProveedores, setListProveedores] = useState([]);
  const [Servicio, setServicio] = useState([]);
  const [selectedProveedor, setSelectedProveedor] = useState([]);
  const [btnAddProveedorVisible, setbtnAddProveedorVisible] = useState(false);
  
  let { id } = useParams();

  const loadProyecto = async () => {
    const response = await Axios.get(`http://localhost:3005/api/proyectos/byId/${id}`);
     setProyecto(...response.data);
     
  };

  const [addProveedorProyecto, setAddProveedorProyecto] = useState({
    p_id : '',
    pv_id: '',
    fechainicio: '',
    fechavence: '',
    periodicidad: ''
});

  const [editFormData, setEditFormData] = useState({
    pp_id : '',
    pv_id : '',
    servicio : '',
    fechainicio : '',
    fechavence : '',
    periodicidad : ''
  });

  const getServicio = async (e) => {
    //setSelectedProveedor(e.target.value);
    //if(input==="pv_id"){
      let pv_id = e.target.value;
      const response = await Axios.get(`http://localhost:3005/api/proveedores/getServiciobypv_id/${pv_id}`)
      setServicio(...response.data);
      setSelectedProveedor(e.target.value);
      //console.log(Servicio.servicio);


      //setEditFormData({...editFormData,['servicio']:Servicio.servicio});
      //console.log(Servicio);  
    //}
    
  }

  const handleChange = (input) => (e) => {
    e.preventDefault();
    setAddProveedorProyecto({...addProveedorProyecto,[input]: e.target.value});
}

  const handleEditFormClick = (input) => (e) => {
    e.preventDefault();
    setEditFormData({...editFormData, [input]: e.target.value });
  }

  const handleFormSave = (e) => {
    e.preventDefault();
      const editProyectoProveedor = {
      pp_id: editFormData.pp_id
  }
  
  Axios.put(`http://localhost:3005/api/proyectos/editarProyectoProveedor/${editProyectoProveedor.pp_id}`,{
    pp_id:editFormData.pp_id,
    pv_id:editFormData.pv_id,
    periodicidad:editFormData.periodicidad,
    fechainicio:editFormData.fechainicio,
    fechavence:editFormData.fechavence
  }).then((response)=>{
  
    //loadProveedores();
    loadProveedores();
  
  })
  
  }

  const handleAddProveedorProyecto = (e) => {
    e.preventDefault();
    const newProveedorProyecto = {
      p_id : id,
      pv_id : selectedProveedor,
      fechainicio : addProveedorProyecto.fechainicio,
      fechavence : addProveedorProyecto.fechavence,
      periodicidad : addProveedorProyecto.periodicidad
    }

    Axios.post('http://localhost:3005/api/proveedores/AddProveedorProyecto',{
        p_id : newProveedorProyecto.p_id,
        pv_id: newProveedorProyecto.pv_id,
        fechainicio: newProveedorProyecto.fechainicio,
        fechavence : newProveedorProyecto.fechavence,
        periodicidad : newProveedorProyecto.periodicidad,
        
      }).then(()=>{

     loadProveedores();
    
      })
setAddProveedorProyecto();

}

  const handleEditProyectoProveedorForm = (e, proyectoproveedor) => {
    e.preventDefault();
   //console.log(proyectoproveedor);
    const formValues = {
        pp_id : proyectoproveedor.pp_id,
        pv_id : proyectoproveedor.pv_id,
        servicio : proyectoproveedor.servicio,
        periodicidad : proyectoproveedor.periodicidad,
        fechainicio : proyectoproveedor.fechainicio,
        fechavence : proyectoproveedor.fechavence
    }
    //console.log(formValues.servicio);
    setEditFormData(formValues);
    //setSelectedProveedor(formValues.pv_id);
    //setServicio(formValues.servicio);
    //console.log(Servicio.servicio);
}

// const isbtnVisible = () => {
//   setbtnAddProveedorVisible(!btnAddProveedorVisible);
// }


  const loadProveedores = async () => {
    const response = await Axios.get(`http://localhost:3005/api/proyectos/assignedProveedores/${id}`);
     setProveedores(response.data);
     loadListProveedores();
     setbtnAddProveedorVisible(true);
     // console.log(response.data);
  };

  const loadListProveedores = async () => {
    const response = await Axios.get('http://localhost:3005/api/proveedores/list');
    setListProveedores(response.data);
  };

  useEffect(() => {
    loadProyecto();
    //loadListProveedores();
    //setLabelFecha();
 });

  return (
    <>
    <div className="template">
    <div className="card">
      <div className="card-header">
      <h2 className="mb-2 mt-2"> Detalles del Proyecto</h2>
      </div>
      <div className="card-body">
        <div className="d-sm-flex align-items-center justify-content-between">
        <Link to={'/proyectos'} className="d-none d-sm-inline-block btn btn-sm btn-info shadow-sm">{'<<'}Regresar</Link>
        {btnAddProveedorVisible===true ? (<button className="d-none d-sm-inline-block btn btn-sm btn-warning shadow-sm" data-bs-toggle="modal" data-bs-target="#addProveedorProyectoForm">Asignar Proveedores</button>) : '' }
         {/* <button className="d-none d-sm-inline-block btn btn-sm btn-warning shadow-sm" data-bs-toggle="modal" data-bs-target="#addProveedorProyectoForm">Asignar Proveedores</button>  */}
        <Link to={`/proyectos/editar/${id}`} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Editar Proyecto</Link>
        </div>
  <nav className="mt-4">
  <div className="nav nav-tabs" id="nav-tab" role="tablist">
    <button className="nav-link active" id="nav-info-tab" data-bs-toggle="tab" data-bs-target="#nav-info" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Informacion General</button>
    <button className="nav-link" id="nav-profile-tab" onClick={loadProveedores} data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Proveedores</button>
    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Tareas</button>
    <button className="nav-link" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-propietarios" type="button" role="tab" aria-controls="nav-propietarios" aria-selected="false">Propietarios</button>
  </div>
</nav>
<div className="tab-content" id="nav-tabContent">
  <div className="tab-pane fade show active" id="nav-info" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
  <div className="row">
      <div className="col-xl-6 col-md-3">
        <div className="card shadow">
          <div className="card-body">
          <div className="text-xs font-weight-bold text-primary mb-1"><h2>{Proyecto.nombre}</h2></div>
          <hr></hr>
          <div className="h5 font-weight-bold text-gray-800 mb-4"><b>NIT:</b> {Proyecto.nit}</div>
          <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Direccion:</b> {Proyecto.direccion}</div>
          <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Ciudad:</b> {Proyecto.ciudad}</div>
          <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Telefono:</b> {Proyecto.telefono}</div>
          <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Email:</b> {Proyecto.email}</div>
          <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Clave Email:</b> {Proyecto.claveemail}</div>
          <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Cuentas Bancos:</b> {Proyecto.cuentasbancos}</div>
          <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Fecha Inicio:</b> {moment(Proyecto.fechainicio).format('YYYY-MM-DD')}</div>
          <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Fecha Vencimiento:</b> <span className={Proyecto.daysleft >= 30 ? "label label-success" : Proyecto.daysleft < 29 && Proyecto.daysleft > 14 ? "label label-warning" :           
        "label label-danger"}>{moment(Proyecto.fechavence).format('YYYY-MM-DD')}</span></div>
        </div>
        </div>
        </div>
        <div className="col-xl-6 col-md-3">
        <div className="card shadow">
          <div className="card-body">
          <div className="text-xs font-weight-bold text-primary mb-1"><h2>P. Juridica</h2></div>
          <hr></hr>
          <div className="h5 mb-0 font-weight-bold text-gray-800 mb-3"><b>Matricula:</b> {Proyecto.matricula}</div>
          <div className="h5 mb-0 font-weight-bold text-gray-800 mb-3"><b>Fecha Matricula:</b> {moment(Proyecto.fechamatricula).format('YYYY-MM-DD')}</div>
          <div className="h5 mb-0 font-weight-bold text-gray-800 mb-3"><b>Numero Escritura Publica:</b> {Proyecto.numescritura}</div>
          <div className="h5 mb-0 font-weight-bold text-gray-800 mb-3"><b>Fecha Escritura:</b> {moment(Proyecto.fechaescriturapublica).format('YYYY-MM-DD')}</div>
          <div className="h5 mb-0 font-weight-bold text-gray-800 mb-3"><b>Numero Folio:</b> {Proyecto.numfolios}</div>
          <div className="h5 mb-0 font-weight-bold text-gray-800 mb-3"><b>Notaria:</b> {Proyecto.notaria}</div>
          <div className="h5 mb-0 font-weight-bold text-gray-800 mb-3"><b>Tipo de Propiedad:</b> {Proyecto.tipopropiedad}</div>
          <div className="h5 mb-0 font-weight-bold text-gray-800 mb-3"><b>Localidad:</b> {Proyecto.localidad}</div>
          <div className="h5 mb-0 font-weight-bold text-gray-800 mb-3"><b>Barrio:</b> {Proyecto.barrio}</div>
          <div className="h5 mb-0 font-weight-bold text-gray-800 mb-3"><b>Estrato:</b> {Proyecto.estrato}</div>
          <div className="h5 mb-0 font-weight-bold text-gray-800 mb-3"><b>Nombre del Edificio:</b> {Proyecto.nombreedificio}</div>
        </div>
        </div>
        </div>
      </div>
    </div>
  <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
  <div className="card shadow">
          <div className="card-body">
          <table className="table table-hover">
          <thead className="thead-light">
            <th style={{width:"200px"}}>Proveedor</th>
            <th style={{width:"180px"}}>Servicio</th>
            <th style={{width:"250px"}}>Contacto</th>
            <th style={{width:"180px"}}>Email</th>
            <th style={{width:"150px"}}>Telefono</th>
            <th style={{width:"180px"}}>Periodicidad</th>
            <th style={{width:"130px"}}>Fecha Inicio Contrato</th>
            <th style={{width:"130px"}}>Fecha Fin Contrato</th>
            <th style={{width:"60px"}}>Accion</th>
          </thead>
          <tbody>
            {<ListarProveedoresProyecto
            proveedoresproyecto={Proveedores}
            handleEditProyectoProveedorForm={handleEditProyectoProveedorForm}        
            />}
          </tbody>
        </table>
          </div>
   </div>       
  </div>
  <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex="0">
  </div>
  <div className="tab-pane fade" id="nav-propietarios" role="tabpanel" aria-labelledby="nav-disabled-tab" tabIndex="0">
    propietarios
  </div>
</div>
</div>
</div>
{/* Add Proveedor/Proyecto Modal Begin*/}
<div className="modal fade" id="addProveedorProyectoForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-md" style={{width:"400px"}}>
        <form onSubmit={handleAddProveedorProyecto}>
        <div className="modal-content">
          <div className="modal-header primary">
          <h2 className="modal-title">Agregar Proveedor (Contrato)</h2>
          </div>
          <div className="modal-body">

          <div className="row ml-4 mr-4">
          <div className="form-group mb-3">
          <label htmlFor="" className="form-label">Proveedor</label>
          <select className="form-select dropdown"
            name="pv_id"
            onChange={(e)=>getServicio(e)}
            >
      {ListProveedores.map((item,index) => {
        return (
          <option value={item.pv_id} key={item.pv_id}>{item.nombre}</option>
        )
      })}
      </select>
          </div>
          <div className="form-group mb-3">
          <label htmlFor="" className="form-label">Servicio</label>
          <input type="text"
          style={{width:"370px"}}
          className="form-control"
          disabled
          value={Servicio.servicio==="" ? '' : Servicio.servicio}
          >
          </input>
          </div>

          <div className="form-group mb-3">
                <label htmlFor="" className="form-label">Fecha Inicio Contrato</label>
              <input type="date"
              style={{width:"370px"}}
              name="fechainicio"
              className="form-control"            
              onChange={handleChange("fechainicio")}
              ></input>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="" className="form-label">Fecha Vencimiento Contrato</label>
                <input type="date"
                style={{width:"370px"}}
                name="fechavence"
                className="form-control"
                onChange={handleChange("fechavence")}
                ></input>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="" className="form-label">Periodicidad: </label>
                <select className="form-select dropdown" name="periodicidad"
                onChange={handleChange("periodicidad")}
                >                  
                    <option value="12">Mensual</option>
                    <option value="6">Bimestral</option>
                    <option value="3">Cada 4 meses</option>
                    <option value="4">Cada 3 meses</option>
                    <option value="2">Semestral</option>
                    <option value="1">Anual</option>
                </select>
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
{/* Add Proveedor/Proyecto Modal End*/}
{/* Edit Proveedor/Proyecto Modal Begin*/}
<div className="modal fade" id="editProveedorProyectoForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-md" style={{width:"400px"}}>
        <form onSubmit={handleFormSave}>
        <div className="modal-content">
          <div className="modal-header primary">
          <h2 className="modal-title">Editar Proveedor (Contrato)</h2>
          </div>
          <div className="modal-body">

          <div className="row ml-4 mr-4">
          <div className="form-group mb-3">
          <label htmlFor="" className="form-label">Proveedor</label>
          <select className="form-select dropdown"
            name="pv_id"
            id="pv_id"
            value={editFormData.pv_id}
            //onChange={(e)=>getServicio(e)}
            onChange={handleEditFormClick("pv_id")}
            >
      {ListProveedores.map((item,index) => {
        return (
          <option value={item.pv_id} key={item.pv_id}>{item.nombre}</option>
        )
      })}
      </select>
          </div>
          <div className="form-group mb-3">
          <label htmlFor="" className="form-label">Servicio</label>
          <input type="text"
          id="servicio"
          style={{width:"370px"}}
          className="form-control"
          disabled
          value={editFormData.servicio}
          >
          </input>
          </div>

          <div className="form-group mb-3">
                <label htmlFor="" className="form-label">Fecha Inicio Contrato</label>
              <input type="date"
              style={{width:"370px"}}
              name="fechainicio"
              className="form-control"
              value={moment(editFormData.fechainicio).format('YYYY-MM-DD')}
              onChange={handleEditFormClick("fechainicio")}
              ></input>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="" className="form-label">Fecha Vencimiento Contrato</label>
                <input type="date"
                style={{width:"370px"}}
                name="fechavence"
                className="form-control"
                value={moment(editFormData.fechavence).format('YYYY-MM-DD')}
                onChange={handleEditFormClick("fechavence")}
                ></input>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="" className="form-label">Periodicidad: </label>
                <select className="form-select dropdown" name="periodicidad"
                value={editFormData.periodicidad}
                onChange={handleEditFormClick("periodicidad")}
                >                  
                    <option value="12">Mensual</option>
                    <option value="6">Bimestral</option>
                    <option value="3">Cada 4 meses</option>
                    <option value="4">Cada 3 meses</option>
                    <option value="2">Semestral</option>
                    <option value="1">Anual</option>
                </select>
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
{/* Edit Proveedor/Proyecto Modal Begin*/}
 
      
</div>
    </>
  )
}

export default VerProyecto