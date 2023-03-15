
const express = require('express');
const router = express.Router();
const db = require("../DbConnect");
const  verifyJWT  = require('../middleware/verifyJWT');

router.get("/", (req, res) => {
    const getsql = "SELECT pv.*,s.nombre AS servicio FROM proveedores pv INNER JOIN servicios s WHERE s.s_id = pv.s_id AND pv.status ='Activo' ORDER BY pv.nombre";
    db.query(getsql, async (err, result) => {
        //  console.log(result);
        res.json(result);
     })
});

router.get("/list", (req, res) => {
    const getsql = "SELECT pv.pv_id,pv.nombre FROM proveedores pv INNER JOIN servicios s WHERE s.s_id = pv.s_id AND pv.status='Activo' ORDER BY nombre";
    db.query(getsql, async (err, result) => {
        if(err){
            console.log(err);
        }
        res.json(result);
     })
});

router.get("/list/byProyecto/:id", (req, res) => {
    const id = req.params.id;
    const getsql = (`SELECT pv.pv_id, pv.nombre FROM proyectos_proveedores pp INNER JOIN proveedores pv ON pv.pv_id = pp.pv_id WHERE pp.p_id="${id}" AND pv.status='Activo' ORDER BY pv.nombre`);
    db.query(getsql, async (err, result) => {
        if(err){
            console.log(err);
        }
        res.json(result);
     })
});

router.get("/byId/:id", (req, res) => {
    const id = req.params.id;
    const getsql = (`SELECT * FROM proveedores WHERE pv_id = "${id}"`);
    db.query(getsql, async(err, result) => {
        res.json(result);
        // console.log(result);
    })
});

router.get("/getServiciobypv_id/:id", (req, res) => {
    const id = req.params.id;
    const getsql = (`SELECT pv.pv_id, s.nombre as servicio,'1' as periodicidad FROM proveedores pv INNER JOIN servicios s ON s.s_id = pv.s_id WHERE pv.pv_id = "${id}"`);
    db.query(getsql, async(err, result) => {
        if(err){
            console.log(err)
        }
        res.json(result);
        // console.log(result);
    })
});

router.get("/getServiciofromPPbypv_id", (req, res) => {
    const p_id = req.query.p_id;
    const pv_id = req.query.pv_id;
    const getsql = (`SELECT pp.pv_id,pp.p_id,(SELECT s.nombre FROM servicios s INNER JOIN proveedores pv ON pv.s_id=s.s_id
        WHERE pv.pv_id=pp.pv_id) as servicio,pp.periodicidad FROM proyectos_proveedores pp WHERE pp.p_id = "${p_id}" AND pp.pv_id="${pv_id}"`);
    db.query(getsql, async(err, result) => {
        if(err){
            console.log(err)
        }
        res.json(result);
        // console.log(result);
    })
});


router.get("/byS_Id/:id", (req, res) => {
    const id = req.params.id;
    const getsql = (`SELECT pv.*,s.nombre AS servicio FROM proveedores pv INNER JOIN servicios s WHERE s.s_id = pv.s_id AND pv.s_id = "${id}" AND pv.status='Activo' ORDER BY pv.nombre`);
    db.query(getsql, async(err, result) => {
        res.json(result);
        // console.log(result);
    })
});


router.get("/dashboard", (req, res) => {
    const getsql = ("SELECT pp.pp_id,pp.fechainicio,pp.fechavence,p.nombre as proyecto,pv.nombre as proveedor,\
    datediff(pp.fechavence,CURRENT_DATE) as daysleft,\
    (SELECT s.nombre FROM servicios s INNER JOIN proveedores pv ON pv.s_id=s.s_id\
        WHERE pv.pv_id=pp.pv_id) as servicio FROM proyectos_proveedores pp\
    INNER JOIN proyectos p on p.p_id = pp.p_id\
    INNER JOIN proveedores pv on pv.pv_id = pp.pv_id\
    ORDER BY pp.fechavence ASC LIMIT 10");
    db.query(getsql, async (err, result) => {
        //  console.log(result);
        res.json(result);
     })
});

router.post("/", (req, res) => {
    //console.log(req);
    // const proyecto = req.body;
   // console.log(req.body);
     const {nombre,nit,cuenta,email,contacto,telefono,s_id} = req.body;
     const addProveedorsql = "INSERT INTO proveedores (nombre,nit,cuenta,email,contacto,telefono,s_id) VALUES (?,?,?,?,?,?,?)";
        db.query(addProveedorsql, [nombre,nit,cuenta, email,contacto, telefono,s_id], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json(result);
    })
});

router.post("/AddProveedorProyecto", (req, res) => {
    // const proyecto = req.body;
     const {p_id,pv_id,fechainicio,fechavence,periodicidad} = req.body;
     const addProveedorsql = "INSERT INTO proyectos_proveedores (p_id,pv_id,fechainicio,fechavence,periodicidad) VALUES (?,?,?,?,?)";
        db.query(addProveedorsql, [p_id,pv_id,fechainicio,fechavence,periodicidad], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json(result);
    })
});

router.put("/editarProveedor/:id", (req, res) => {
    const id = req.params.id;
    const {s_id,nombre, nit, contacto, telefono, cuenta, email} = req.body;
    const putsql = (`UPDATE proveedores SET s_id=?,nombre=?,nit=?,contacto=?,telefono=?,cuenta=?,email=? WHERE pv_id=${id}`);
    db.query(putsql,[s_id,nombre, nit, contacto, telefono, cuenta, email], (err, result) => {
        if (err){
            console.log(err);
        } 
        res.json(result);
    })

});



router.delete("/borrarProveedor/:id", (req, res) =>{
const id = req.params.id;
const deletesql = (`UPDATE proveedores SET status='Inactivo' WHERE pv_id=?`);
db.query(deletesql, [id], (err, result) =>{
    if (err){
        console.log(err);
    }
    res.json(result);
})
});


module.exports = router;