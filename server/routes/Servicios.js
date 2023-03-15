
const express = require('express');
const { verify } = require('jsonwebtoken');
const router = express.Router();
const db = require("../DbConnect");
//const  validateJWT  = require('../middleware/validateJWT');
const  verifyJWT  = require('../middleware/verifyJWT');

router.get("/", (req, res) => {
    //console.log(req);
    const getsql = "SELECT s_id,nombre FROM servicios WHERE status='Activo' ORDER BY nombre";
    db.query(getsql, async (err, result) => {
        // console.log(result);
        //if(err) throw err;
        if(err){return res.status(403).json({error: "Usuario no validado"});}
        res.json(result);
     })
});

router.get("/list", (req, res) => {
    //console.log(req);
    const getsql = "SELECT s_id,nombre FROM servicios WHERE status='Activo' ORDER BY nombre";
    db.query(getsql, async (err, result) => {
        // console.log(result);
        //if(err) throw err;
        if(err){return res.status(403).json({error: "Usuario no validado"});}
        res.json(result);
     })
});

router.post("/", (req, res) => {
    
    const {nombre} = req.body;
    const addServicioSql = "INSERT INTO servicios (nombre) VALUES (?)";
       db.query(addServicioSql, [nombre], (err, result) => {
       if (err) {
           console.log(err);
       }
       res.json(result);
       
   })
});

router.put("/editarServicio/:id", (req, res) => {
    const id = req.params.id;
    const {nombre} = req.body;
    //console.log(id,nombre);
    const editServicioSql = (`UPDATE servicios SET nombre=? WHERE s_id=?`);
       db.query(editServicioSql, [nombre,id], (err, result) => {
       if (err) {
           console.log(err);
       }
       res.json(result);
   })
});

router.delete("/borrarServicio/:id", (req, res) => {
    const id = req.params.id;
    //const {nombre} = req.body;
    //console.log(id,nombre);
    const deleteServicioSql = (`UPDATE servicios SET status="Inactivo" WHERE s_id=?`);
       db.query(deleteServicioSql, [id], (err, result) => {
       if (err) {
           console.log(err);
       }
       res.json(result);
   })
});

module.exports = router;