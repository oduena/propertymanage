
const express = require('express');
const router = express.Router();
const db = require("../DbConnect");
const  verifyJWT  = require('../middleware/verifyJWT');

router.get("/", (req, res) => {
    const getsql = "SELECT p_id,nombre, nit, direccion, ciudad, telefono, cuentasbancos, email, claveemail, fechainicio, fechavence,datediff(fechavence,CURRENT_DATE) as daysleft FROM proyectos WHERE status='Activo' ORDER BY nombre";
    db.query(getsql, async (err, result) => {
        //  console.log(result);
        res.json(result);
     })
});

router.get("/list", (req, res) => {
    const getsql = "SELECT p.p_id,p.nombre FROM proyectos p WHERE status='Activo' ORDER BY nombre";
    db.query(getsql, async (err, result) => {
        //  console.log(result);
        res.json(result);
     })
});

router.get("/byId/:id", (req, res) => {
    const id = req.params.id;
    const getsql = (`SELECT p.*, datediff(fechavence,CURRENT_DATE) as daysleft FROM proyectos p WHERE p_id = "${id}"`);
    db.query(getsql, async(err, result) => {
        res.json(result);
        // console.log(result);
    })
});

router.get("/assignedProveedores/:id", (req, res) => {
    const id = req.params.id;
    // const getsql = (`SELECT pp.*,datediff(fechavence,CURRENT_DATE) as daysleft,s.nombre as servicio,pv.nombre as proveedor,pv.contacto as contacto,\
    // pv.email as email, pv.telefono as telefono FROM proyectos_proveedores pp INNER JOIN servicios s ON s.s_id = pp.s_id\
    // INNER JOIN proveedores pv ON pv.pv_id = pp.pv_id WHERE pp.p_id = "${id}" AND pp.fechavence <> '' ORDER BY pp.fechavence`);

   const getsql=(`SELECT pp.*,datediff(fechavence,CURRENT_DATE) as daysleft, pv.nombre as proveedor,pv.contacto as contacto,
pv.email as email, pv.telefono as telefono, pv.pv_id,(SELECT s.nombre FROM servicios s INNER JOIN proveedores pv ON pv.s_id=s.s_id 
    WHERE pv.pv_id=pp.pv_id) as servicio FROM proyectos_proveedores pp INNER JOIN proveedores pv ON pv.pv_id = pp.pv_id WHERE pp.p_id="${id}" ORDER BY pp.fechavence`);
    db.query(getsql, async (err, result) => {
        if(err){
            console.log(err);
        }
        res.json(result);
     })
});

router.get("/dashboard", (req, res) => {
    
   const getsql=("SELECT p_id,nombre,fechainicio,fechavence, datediff(fechavence,CURRENT_DATE) as daysleft FROM proyectos WHERE status='Activo' ORDER BY fechavence ASC LIMIT 10");
    db.query(getsql, async (err, result) => {
        if(err){
            console.log(err);
        }
        res.json(result);
     })
});

router.get("/dashboard/totalproyectos", (req, res) => {
    
    const getsql=("SELECT count(proyectos.p_id) As TotalProyectos FROM proyectos WHERE status='Activo'");
     db.query(getsql, async (err, result) => {
         if(err){
             console.log(err);
         }
         res.json(result);
      })
 });

router.post("/", (req, res) => {
    //console.log(req);
    // const proyecto = req.body;
   // console.log(req.body);
     const {nombre, direccion, nit, ciudad, telefono, cuentasbancos, email, claveemail, fechainicio, fechavence} = req.body;
     const addProyectosql = "INSERT INTO proyectos (nombre,nit,direccion,ciudad,telefono,cuentasbancos,email,claveemail,fechainicio,fechavence) VALUES (?,?,?,?,?,?,?,?,?,?)";
        db.query(addProyectosql, [nombre, nit, direccion, ciudad, telefono, cuentasbancos, email, claveemail, fechainicio, fechavence], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json(result);
    })
});

router.put("/editarProyectoinfobasica/:id", (req, res) => {
    const id = req.params.id;
    const {nombre, direccion, nit, ciudad, telefono, cuentasbancos, email, claveemail, fechainicio, fechavence} = req.body;
    const putsql = (`UPDATE proyectos SET nombre=?,nit=?,direccion=?,ciudad=?,telefono=?,cuentasbancos=?,email=?,claveemail=?,fechainicio=?,fechavence=?
    WHERE p_id=${id}`);
    db.query(putsql,[nombre, nit, direccion, ciudad, telefono, cuentasbancos, email, claveemail, fechainicio, fechavence], (err, result) => {
        if (err){
            console.log(err);
        } 
        res.json(result);
    })

});

router.put("/editarProyectoJur/:id", (req, res) => {
    const id = req.params.id;
    const {matricula, fechamatricula, numescritura, fechaescriturapublica, numfolios, notaria, tipopropiedad, localidad, barrio, estrato,nombreedificio} = req.body;
    const putsql = (`UPDATE proyectos SET matricula=?,fechamatricula=?,numescritura=?,fechaescriturapublica=?,numfolios=?,notaria=?,tipopropiedad=?,localidad=?,barrio=?,estrato=?,nombreedificio=?
    WHERE p_id=${id}`);
    db.query(putsql,[matricula, fechamatricula, numescritura, fechaescriturapublica, numfolios, notaria, tipopropiedad, localidad, barrio, estrato,nombreedificio], (err, result) => {
        if (err){
            console.log(err);
        } 
        res.json(result);
    })

});

router.put("/editarProyectoProveedor/:id", (req, res) => {
    const id = req.params.id;
    const {pv_id, fechainicio, fechavence, periodicidad} = req.body;
    const putsql = (`UPDATE proyectos_proveedores SET pv_id=?,fechainicio=?,fechavence=?,periodicidad=? WHERE pp_id=${id}`);
    db.query(putsql,[pv_id, fechainicio, fechavence, periodicidad], (err, result) => {
        if (err){
            console.log(err);
        } 
        res.json(result);
    })

});


router.delete("/borrarProyecto/:id", (req, res) =>{
const id = req.params.id;
const deletesql = (`UPDATE proyectos SET status='Inactivo' WHERE p_id=?`);
db.query(deletesql, [id], (err, result) =>{
    if (err){
        console.log(err);
    }
    res.json(result);
})
});


module.exports = router;