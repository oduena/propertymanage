
const express = require('express');
const { verify } = require('jsonwebtoken');
const router = express.Router();
const db = require("../DbConnect");
//const  validateJWT  = require('../middleware/validateJWT');
const  verifyJWT  = require('../middleware/verifyJWT');

router.get("/", (req, res) => {
    //console.log(req);
    const getsql = "SELECT s_id,nombre FROM servicios WHERE estado='Activo' ORDER BY nombre";
    db.query(getsql, async (err, result) => {
        // console.log(result);
        //if(err) throw err;
        if(err){return res.status(403).json({error: "Usuario no validado"});}
        res.json(result);
     })
});

router.get("/list", (req, res) => {
    //console.log(req);
    const getsql = "SELECT s_id,nombre FROM servicios WHERE estado='Activo' ORDER BY nombre";
    db.query(getsql, async (err, result) => {
        // console.log(result);
        //if(err) throw err;
        //if(err){return res.status(403).json({error: "Usuario no validado"});}
        res.json(result);
     })
});

router.post("/", (req, res) => {
    
    const {nombre} = req.body;
    const addServicioSql = "INSERT INTO servicios (nombre) VALUES (?)";
       db.query(addServicioSql, [nombre], (err, result) => {
       if (err) {
           console.log(err);
           result.status(400).json({ message: "Servicio NO se Agrego!"});
       }
       //res.json(result);
       res.status(200).json({ message: "Servicio ha sido Agregado!"});
   })
});

router.put("/editarServicio/:id", (req, res) => {
    const id = req.params.id;
    const {nombre} = req.body;
    //console.log(id,nombre);
    const editServicioSql = (`UPDATE servicios SET nombre=? WHERE s_id=?`);
       db.query(editServicioSql, [nombre,id], (err, result) => {
       if (err) {
        //   console.log(err);
           result.status(400).json({ message: "Servicio NO se Modifico!"});
       }
       //res.json(result);
       res.status(200).json({ message: "Servicio ha sido Modificado!"});
   })
});

router.delete("/borrarServicio/:id", (req, res) => {
    const id = req.params.id;
    const deleteServicioSql = (`UPDATE servicios SET estado="Inactivo" WHERE s_id=?`);
       db.query(deleteServicioSql, [id], (err, result) => {
       if (err) {
           console.log(err);
       }
       res.status(200).json({ message: "Servicio ha sido Eliminado!"});
       //res.json(result);
   })
});

module.exports = router;