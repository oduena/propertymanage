import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';

const EditarProyecto = () => {

const [Proyecto, setProyecto] = useState([]);

let { id } = useParams();

let navigate = useNavigate();

const [editBasicFormData, setEditBasicFormData] = useState({
    p_id: '',
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

const [editJurFormData, setEditJurFormData] = useState({
    p_id: '',
    matricula: '',
    fechamatricula: '',
    numescritura: '',
    fechaescriturapublica: '',
    numfolios: '',
    notaria: '',
    tipopropiedad: '',
    localidad: '',
    barrio: '',
    estrato: '',
    nombreedificio: ''
});

const loadProyecto = async () => {
    const response = await Axios.get(`http://localhost:3005/api/proyectos/byId/${id}`);
     setProyecto(...response.data);
    //console.log(response.data); 
     handleEditProyectoForm(...response.data);
  };

const handleEditProyectoForm = (response) =>{
//console.log(response);
const formBasicValues = {
    p_id: response.p_id,
    nombre: response.nombre,
    nit: response.nit,
    direccion: response.direccion,
    ciudad: response.ciudad,
    telefono: response.telefono,
    cuentasbancos: response.cuentasbancos,
    email: response.email,
    claveemail: response.claveemail,
    fechainicio: response.fechainicio,
    fechavence: response.fechavence
}
const formJurValues = {
    p_id: response.p_id,
    matricula: response.matricula,
    fechamatricula: response.fechamatricula,
    numescritura: response.numescritura,
    fechaescriturapublica: response.fechaescriturapublica,
    numfolios: response.numfolios,
    notaria: response.notaria,
    tipopropiedad: response.tipopropiedad,
    localidad : response.localidad,
    barrio: response.barrio,
    estrato: response.estrato,
    nombreedificio: response.nombreedificio
}
setEditBasicFormData(formBasicValues);
setEditJurFormData(formJurValues);
}

const handleEditBasicFormClick = (input) => (e) => {
    e.preventDefault();
    setEditBasicFormData({...editBasicFormData, [input]: e.target.value });
}


const handleEditJurFormClick = (input) => (e) => {
    e.preventDefault();
    setEditJurFormData({...editJurFormData, [input]: e.target.value });
}


useEffect(() => {

    loadProyecto();
    
},[]);

//console.log(id);

const handleBasicFormSave = (e) => {
    e.preventDefault();
  
    const editProyecto = {
      p_id: editBasicFormData.p_id
    //  nombre : editFormData.nombre
  }
  
  Axios.put(`http://localhost:3005/api/proyectos/editarProyectoinfobasica/${editProyecto.p_id}`,{
    p_id: editBasicFormData.p_id,
    nombre : editBasicFormData.nombre,
    nit: editBasicFormData.nit,
    direccion: editBasicFormData.direccion,
    ciudad: editBasicFormData.ciudad,
    telefono: editBasicFormData.telefono,
    cuentasbancos: editBasicFormData.cuentasbancos, 
    email: editBasicFormData.email,
    claveemail: editBasicFormData.claveemail,
    fechainicio: editBasicFormData.fechainicio, 
    fechavence: editBasicFormData.fechavence
  }).then((response)=>{

    navigate(`/proyectos/ver/${editProyecto.p_id}`)
  
  })
  
  }

  const handleJurFormSave = (e) => {
    e.preventDefault();
  
    const editProyecto = {
      p_id: editJurFormData.p_id
    //  nombre : editFormData.nombre
  }
  
  Axios.put(`http://localhost:3005/api/proyectos/editarProyectoJur/${editProyecto.p_id}`,{
    p_id: editJurFormData.p_id,
    matricula: editJurFormData.matricula,
    fechamatricula: editJurFormData.fechamatricula,
    numescritura: editJurFormData.numescritura,
    fechaescriturapublica: editJurFormData.fechaescriturapublica,
    numfolios: editJurFormData.numfolios,
    notaria: editJurFormData.notaria,
    tipopropiedad: editJurFormData.tipopropiedad,
    localidad: editJurFormData.localidad,
    barrio: editJurFormData.barrio,
    estrato: editJurFormData.estrato,
    nombreedificio: editJurFormData.nombreedificio
  }).then((response)=>{

    navigate(`/proyectos/ver/${editProyecto.p_id}`)
  
  })
  
  }  
  

  return (
    <>
    <div className="container">
    <div className="template">
    <div className="card">
      <div className="card-header">
      <h2 className="mb-2 mt-2"> Editar Proyecto</h2>
      </div>
      <div className="card-body">
      <nav>
  <div className="nav nav-tabs mb-4" id="nav-tab" role="tablist">
    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-basicinfo" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><h2>Informacion Basica</h2></button>
    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"><h2>Personeria Juridica</h2></button>
  </div>
</nav>
<div className="tab-content" id="nav-tabContent">
  <div className="tab-pane fade show active" id="nav-basicinfo" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">

  <form onSubmit={handleBasicFormSave}>
            <input type="hidden" value={ editBasicFormData.p_id } name="p_id"></input>
           <div className="row ml-4 mr-4 mb-4">
           <div className="col">
           <div className="form-group">
             <label className="form-label">Nombre del Proyecto</label>
             <input type="text" name="nombre" value={ editBasicFormData.nombre } id="nombre" className="form-control" placeholder="Entre el Nombre del Proyecto"
             onChange={handleEditBasicFormClick("nombre")}
             ></input>
           </div>
           </div>
           <div className="col">
           <div className="form-group">
             <label className="form-label">NIT</label>
             <input type="text" name="nit" value={ editBasicFormData.nit } id="nit" className="form-control" placeholder="Nit"
             onChange={handleEditBasicFormClick("nit")}
             ></input>
           </div>
           </div>
       
           </div>
           <div className="row ml-4 mr-4 mb-4">
           <div className="col">
           <div className="form-group">
             <label className="form-label">Direccion</label>
             <input type="text" name="direccion" value={ editBasicFormData.direccion } id="direccion" className="form-control" placeholder="Entre la direccion del Proyecto"
             onChange={handleEditBasicFormClick("direccion")}
             ></input>
           </div>
           </div>
           <div className="col">
           <div className="form-group">
             <label className="form-label">Ciudad</label>
             {/* <input type="text" name="ciudad" value={ editBasicFormData.ciudad } id="ciudad" className="form-control" placeholder="Entre la Ciudad"
             onChange={handleEditBasicFormClick("ciudad")}
             ></input> */}
             <select className="form-select dropdown"
            name="ciudad"
            id="ciudad"
            value={editBasicFormData.ciudad}
            onChange={handleEditBasicFormClick("ciudad")}
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
             <label className="form-label">Telefono</label>
             <input type="text" name="telefono" value={ editBasicFormData.telefono } id="telefono" className="form-control" placeholder="Entre el numero de telefono"
            onChange={handleEditBasicFormClick("telefono")}
             ></input>
           </div>
           </div>
           <div className="col">
           <div className="form-group">
             <label className="form-label">Cuentas Bancos</label>
             <input type="text" name="cuentasbancos" value={ editBasicFormData.cuentasbancos } id="cuentasbancos" className="form-control" placeholder="Entre Cuentas Bancos"
             onChange={handleEditBasicFormClick("cuentasbancos")}
             ></input>
           </div>  
           </div>
           </div>
           <div className="row ml-4 mr-4 mb-4">  
           <div className="col">
           <div className="form-group">
             <label className="form-label">Email</label>
             <input type="text" name="email" value={ editBasicFormData.email } id="email" className="form-control" placeholder="Entre el Email del Proyecto"
             onChange={handleEditBasicFormClick("email")}
             ></input>
           </div>  
           </div>
           <div className="col">
           <div className="form-group">
             <label className="form-label">Clave Email</label>
             <input type="password" name="claveemail" value={ editBasicFormData.claveemail } id="claveemail" className="form-control" placeholder="Entre la clave de Email"
             onChange={handleEditBasicFormClick("claveemail")}
             ></input>
           </div>
           </div>
           </div>
           <br/>
           <div className="row ml-4 mr-4 mb-4">
           <div className="col">
           <div className="form-group">
             <label className="form-label">Fecha Inicio Contrato</label>
             <input type="date" name="fechainicio" value={ moment(editBasicFormData.fechainicio).format("YYYY-MM-DD") } id="fechainicio" className="form-control" placeholder="Entre la fecha de Inicio del Contrato"
             onChange={handleEditBasicFormClick("fechainicio")}
             ></input>
           </div>
           </div>
           <div className="col">
           <div className="form-group">
           <label className="form-label">Fecha Vencimiento Contrato</label>
           <input type="date" name="fechavence" value={ moment(editBasicFormData.fechavence).format("YYYY-MM-DD") } id="fechavence" className="form-control" placeholder="Entre la fecha de Vencimiento del Contrato"
           onChange={handleEditBasicFormClick("fechavence")}
           ></input>
           </div>  
           </div>
           </div>
           <div className="row ml-4 mr-4 mb-4">
           <div className="col">
           <div className="form-group mt-4">
             {/* <a href="{{ route('proyectos.show',$proyecto->p_id) }}" className="btn btn-sm btn-outline-info shadow-sm">Cancelar</a> */}
             <Link to={`/proyectos/ver/${id}`} className="btn btn-sm btn-warning">Cancelar</Link>
             <span className='ps-2'></span>
             <button type="submit" className="btn btn-sm btn-primary" name="save">Actualizar</button>  
           </div>
           </div>
           <div className="col">
           <div className="form-group">
           <label className="form-label"></label>
           </div>  
           </div>
           </div>
          </form>

  </div>
  <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">

  <form onSubmit={handleJurFormSave}>

              <input type="hidden" value={editJurFormData.p_id} name="p_id" id="p_id"></input>
             <div className="row ml-4 mr-4 mb-4">
             <div className="col">
             <div className="form-group">
               <label className="form-label">Matricula</label>
               <input type="text" name="matricula" value={editJurFormData.matricula} id="matricula" className="form-control" placeholder="Matricula del Proyecto"
               onChange={handleEditJurFormClick("matricula")}></input>
             </div>
             </div>
             <div className="col">
             <div className="form-group">
               <label className="form-label">Fecha Matricula</label>
               <input type="date" name="fechamatricula" value={moment(editJurFormData.fechamatricula).format("YYYY-MM-DD")} id="fechamatricula" className="form-control" placeholder=""
               onChange={handleEditJurFormClick("fechamatricula")}></input>
             </div>
             </div>
         
             </div>
             <div className="row ml-4 mr-4 mb-4">
             <div className="col">
             <div className="form-group">
               <label className="form-label">Numero Escritura</label>
               <input type="text" name="numescritura" value={editJurFormData.numescritura} id="numescritura" className="form-control" placeholder="Numero Escritura"
               onChange={handleEditJurFormClick("numescritura")}></input>
             </div>
             </div>
             <div className="col">
             <div className="form-group">
               <label className="form-label">Fecha Escritura</label>
               <input type="date" name="fechaescriturapublica" value={moment(editJurFormData.fechaescriturapublica).format("YYYY-MM-DD")} id="fechaescriturapublica" className="form-control"
               onChange={handleEditJurFormClick("fechaescriturapublica")}></input>
             </div>
             </div>
             </div>
         
            <div className="row ml-4 mr-4 mb-4">
              
             <div className="col">
             <div className="form-group">
               <label className="form-label">Numero Folio</label>
               <input type="text" name="numfolios" value={editJurFormData.numfolios} id="numfolios" className="form-control" placeholder="Numero de Folio"
               onChange={handleEditJurFormClick("numfolios")}></input>
             </div>
             </div>
             <div className="col">
             <div className="form-group">
               <label for="" className="form-label">Notaria</label>
               <input type="text" name="notaria" value={editJurFormData.notaria} id="notaria" className="form-control" placeholder="Notaria"
               onChange={handleEditJurFormClick("notaria")}></input>
             </div>  
             </div>
             </div>
             <div className="row ml-4 mr-4 mb-4">  
             <div className="col">
             <div className="form-group">
               <label for="" className="form-label">Tipo Propiedad</label>
               <input type="text" name="tipopropiedad" value={editJurFormData.tipopropiedad} id="tipopropiedad" className="form-control" placeholder="Tipo de Propiedad"
               onChange={handleEditJurFormClick("tipopropiedad")}></input>
             </div>  
             </div>
             <div className="col">
             <div className="form-group">
               <label className="form-label">Localidad</label>
               <input type="text" name="localidad" value={editJurFormData.localidad} id="localidad" className="form-control" placeholder="Entre la Localidad"
               onChange={handleEditJurFormClick("localidad")}></input>
             </div>
             </div>
             </div>
             <div className="row ml-4 mr-4 mb-4">
             <div className="col">
             <div className="form-group">
               <label className="form-label">Barrio</label>
               <input type="text" name="barrio" value={editJurFormData.barrio} id="barrio" className="form-control" placeholder="Entre el Barrio"
               onChange={handleEditJurFormClick("barrio")}></input>
             </div>
             </div>
             <div className="col">
             <div className="form-group">
             <label className="form-label">Estrato</label>
             <input type="text" name="estrato" value={editJurFormData.estrato} id="estrato" className="form-control" placeholder="Entre el Estrato"
             onChange={handleEditJurFormClick("estrato")}></input>
             </div>  
             </div>
             </div>
             <div className="row ml-4 mr-4 mb-4">
              <div className="col">
              <div className="form-group">
                <label className="form-label">Nombre del Edificio</label>
                <input type="text" name="nombreedificio" value={editJurFormData.nombreedificio} id="nombreedificio" className="form-control" placeholder="Nombre del Edificio"
                onChange={handleEditJurFormClick("nombreedificio")}></input>
              </div>
              </div>
              <div className="col">
              {/* <div className="form-group">
              <label className="form-label">&nbsp;</label>
              <input type="text" name="estrato" value={editJurFormData.estrato} id="estrato" className="form-control" placeholder="Entre el Estrato"
              onChange={handleEditJurFormClick("estrato")}></input>
              </div>   */}
              </div>
              </div>
             <div className="row ml-4 mr-4 mb-4">
             <div className="col">
             <div className="form-group mt-4">
               {/* {{-- <a href="{{ route('proyectos.show',$proyecto->p_id) }}" className="btn btn-sm btn-outline-info shadow-sm">Cancelar</a> --}} */}
               <button type="submit" className="btn btn-primary btn-sm" name="save">Actualizar</button>  
             </div>
             </div>
             <div className="col">
             <div className="form-group">
             <label className="form-label"></label>
             </div>  
             </div>
             </div>
            </form>


  </div>
</div>
      </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default EditarProyecto