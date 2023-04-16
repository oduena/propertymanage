import moment from "moment";

const ListarMantenimientoNotas = ({mantenimientonotas}) => {

return (
 <>
 <div className="notas-container">
{mantenimientonotas.map((nota)=>(
    
    <div className="card shadow mb-2">
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

export default ListarMantenimientoNotas