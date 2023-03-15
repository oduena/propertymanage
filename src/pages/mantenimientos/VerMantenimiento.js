import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';

export const VerMantenimiento = () => {

const [Mantenimiento, setMantenimiento] = useState([]);

    let { id } = useParams();

const loadMantenimiento = async () => {
const response = await Axios.get(`http://localhost:3005/api/mantenimientos/byId/${id}`);
setMantenimiento(...response.data);
};

useEffect(() => {
loadMantenimiento();
       //loadListProveedores();
        //setLabelFecha();
},[]);
    

return (
<>
<div className="template">
    <div className="card">
    <div className="card-header">
      <h2 className="mb-2 mt-2"> Detalles del Mantenimiento</h2>
    </div>
    <div className="card-body">
    <Link to={'/mantenimientos'} className="d-none d-sm-inline-block btn btn-sm btn-info shadow-sm">{'<<'}Regresar</Link>
    </div>
    </div>
</div>    
</>
)
}
