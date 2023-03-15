import moment from "moment";
//import { useNavigate } from 'react-router-dom';
const ListarTareaNotas = ({tareanotas}) => {

//let navigate = useNavigate();
//console.log(mantenimientonotas);

return (
 <>
 <div className="notas-container">
{tareanotas.map((nota)=>(
    
    <div className="card shadow mb-2" key={nota.tn_id}>
     <div className="row">
     <div className="col-6">Usuario : {nota.u_nombre}</div>          
     <div className="col-6">Fecha & Hora: {moment(nota.created_at).format('YYYY-MM-DD HH:mm') }</div>
     </div>
     <p>Notas: {nota.notas}</p>
    </div>
    
))}  
</div>
</>
)
}

export default ListarTareaNotas