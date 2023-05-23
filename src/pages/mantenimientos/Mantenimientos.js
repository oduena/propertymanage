import React,{ useEffect,useState, useMemo } from "react";
//import { useNavigate } from "react-router-dom";
//import Axios from 'axios';
import Axios from '../../api/axios';
import ListarMantemientos from './ListarMantenimientos';
import ListarMantenimientosCal from "./ListarMantenimientosCal";
import ListarMantenimientoNotas from "./ListarMantenimientoNotas";
import moment from "moment";
import Swal from 'sweetalert2';
import {useAuthUser} from 'react-auth-kit'
//import AuthContext from "../../context/AuthProvider";

const Mantenimientos = () => {
//  let navigate = useNavigate();
    const [Mantenimientos, setMantenimientos] = useState([]);
    const [MantenimientosCal, setMantenimientosCal] = useState([]);
  
    const [selectedProyecto, setSelectedProyecto] = useState("All");
    //const [selectedProveedor, setSelectedProveedor] = useState("");
    const [selectedProyectoCal, setSelectedProyectoCal] = useState("All");
    const [proyectos, setProyectos] = useState([]);
    const [ProveedoresList, setProveedoresList] = useState([]);
    //const [servicios, setServicios] = useState([]);
    const [datestart, setdatestart] = useState("");
    const [dateend, setdateend] = useState("");
    const [selectedYear, setSelectedYear] = useState("All");
    //const [filterDate, setFilterDate] = useState("false");
    const [Servicio, setServicio] = useState([]);
    const [selectedProveedor, setSelectedProveedor] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [isProveedorDisabled, setIsProveedorDisabled] = useState(true);
    //const [periodicidad, setPeriodicidad] = useState("");
    const [seguimientoNota, setSeguimientoNota] = useState("");
    const [seguimientoNotas, setSeguimientoNotas] = useState([]);
    //const { auth } = useContext(AuthContext);
    const auth = useAuthUser();
    const [addMantenimiento, setAddMantenimiento] = useState({
        p_id: '',
        pv_id: '',
      //  s_id: '',
        fecha: '',
        hora: '',
        estado: 'Pendiente',
        periodicidad: '',
        notas: ''
    });
    
    const [editFormData, setEditFormData] = useState({
        m_id: '',
        p_id: '',
        pv_id: '',
        servicio: '',
        fecha: '',
        hora: '',
        estado: '',
        periodicidad: '',
        notas: ''
    });

    const [ViewFormData, setViewFormData] = useState({
      m_id: '',
      proyecto: '',
      proveedor: '',
      servicio: '',
      fecha: '',
      hora: '',
      estado: '',
      periodicidad: '',
      notas: ''
  });

    const handleChange = (input) => (e) => {
        e.preventDefault();
        setAddMantenimiento({...addMantenimiento,[input]: e.target.value});
    }

    const handleEditMantenimientoForm = (e, mantenimiento) => {
        e.preventDefault();
       // setEditServicioId(servicio.s_id);
       
        const formValues = {
            m_id : mantenimiento.m_id,
            p_id : mantenimiento.p_id,
            pv_id : mantenimiento.pv_id,
            servicio: mantenimiento.servicio,
            fecha : mantenimiento.fecha,
            hora: mantenimiento.hora,
            estado: mantenimiento.estado,
            periodicidad: mantenimiento.periodicidad,
            notas: mantenimiento.notas
        }
        setEditFormData(formValues);
       // console.log(mantenimiento.notas);
    }

    const loadMantenimientoSeguimientoNotas = async (m_id) =>{
      //const response = await Axios.get(`http://localhost:3005/api/mantenimientos/getMantenimientoNotasBym_id/${m_id}`);
      const response = await Axios.get(`/mantenimientos/getMantenimientoNotasBym_id/${m_id}`);
      setSeguimientoNotas(response.data);
    //  console.log(seguimientoNotas);
    }

    const handleViewMantenimiento = (e, mantenimiento) =>{
      e.preventDefault();
      const ViewformValues = {
        m_id : mantenimiento.m_id,
        proyecto : mantenimiento.proyecto,
        proveedor : mantenimiento.proveedor,
        servicio: mantenimiento.servicio,
        fecha : mantenimiento.fecha,
        hora: mantenimiento.hora,
        estado: mantenimiento.estado,
        periodicidad: mantenimiento.periodicidad,
        notas: mantenimiento.notas
    }
    setViewFormData(ViewformValues);
    loadMantenimientoSeguimientoNotas(mantenimiento.m_id);
    }


    const getServicio = async (e) => {
      //setSelectedProveedor(e.target.value);
      //if(input==="pv_id"){
      
      if(selectedProyecto==="All"){
        alert("Seleccione un Proyecto antes de continuar");
      }else{
        if(e.target.value==="All"){

          //alert("Seleccion de Proveedor Invalida");

          Swal.fire({
            icon:'error',
            title: 'Seleccion de Proveedor Invalido',
            //timer : 2000,
            showConfirmButton: true,
            //timerProgressBar:true,
            position: 'top',
            //toast: true,
            //text: 'Error : ' + error
          })

          }else{
            let pv_id = e.target.value;
            let p_id = selectedProyecto;

if(isChecked){
  //const response = await Axios.get(`http://localhost:3005/api/proveedores/getServiciobypv_id/${pv_id}`);
const response = await Axios.get(`/proveedores/getServiciobypv_id/${pv_id}`);
setServicio(...response.data);

}else{
              //const response = await Axios.get(`http://localhost:3005/api/proveedores/getServiciofromPPbypv_id`,{
              const response = await Axios.get(`/proveedores/getServiciofromPPbypv_id`,{
              params : {
                p_id : p_id,
                pv_id : pv_id
              }
            });
          setServicio(...response.data);
}

          setSelectedProveedor(e.target.value);
          }
      }
    }

    const getListProveedores = async (e) => {
      let p_id = e.target.value
      //const response = await Axios.get(`http://localhost:3005/api/proveedores/list/byProyecto/${p_id}`)
      const response = await Axios.get(`/proveedores/list/byProyecto/${p_id}`);
      setProveedoresList(response.data);
      setSelectedProyecto(e.target.value);
      setIsProveedorDisabled(false);
      //console.log(isProveedorDisabled);
    }


    //const [searchQuery, setSearchQuery] = useState("");
    const loadListProyectos = async () => {
        //const response = await Axios.get('http://localhost:3005/api/proyectos/list');
        const response = await Axios.get('/proyectos/list');
        setProyectos(response.data);
      };

      const loadListProveedores = async () => {
        if(isChecked){          
          //const response = await Axios.get(`http://localhost:3005/api/proveedores/list/byProyecto/${selectedProyecto}`)
          const response = await Axios.get(`/proveedores/list/byProyecto/${selectedProyecto}`);
          setProveedoresList(response.data);
        
        }else{

          //const response = await Axios.get('http://localhost:3005/api/proveedores/list');
          const response = await Axios.get('/proveedores/list');
          setProveedoresList(response.data);
          //getListProveedores(selectedProyecto);
          
        }
        
      };

      // const loadListServicios = async () => {
      //   const response = await Axios.get('http://localhost:3005/api/servicios');
      //   setServicios(response.data);
      // };
    // function search() {
    //     return Mantenimientos.filter(row=>row.nombre.toLowerCase().indexOf(searchQuery) > - 1);
    // }
    const handleEditFormClick = (input) => (e) => {
        e.preventDefault();
        setEditFormData({...editFormData, [input]: e.target.value });
      }
    
      const handleFormSave = (e) => {
        e.preventDefault();
          const editMantenimiento = {
          m_id: editFormData.m_id
      }
      
      //Axios.put(`http://localhost:3005/api/mantenimientos/editarMantenimiento/${editMantenimiento.m_id}`,{
        Axios.put(`/mantenimientos/editarMantenimiento/${editMantenimiento.m_id}`,{
        p_id:editFormData.p_id,
        pv_id:editFormData.pv_id,
        //s_id:editFormData.s_id,
        fecha:editFormData.fecha,
        hora:editFormData.hora,
        estado:editFormData.estado,
        notas:editFormData.notas
      }).then((response)=>{
      
        //loadProveedores();
        loadFilteredMantenimientos(selectedProyecto);
        setAddMantenimiento();
      })
}

      const handleAddMantenimiento = (e) => {
        e.preventDefault();
        const newMantenimiento = {
            //p_id : addMantenimiento.p_id,
            p_id : selectedProyecto,
            pv_id : selectedProveedor,
            fecha : addMantenimiento.fecha,
            hora : addMantenimiento.hora,
            estado : addMantenimiento.estado,
            //periodicidad : addMantenimiento.periodicidad,
            periodicidad : Servicio.periodicidad,
            notas : addMantenimiento.notas
        }
      //console.log(newMantenimiento);
       // const newServicios = [...Servicios, newServicio];
        //Axios.post('http://localhost:3005/api/AddMantenimiento',{
          Axios.post('/AddMantenimiento',{
            p_id: newMantenimiento.p_id,
            pv_id: newMantenimiento.pv_id,
            fecha : newMantenimiento.fecha,
            hora : newMantenimiento.hora,
            estado : newMantenimiento.estado,
            periodicidad : newMantenimiento.periodicidad,
            notas : newMantenimiento.notas
          }).then((response)=>{
    
          //loadProveedores();
         loadFilteredMantenimientos();
        
          })
    }

    const handleAddMantNotas = (e) =>{
      e.preventDefault();
      const newMantNota = {
        m_id : ViewFormData.m_id,
        mant_nota : seguimientoNota,
        username : auth()?.user
      }

      //Axios.post('http://localhost:3005/api/mantenimientos/AddMantenientoNotas',{
      Axios.post('/mantenimientos/AddMantenientoNotas',{
        m_id : newMantNota.m_id,
        mant_nota : newMantNota.mant_nota,
        username : newMantNota.username
      }).then((response)=>{
          setSeguimientoNota("");
          loadMantenimientoSeguimientoNotas(ViewFormData.m_id);
        //  console.log(editFormData.m_id)
      })

    }

    const handleProyectoChange = (e) => {
           
        setSelectedProyecto(e.target.value);
      
    }

    const handleChangeYear = (e) => {
      setSelectedYear(e.target.value)
      //loadFilteredMantenimientosCalYear(selectedYear);
    }


    const handleProyectoChangeCal =(e) => {

      setSelectedProyectoCal(e.target.value);
  }

const handleFilterClick = async () => {
if(selectedProyecto==="All"){
if(dateend===""){
  //const response = await Axios.get('http://localhost:3005/api/mantenimientos');
  const response = await Axios.get('/mantenimientos');
  setMantenimientos(response.data);
}else{
  //const response = await Axios.get('http://localhost:3005/api/mantenimientos/byDate',{
    const response = await Axios.get('/mantenimientos/byDate',{
    params:{
        datestart:datestart,
        dateend:dateend
    }
});
setMantenimientos(response.data);
}
}else{
  if(dateend===""){
    //const response = await Axios.get(`http://localhost:3005/api/mantenimientos/byP_Id/${selectedProyecto}`);
    const response = await Axios.get(`/mantenimientos/byP_Id/${selectedProyecto}`);
    setMantenimientos(response.data)
  }else{
    //const response = await Axios.get('http://localhost:3005/api/mantenimientos/byDatebyPid',{
      const response = await Axios.get('/mantenimientos/byDatebyPid',{
      params:{
          datestart:datestart,
          dateend:dateend,
          p_id: selectedProyecto
      }
  });
  setMantenimientos(response.data);
  }
}
}

const handleFilterClickCal = async () => {
  if(selectedProyectoCal==="All"){
  if(selectedYear==="All"){
    //const response = await Axios.get('http://localhost:3005/api/mantenimientos/calendar');
    const response = await Axios.get('/mantenimientos/calendar');
    setMantenimientosCal(response.data);
  }else{
    //const response = await Axios.get(`http://localhost:3005/api/mantenimientos/calendar/byYear/${selectedYear}`);
    const response = await Axios.get(`/mantenimientos/calendar/byYear/${selectedYear}`);
  setMantenimientosCal(response.data);
  }
  }else{
    if(selectedYear==="All"){
      //const response = await Axios.get(`http://localhost:3005/api/mantenimientos/calendar/byP_Id/${selectedProyectoCal}`);
      const response = await Axios.get(`/mantenimientos/calendar/byP_Id/${selectedProyectoCal}`);
      setMantenimientosCal(response.data)
    }else{
      //const response = await Axios.get('http://localhost:3005/api/mantenimientos/calendar/byYearbyPid',{
        const response = await Axios.get('/mantenimientos/calendar/byYearbyPid',{
        params:{
            yearid:selectedYear,            
            p_id: selectedProyectoCal
        }
    });
    setMantenimientosCal(response.data);
    }
  }
  }


    const loadMantenimientosCal = async () => {
      //const response = await Axios.get('http://localhost:3005/api/mantenimientos/calendar')
      const response = await Axios.get('/mantenimientos/calendar');
      setMantenimientosCal(response.data);

    }

 const loadFilteredMantenimientos = async () => {
  if(selectedProyecto==="All"){
    if(dateend===""){
      //const response = await Axios.get('http://localhost:3005/api/mantenimientos');
      const response = await Axios.get('/mantenimientos');
      setMantenimientos(response.data);
    }else{
      //const response = await Axios.get('http://localhost:3005/api/mantenimientos/byDate',{
        const response = await Axios.get('/mantenimientos/byDate',{
        params:{
            datestart:datestart,
            dateend:dateend
        }
    });
    setMantenimientos(response.data);
    }
    }else{
      if(dateend===""){
        //const response = await Axios.get(`http://localhost:3005/api/mantenimientos/byP_Id/${selectedProyecto}`);
        const response = await Axios.get(`/mantenimientos/byP_Id/${selectedProyecto}`);
        setMantenimientos(response.data)
      }else{
        //const response = await Axios.get('http://localhost:3005/api/mantenimientos/byDatebyPid',{
          const response = await Axios.get('/mantenimientos/byDatebyPid',{
          params:{
              datestart:datestart,
              dateend:dateend,
              p_id: selectedProyecto
          }
      });
      setMantenimientos(response.data);
      }
    }
}

const handleIsFortuitoChange = () =>{
 setIsChecked(!isChecked);
 loadListProveedores();
}

const handleDelete = (e, mantenimiento) => {
  e.preventDefault();
  
  if(window.confirm('Esta seguro de querer Eliminar este Registro?')){

   Axios.delete(`/mantenimientos/borrarMantenimiento/${mantenimiento.m_id}`,{

   }).then(()=>{
    loadFilteredMantenimientos();

   })
  }
}
    
//const fetchUrl = "http://localhost:3005/api/mantenimientos";
const fetchUrl = process.env.REACT_APP_API_URL+"/mantenimientos";

  useEffect(() => {
    
    async function fetchData(){
        const response = await Axios.get(fetchUrl)
        setMantenimientos(response.data);
        return response
    }
    fetchData();
    //loadFilteredMantenimientos();
    loadListProyectos();
    loadListProveedores();
   // loadListServicios();
    loadMantenimientosCal();
    },[fetchUrl]);

    function getFilteredList(){
        if(!selectedProyecto){
         return Mantenimientos;
         }
         else{ 
         return Mantenimientos;   
         }
       }

var filteredList = useMemo(getFilteredList, [selectedProyecto, Mantenimientos]);

  return (
    <>
     <div className="template">
        <div className="card">
            <div className="card-header">
            <h2 className="mb-2 mt-2">Mantenimientos</h2>
            </div>
            <div className="card-body">
<nav className="mt-1">
  <div className="nav nav-tabs" id="nav-tab" role="tablist">
    <button className="nav-link active" id="nav-info-tab" data-bs-toggle="tab" data-bs-target="#nav-info" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Lista de Mantenimientos</button>
    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button"  role="tab" aria-controls="nav-profile" aria-selected="false">Calendario Anual</button>
  </div>
</nav>
<div className="tab-content" id="nav-tabContent">
<div className="tab-pane fade show active" id="nav-info" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
<div className="body mt-3">
<div className="d-sm-flex align-items-center justify-content-between mb-3">
  <div className="d-flex">
  <select className="form-select dropdown"
            name="ddlProyecto"
            id="ddlProyecto"
            value={selectedProyecto}
            onChange={(e)=>{handleProyectoChange(e)}}
            >
        <option value="All">Todos los Proyectos</option>
        {proyectos.map((item,index) => {
        return (
          <option value={item.p_id} key={item.p_id}>{item.nombre}</option>
        )
      })}
      </select>

      <div className="d-sm-flex ms-3">
      <input type="date" name="datestart" className="form-control"
     onChange={(e) =>{
        setdatestart(e.target.value)
        }}
      ></input>
      <input type="date" name="dateend" className="form-control"
      onChange={(e) =>{
        setdateend(e.target.value)
        }}></input>
      <button className="btn btn-primary btn-sm"
      onClick={handleFilterClick}
      >Filtrar</button>
      </div>
  </div>
  <div>
  <button type="button" className="btn btn-sm btn-warning shadow-sm" data-bs-toggle="modal" data-bs-target="#addMantenimientoForm"><i className='fas fa-circle-plus p-1 pr-10'></i> Agregar Mantenimiento</button>
  </div>

        </div>
<div className="tableContainer">
<table className="table table-responsive table-hover">
  <thead className="thead-dark">
  <tr>
            <th style={{width:"180px"}}>Proyecto</th>
            <th style={{width:"180px"}}>Proveedor</th>
            <th style={{width:"230px"}}>Servicio</th>
            <th style={{width:"110px"}}>Fecha</th>
            <th style={{width:"80px"}}>Hora</th>
            <th style={{width:"120px"}}>Estado</th>
            <th style={{width:"120px"}}>Periodicidad</th>
            <th style={{width:"180px"}}>Notas</th>
            <th style={{width:"70px"}}>Accion</th>
          </tr>
  </thead>
  <tbody>
  {
  <ListarMantemientos
  //nameFilter={searchQuery}
  handleEditMantenimientoForm={handleEditMantenimientoForm}
  handleViewMantenimiento={handleViewMantenimiento}
  mantenimientos={filteredList}
  handleDelete={handleDelete}
   />
    }
  </tbody>
</table>
</div>
<div className="clearfix">
        <div className="hint-text">Total Registros: <b>{Mantenimientos.length}</b> </div>
    </div>
</div>
</div>
<div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
<div className="body mt-3">
<div className="d-sm-flex align-items-center justify-content-between mb-3">
<div className="d-flex">
<select className="form-select dropdown"
            name="ddlProyectoCal"
            id="ddlProyectoCal"
            value={selectedProyectoCal}
            onChange={(e)=>{handleProyectoChangeCal(e)}}
            >
        <option value="All">Todos los Proyectos</option>
        {proyectos.map((item,index) => {
        return (
          <option value={item.p_id} key={item.p_id}>{item.nombre}</option>
        )
      })}
      </select>
      <select className="form-select dropdown"
      name="year"
      id="year"
      value={selectedYear}
      onChange={(e)=>{handleChangeYear(e)}}
      style={{width:"290px"}}
      >
    <option value="All">Todos los Años</option>
    {/* <option value="2022">2022</option> */}
    <option value="2023">2023</option>
    <option value="2024">2024</option>
    <option value="2025">2025</option>
    <option value="2026">2026</option>
    <option value="2027">2027</option>
    <option value="2028">2028</option>
    <option value="2029">2029</option>
    <option value="2030">2030</option>
      </select>
      <button className="btn btn-primary btn-sm"
      onClick={handleFilterClickCal}
      >Filtrar</button>
</div>
<div className="d-flex">

</div>

</div>
<div className="tableContainer">
<table className="table table-responsive table-hover table-bordered">
  <thead className="thead-dark">
  <tr>
          <th style={{width:"230px"}}>Proyecto</th>
          <th style={{width:"230px"}}>Proveedor</th>
          <th style={{width:"230px"}}>Servicio</th>
          <th style={{width:"110px"}}>Ene</th>
          <th style={{width:"110px"}}>Feb</th>
          <th style={{width:"110px"}}>Mar</th>
          <th style={{width:"110px"}}>Abr</th>
          <th style={{width:"110px"}}>May</th>
          <th style={{width:"110px"}}>Jun</th>
          <th style={{width:"110px"}}>Jul</th>
          <th style={{width:"110px"}}>Ago</th>
          <th style={{width:"110px"}}>Sep</th>
          <th style={{width:"110px"}}>Oct</th>
          <th style={{width:"110px"}}>Nov</th>
          <th style={{width:"110px"}}>Dec</th>
          </tr>
  </thead>
  <tbody>
  {
  <ListarMantenimientosCal
  //nameFilter={searchQuery}
  //handleEditMantenimientoForm={handleEditMantenimientoForm}
  mantenimientoscal={MantenimientosCal}
  //handleDelete={handleDelete}
   />
    }
  </tbody>
</table>
</div>
<div className="clearfix">
        <div className="hint-text">Total Registros: <b>{MantenimientosCal.length}</b> </div>
    </div>
</div>

</div>
</div>
  </div>
 </div>
 {/* Add Mantenimiento Modal Begin*/}
 <div className="modal fade" id="addMantenimientoForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
      <form onSubmit={handleAddMantenimiento}>
    <div className="modal-content">
    <div className="modal-header primary">
       <h2 className="modal-title">Agregar Mantenimiento</h2>
    </div>
    <div className="modal-body">
   <div className="row ml-4 mr-4 mb-4">
   <div className="col">
   <div className="form-group">
     <label htmlFor="Proyecto" className="form-label">Proyecto</label>
     <select  className="form-select dropdown"
     name="p_id"
     id="p_id"
    //value={editFormData.p_id}
    onChange={(e)=>getListProveedores(e)}
    >
    <option value="All">Seleccione un Proyecto</option>
{proyectos.map((item,index) => {
        return (
          <option value={item.p_id} key={item.p_id}>{item.nombre}</option>
        )
      })}
        </select>
   </div>
   </div>
   <div className="col">
   <div className="form-group">
    <div className="d-flex justify-content-between">
      <label htmlFor="Proveedor" className="form-label">Proveedor</label>
      <div className="form-check">
  <input
  className="form-check-input"
  type="checkbox"
  id="flexCheckDefault"
  checked={isChecked}
  onChange={handleIsFortuitoChange}
  />
  <label className="form-check-label" htmlFor="flexCheckDefault">
    Fortuito
  </label>
</div>
    
     </div>
     <select className="form-select dropdown"
     name="pv_id"
     id="pv_id"
     disabled={isProveedorDisabled}
    //value={ProveedoresList}
    //onChange={handleChange("pv_id")}
    onChange={(e)=>getServicio(e)}
     >
      <option value="All">Seleccione un Proveedor</option>
{ProveedoresList.map((item,index) => {
        return (
          <option value={item.pv_id} key={item.pv_id}>{item.nombre}</option>
        )
      })}   
   </select>
   </div>
   </div>
   </div>
   <div className="row ml-4 mr-4 mb-4">
   <div className="col-lg-6 col-sm-6">
   <div className="form-group">
     <label htmlFor="servicio" className="form-label">Servicio</label>
    <input type="text"
    className="form-control"
    disabled
    value={Servicio.servicio==="" ? '' : Servicio.servicio}
    ></input>
   </div>
   </div>
   <div className="col-lg-6 col-sm-6 d-flex">
   <div className="form-group">
     <label htmlFor="Estado" className="form-label">Estado</label>
     
     <select className="form-select dropdown"
     name="estado"
     id="estado"
     value="Pendiente"
     style={{width:"200px"}}
     onChange={handleChange("estado")}
     >  
     {/* <option value="All">Seleccione un Estado</option> */}
        <option value="Pendiente">Pendiente</option>
        <option value="Programado">Programado</option>
        {/* <option value="Ejecutandose">Ejecutandose</option>
        <option value="Ejecutado">Ejecutado</option> */}
        
        </select>
   </div>
   <div className="form-group ms-2">
   <label htmlFor="periodicidad" className="form-label">Periodicidad</label>
   <input type="text"
    className="form-control"
    disabled
    //value={Servicio.periodicidad==="" ? '' : Servicio.periodicidad}
    value={Servicio.periodicidad === '12' ? 'Mensual' : Servicio.periodicidad==='6' ? 'Bimestral' : Servicio.periodicidad==='4' ? 'Cada 3  meses' : Servicio.periodicidad==='3' ?
    'Cada 4 meses' : Servicio.periodicidad==='2' ? 'Semestral' : 'Anual'}
    ></input>
   </div>
   </div>
   </div>

  <div className="row ml-4 mr-4">
   <div className="col">
   <div className="form-group">
     <label htmlFor="Fecha" className="form-label">Fecha</label>
     <input type="date" name="fecha" id="fecha" className="form-control" required
     //value=""
     onChange={handleChange("fecha")}
     ></input>
   </div>
   </div>
   <div className="col">
   <div className="form-group">
     <label htmlFor="Hora" className="form-label">Hora</label>
     <input type="text" name="hora" id="hora" className="form-control" placeholder="Hora del Mantenimiento" required
     //value=""
     onChange={handleChange("hora")}
     ></input>
   </div>  
   </div>
   </div>
   <br/>
   <div className="row ml-4 mr-4 mb-4">
    <div className="col">
    <div className="form-group">
        <label htmlFor="Notas" className="form-label">Notas</label>
        <input type="text" name="notas" id="notas" className="form-control" size="100" placeholder="Notas"
        // value=""        
        onChange={handleChange("notas")}
        ></input>
      
    </div>
    </div>
    </div>
   </div>
   <div className="modal-footer">
  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
<button type="submit" className="btn btn-primary">Guardar</button>
</div>
   </div>
  </form>
      </div>
    </div>
     {/* Add Mantenimiento Modal End*/}
 {/* Edit Mantenimiento Modal Begin*/}
 <div className="modal fade" id="editMantenimientoForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
      <form onSubmit={handleFormSave}>
    <div className="modal-content">
    <div className="modal-header primary">
       <h2 className="modal-title">Editar Mantenimiento</h2>
    </div>
    <div className="modal-body">
   <div className="row ml-4 mr-4 mb-4">
   <div className="col">
   <div className="form-group">
     <label htmlFor="Proyecto" className="form-label">Proyecto</label>
     <select  className="form-select dropdown"
     name="p_id"
     id="p_id"
     disabled
    value={editFormData.p_id}
    onChange={handleEditFormClick("p_id")}
    >
{proyectos.map((item,index) => {
        return (
          <option value={item.p_id} key={item.p_id}>{item.nombre}</option>
        )
      })}
        </select>
   </div>
   </div>
   <div className="col">
   <div className="form-group">
     <label htmlFor="Proveedor" className="form-label">Proveedor</label>
     <select className="form-select dropdown"
     name="pv_id"
     id="pv_id"
     disabled
     value={editFormData.pv_id}
    onChange={handleEditFormClick("pv_id")}
     >
{ProveedoresList.map((item,index) => {
        return (
          <option value={item.pv_id} key={item.pv_id}>{item.nombre}</option>
        )
      })}   
   </select>
   </div>
   </div>
   </div>
   <div className="row ml-4 mr-4 mb-4">
   <div className="col">
   <div className="form-group">
     <label htmlFor="servicio" className="form-label">Servicio</label>
    <input type="text" className="form-control" disabled value={editFormData.servicio}></input>
   </div>
   </div>
   <div className="col">
   <div className="form-group">
     <label htmlFor="Estado" className="form-label">Estado</label>
     
     <select className="form-select dropdown"
     name="estado"
     id="estado"
     value={editFormData.estado}
     onChange={handleEditFormClick("estado")}
     >               
        <option value="Pendiente">Pendiente</option>
        <option value="Programado">Programado</option>
        <option value="Ejecutandose">Ejecutandose</option>
        <option value="Ejecutado">Ejecutado</option>
        
        </select>
   </div>
   </div>
   </div>

  <div className="row ml-4 mr-4">
   <div className="col">
   <div className="form-group">
     <label htmlFor="Fecha" className="form-label">Fecha</label>
     <input type="date" name="fecha" id="fecha" className="form-control"
     value={moment(editFormData.fecha).format('YYYY-MM-DD')}
     onChange={handleEditFormClick("fecha")}
     ></input>
   </div>
   </div>
   <div className="col">
   <div className="form-group">
     <label htmlFor="Hora" className="form-label">Hora</label>
     <input type="text" name="hora" id="hora" className="form-control" placeholder="Entre la Hora del Mantenimiento"
     value={editFormData.hora}
     onChange={handleEditFormClick("hora")}
     ></input>
   </div>  
   </div>
   </div>
   <br/>
   <div className="row ml-4 mr-4 mb-4">
    <div className="col">
    <div className="form-group">
        <label htmlFor="Notas" className="form-label">Notas</label>
        <input type="text" name="notas" id="notas" className="form-control" size="100" placeholder="Notas"
         value={editFormData.notas===null ? '' : editFormData.notas}        
        onChange={handleEditFormClick("notas")}
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
{/* Edit Mantenimiento Modal Begin*/}
{/* View Mantenimiento Modal Begin*/}
<div className="modal fade" id="ViewMantenimientoForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-xl">
  <div className="modal-content" style={{height:"800px"}}>
    <div className="modal-header primary">
       <h2 className="modal-title">Detalles del Mantenimiento</h2>
    </div>
    <div className="modal-body">
      <div className="template">
        <div className="row mt-4">
          <div className="col-lg-4">
            <div className="card shadow">
            <div className="card-body">
            <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Mantenimiento ID:</b> {ViewFormData.m_id}</div>
            <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Proyecto:</b> {ViewFormData.proyecto}</div>
            <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Proveedor:</b> {ViewFormData.proveedor}</div>
          <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Servicio:</b> {ViewFormData.servicio}</div>
          <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Fecha:</b> {moment(ViewFormData.fecha).format('YYYY-MM-DD')}</div>
          <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Hora:</b> {ViewFormData.hora}</div>
          <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Estado:</b>
          <span className={ViewFormData.estado==='Ejecutandose' ? "label label-success" : ViewFormData.estado==='Programado' ? "label label-info" : 
    ViewFormData.estado==='Pendiente' ? "label label-warning" : "label label-dark"}>{ViewFormData.estado}</span>
           </div>
          <div className="h5 font-weight-bold text-gray-800 mb-4"><b>Notas:</b> {ViewFormData.notas}</div>
          </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card shadow">
              <form onSubmit={handleAddMantNotas}>
                <div className="d-sm-flex align-items-center justify-content-around card-header">
                <h2 className="mb-0 text-gray-800">Seguimiento</h2>
                <input className="form-control" value={seguimientoNota} onChange={(e)=>setSeguimientoNota(e.target.value)} required type="text" name="mant_notas"/>
                <button type="submit" className="btn btn-primary btn-sm" name="save">Guardar</button>
                </div>
              </form>
            </div>
 
            {<ListarMantenimientoNotas
            mantenimientonotas={seguimientoNotas}/>}
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

export default Mantenimientos
