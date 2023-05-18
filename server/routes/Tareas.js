const express = require('express');
const router = express.Router();
const db = require("../DbConnect");
const  verifyJWT  = require('../middleware/verifyJWT');

router.get("/", (req, res) => {
    const getsql = "SELECT t.*,p.nombre as proyecto,(SELECT u.nombre FROM users u WHERE u.id = t.asignadapor) As asignedby,\
    (SELECT u.nombre FROM users u WHERE u.id = t.asignadaa) As asignedto\
    FROM tareas t INNER JOIN proyectos p ON t.p_id = p.p_id WHERE t.estado <> 'Ejecutada' ORDER BY t.fechaasignada DESC";
    db.query(getsql, async (err, result) => {
        // console.log(result);
        if(err) throw err;
        res.json(result);
     })
});

router.get("/byP_Id/:id", (req, res) => {
    const id = req.params.id;
    const getsql = `SELECT t.*,p.nombre as proyecto,(SELECT u.nombre FROM users u WHERE u.id = t.asignadapor) As asignedby,\
    (SELECT u.nombre FROM users u WHERE u.id = t.asignadaa) As asignedto\
    FROM tareas t INNER JOIN proyectos p ON t.p_id = p.p_id WHERE t.p_id='${id}' AND t.estado <> 'Ejecutada' ORDER BY t.fechaasignada DESC`;
    db.query(getsql, async (err, result) => {
        // console.log(result);
        if(err) throw err;
        res.json(result);
     })
});

router.get("/byUser_AsignedTo/:id", (req, res) => {
    const id = req.params.id;
    const getsql = `SELECT t.*,p.nombre as proyecto,(SELECT u.nombre FROM users u WHERE u.id = t.asignadapor) As asignedby,\
    (SELECT u.nombre FROM users u WHERE u.id = t.asignadaa) As asignedto\
    FROM tareas t INNER JOIN proyectos p ON t.p_id = p.p_id WHERE t.asignadaa='${id}' AND t.estado <> 'Ejecutada' ORDER BY t.fechaasignada DESC`;
    db.query(getsql, async (err, result) => {
        // console.log(result);
        if(err) throw err;
        res.json(result);
     })
});

router.get("/ByP_idbyUser_Asigned", (req, res) => {
    const user_id = req.query.user_id;
    const p_id = req.query.p_id;
    const getsql = `SELECT t.*,p.nombre as proyecto,(SELECT u.nombre FROM users u WHERE u.id = t.asignadapor) As asignedby,\
    (SELECT u.nombre FROM users u WHERE u.id = t.asignadaa) As asignedto\
    FROM tareas t INNER JOIN proyectos p ON t.p_id = p.p_id WHERE t.asignadaa='${user_id}' AND t.p_id='${p_id}' AND t.estado <> 'Ejecutada' ORDER BY t.fechaasignada DESC`;
    db.query(getsql, async (err, result) => {
        // console.log(result);
        if(err) throw err;
        res.json(result);
     })
});

router.post("/", (req, res) => {

   const createdat = new Date()
     const {p_id,descripcion, asignadapor, asignadaa, fechaasignada, estado} = req.body;
     const addTareasql = "INSERT INTO tareas (p_id,descripcion,asignadapor,asignadaa,fechaasignada,estado) VALUES (?,?,?,?,?,?)";
        db.query(addTareasql, [p_id,descripcion, asignadapor, asignadaa, createdat, estado], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json(result);
    })
});

router.post("/AddTareaNotas",(req, res)=>{
    const {t_id, tarea_nota,username} = req.body;
    const createdat = new Date();
    const addTareaNotasql = "INSERT INTO tareas_notas (t_id, notas,u_nombre,created_at) VALUES (?,?,?,?)";
    db.query(addTareaNotasql,[t_id,tarea_nota,username,createdat],(err,result) =>{
        if(err){
            console.log(err);
        }
        res.json(result);
    })
    });
    

router.put("/editarTarea/:id", (req, res) => {
    const id = req.params.id;
    const {p_id,descripcion, asignadapor, asignadaa, fechaasignada, fechaterminada, estado} = req.body;
    if(estado==="Ejecutada"){
        const enddate = new Date();
        const putsql = (`UPDATE tareas SET p_id=?,descripcion=?,asignadapor=?,asignadaa=?,fechaasignada=?,fechaterminada=?,estado=? WHERE t_id=${id}`);
        db.query(putsql,[p_id,descripcion, asignadapor, asignadaa, fechaasignada, enddate, estado], (err, result) => {
            if (err){
                console.log(err);
            } 
            res.json(result);
        })
    }else{
        const putsql = (`UPDATE tareas SET p_id=?,descripcion=?,asignadapor=?,asignadaa=?,fechaasignada=?,fechaterminada=?,estado=? WHERE t_id=${id}`);
        db.query(putsql,[p_id,descripcion, asignadapor, asignadaa, fechaasignada, fechaterminada, estado], (err, result) => {
            if (err){
                console.log(err);
            } 
            res.json(result);
        })
    }
});

router.delete("/borrarTarea/:id", (req, res) => {
    const id = req.params.id;

    const deleteServicioSql = (`DELETE FROM tareas WHERE t_id=?`);
       db.query(deleteServicioSql, [id], (err, result) => {
       if (err) {
           console.log(err);
       }
       res.status(200).json({ message: "Tarea ha sido Eliminada!"});
       //res.json(result);
   })
});



router.get("/getTareaNotasByt_id/:id", (req, res) => {

    const id = req.params.id;

    const getsql = (`SELECT tn.* FROM tareas_notas tn WHERE t_id = '${id}' ORDER BY created_at DESC`);
    db.query(getsql, async(err, result) => {
        if (err){
            console.log(err);
        }
        res.json(result);
    })
});

// router.get("/dashboard/:id", (req,res) => {
//     const id = req.params.id;
//     console.log(id);
//     const getsql = (`SELECT t.*,p.nombre as proyecto,(SELECT u.nombre FROM users u WHERE u.id = t.asignadapor) As asignedby,\
//     (SELECT u.nombre FROM users u WHERE u.id = t.asignadaa) As asignedto\
//     FROM tareas t INNER JOIN proyectos p ON t.p_id = p.p_id WHERE t.asignadaa='${id}' AND t.estado <> 'Ejecutada' ORDER BY t.fechaasignada DESC`);
//     db.query(getsql, async(err, result) => {
//         if (err){
//             console.log(err);
//         }
//         res.json(result);
//     })
// });

router.get("/dashboard/porcentajecompletadas", (req, res) => {

    const getsql = ("SELECT count(t.t_id) AS 'TotalTareas', (SELECT count(t.t_id) FROM tareas t WHERE t.estado='Ejecutada') AS 'TotalCompleted' FROM tareas t");
    db.query(getsql, async(err, result) => {
        if(err) {
            console.log(err);
        }
        res.json(result);
    })
});


module.exports = router;