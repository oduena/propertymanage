const express = require('express');
const router = express.Router();
const db = require("../DbConnect");
//const verifyJWT = require('../middleware/verifyJWT');
const moment = require('moment');

router.get("/", (req, res) => {
    // const getsql = "SELECT m.*, p.nombre as proyecto,pv.nombre as proveedor,s.nombre as servicio\
    // FROM mantenimientos m  INNER JOIN proyectos p ON p.p_id = m.p_id INNER JOIN proveedores pv ON pv.pv_id = m.pv_id\
    // INNER JOIN servicios s ON s.s_id = m.s_id WHERE m.estado <> 'Ejecutado' AND p.status = 'Activo' ORDER BY m.fecha";
    const currentyear = new Date().getFullYear();
    const getsql = `SELECT m.*, p.nombre as proyecto,pv.nombre as proveedor,(SELECT s.nombre FROM servicios s INNER JOIN proveedores pv ON pv.s_id=s.s_id\
        WHERE pv.pv_id=m.pv_id) as servicio\
        FROM mantenimientos m  INNER JOIN proyectos p ON p.p_id = m.p_id INNER JOIN proveedores pv ON pv.pv_id = m.pv_id\
        WHERE m.fecha >='${currentyear}-01-01' AND m.fecha <='${currentyear}-12-31' AND m.estado <> 'Ejecutado' AND p.estado = 'Activo' ORDER BY m.fecha`;
    db.query(getsql, async (err, result) => {
        //  console.log(result);
        res.json(result);
     })
});

router.get("/byId/:id",(req, res)=>{
    const id = req.params.id;
    const getsql = (`SELECT m.*, p.nombre as proyecto,pv.nombre as proveedor,(SELECT s.nombre FROM servicios s INNER JOIN proveedores pv ON pv.s_id=s.s_id\
        WHERE pv.pv_id=m.pv_id) as servicio\
        FROM mantenimientos m  INNER JOIN proyectos p ON p.p_id = m.p_id INNER JOIN proveedores pv ON pv.pv_id = m.pv_id\
        WHERE m.m_id='${id}'`);
    db.query(getsql, async(err, result)=>{
        res.json(result);
    })
});

router.get("/byP_Id/:id", (req, res) => {
    const id = req.params.id;
    const currentyear = new Date().getFullYear();
    const getsql = (`SELECT m.*, p.nombre as proyecto,pv.nombre as proveedor,(SELECT s.nombre FROM servicios s INNER JOIN proveedores pv ON pv.s_id=s.s_id\
    WHERE pv.pv_id=m.pv_id) as servicio\
    FROM mantenimientos m  INNER JOIN proyectos p ON p.p_id = m.p_id INNER JOIN proveedores pv ON pv.pv_id = m.pv_id\
    WHERE m.fecha >='${currentyear}-01-01' AND m.fecha <='${currentyear}-12-31' AND m.estado <> 'Ejecutado' AND m.p_id="${id}" ORDER BY m.fecha`);
    db.query(getsql, async(err, result) => {
        res.json(result);
        // console.log(result);
    })
});

router.get("/byDate", (req, res) => {
    const datestart = req.query.datestart;
    const dateend = req.query.dateend;
    //console.log(datestart,dateend);
    // const getsql = (`SELECT m.*, p.nombre as proyecto,pv.nombre as proveedor,s.nombre as servicio\
    // FROM mantenimientos m  INNER JOIN proyectos p ON p.p_id = m.p_id INNER JOIN proveedores pv ON pv.pv_id = m.pv_id\
    // INNER JOIN servicios s ON s.s_id = m.s_id WHERE m.estado <> 'Ejecutado' 
    // AND m.fecha >= "${datestart}" AND m.fecha <= "${dateend}" AND p.status ='Activo' ORDER BY m.fecha`);
    const getsql = (`SELECT m.*, p.nombre as proyecto,pv.nombre as proveedor,(SELECT s.nombre FROM servicios s INNER JOIN proveedores pv ON pv.s_id=s.s_id\
    WHERE pv.pv_id=m.pv_id) as servicio\
    FROM mantenimientos m  INNER JOIN proyectos p ON p.p_id = m.p_id INNER JOIN proveedores pv ON pv.pv_id = m.pv_id\
    WHERE m.estado <> 'Ejecutado' AND m.fecha >= "${datestart}" AND m.fecha <= "${dateend}" AND p.estado ='Activo' ORDER BY m.fecha`);
    db.query(getsql, async(err, result) => {
        res.json(result);
        // console.log(result);
    })
});

router.get("/byDatebyPid", (req, res) => {
    const datestart = req.query.datestart;
    const dateend = req.query.dateend;
    const id = req.query.p_id;
    //console.log(datestart,dateend);
    // const getsql = (`SELECT m.*, p.nombre as proyecto,pv.nombre as proveedor,s.nombre as servicio\
    // FROM mantenimientos m  INNER JOIN proyectos p ON p.p_id = m.p_id INNER JOIN proveedores pv ON pv.pv_id = m.pv_id\
    // INNER JOIN servicios s ON s.s_id = m.s_id WHERE m.estado <> 'Ejecutado' 
    // AND m.fecha >= "${datestart}" AND m.fecha <= "${dateend}" AND p.status ='Activo' ORDER BY m.fecha`);
    const getsql = (`SELECT m.*, p.nombre as proyecto,pv.nombre as proveedor,(SELECT s.nombre FROM servicios s INNER JOIN proveedores pv ON pv.s_id=s.s_id\
    WHERE pv.pv_id=m.pv_id) as servicio\
    FROM mantenimientos m  INNER JOIN proyectos p ON p.p_id = m.p_id INNER JOIN proveedores pv ON pv.pv_id = m.pv_id\
    WHERE m.estado <> 'Ejecutado' AND m.fecha >= "${datestart}" AND m.fecha <= "${dateend}" AND p.estado ='Activo' AND m.p_id="${id}" ORDER BY m.fecha`);
    db.query(getsql, async(err, result) => {
        res.json(result);
        // console.log(result);
    })
});

router.get("/dashboard", (req, res) => {
    //const currentdate = new Date().toString();
    let today = new Date().toISOString().slice(0, 10)
    const getsql = (`SELECT m.*, p.nombre as proyecto,pv.nombre as proveedor,(SELECT s.nombre FROM servicios s INNER JOIN proveedores pv ON pv.s_id=s.s_id\
        WHERE pv.pv_id=m.pv_id) as servicio\
        FROM mantenimientos m INNER JOIN proyectos p ON p.p_id = m.p_id INNER JOIN proveedores pv ON pv.pv_id = m.pv_id\
        WHERE m.fecha >= "${today}" AND p.estado='Activo' AND m.estado <> 'Ejecutado'\
        ORDER BY m.fecha,m.hora ASC LIMIT 15`);
    db.query(getsql, async(err, result) => {
        res.json(result);
        // console.log(result);
    })
});

router.get("/dashboard/totalmantenimientos", (req, res) => {
    //const currentdate = new Date().toString();
    let date = new Date();
    //let date = "2023-04-26";
    
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    //console.log(firstDay, lastDay);
    const getsql = (`SELECT count(m.m_id) AS TotalMantenimientos FROM mantenimientos m INNER JOIN proyectos p\
     ON m.p_id = p.p_id WHERE fecha >='${moment(firstDay).format('YYYY-MM-DD')}' AND fecha<='${moment(lastDay).format('YYYY-MM-DD')}' AND p.estado='Activo'`);
    db.query(getsql, async(err, result) => {
        res.json(result);
        //console.log(result);
    })
});

// router.post("/", (req,res) => {
//     const {p_id,pv_id,fecha,hora,periodicidad,estado,notas} = req.body;
//     const addProveedorsql = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
//         db.query(addProveedorsql, [p_id,pv_id,fecha,hora,periodicidad,estado,notas], (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         //console.log(json(result));
//         res.json(result);
//         })
// });
router.post("/AddMantenientoNotas",(req, res)=>{
const {m_id, mant_nota,username} = req.body;
const createdate = new Date();
const addMantNotasql = "INSERT INTO mantenimientos_notas (m_id, notas,u_nombre,created_at) VALUES (?,?,?,?)";
db.query(addMantNotasql,[m_id,mant_nota,username,createdate],(err,result) =>{
    if(err){
        console.log(err);
    }
    res.json(result);
})
});

router.post("/", (req, res) => {
    
     const {p_id,pv_id,fecha,hora,periodicidad,estado,notas} = req.body;
     const nummant = req.body.periodicidad;

//console.log("numero de mant"+nummant)
    switch(nummant)
    {
        case '1':
     const addMantsql = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsql, [p_id,pv_id,fecha,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json(result);
        })
        break;
        case '2':
        
            const addMantsqlCase21 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
            db.query(addMantsqlCase21, [p_id,pv_id,fecha,hora,periodicidad,estado,notas], (err, result) => {
            if (err) {
                console.log(err);
            }
            });
            const newFecha22 = new Date(req.body.fecha);
            newFecha22.setDate(newFecha22.getDate()+180);
            const addMantsqlCase22 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
            db.query(addMantsqlCase22, [p_id,pv_id,newFecha22,hora,periodicidad,estado,notas], (err, result) => {
            if (err) {
                console.log(err);
            }
        });
        res.json({statusCode:200});

        break;
        case '3' :      
            const addMantsqlCase31 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
            db.query(addMantsqlCase31, [p_id,pv_id,fecha,hora,periodicidad,estado,notas], (err, result) => {
            if (err) {
                console.log(err);
            }
        });
        const newFecha32 = new Date(req.body.fecha);
        newFecha32.setDate(newFecha32.getDate()+120);
        const addMantsqlCase32 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase32, [p_id,pv_id,newFecha32,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });

        const newFecha33 = new Date(newFecha32);
        newFecha33.setDate(newFecha33.getDate()+120);
        const addMantsqlCase33 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase33, [p_id,pv_id,newFecha33,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });
        

        res.json({statusCode:200});

        break;
        case '4' :
        const addMantsqlCase41 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
            db.query(addMantsqlCase41, [p_id,pv_id,fecha,hora,periodicidad,estado,notas], (err, result) => {
            if (err) {
                console.log(err);
            }
        });
        const newFecha42 = new Date(req.body.fecha);
        newFecha42.setDate(newFecha42.getDate()+90);
        const addMantsqlCase42 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase42, [p_id,pv_id,newFecha42,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });
        const newFecha43 = new Date(newFecha42);
        newFecha43.setDate(newFecha43.getDate()+90);
        const addMantsqlCase43 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase43, [p_id,pv_id,newFecha43,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });
        const newFecha44 = new Date(newFecha43);
        newFecha44.setDate(newFecha44.getDate()+90);
        const addMantsqlCase44 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase44, [p_id,pv_id,newFecha44,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });

        res.json({statusCode:200});

        break;

        case '6' :
            const addMantsqlCase61 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
            db.query(addMantsqlCase61, [p_id,pv_id,fecha,hora,periodicidad,estado,notas], (err, result) => {
            if (err) {
                console.log(err);
            }
        });
        const newFecha62 = new Date(req.body.fecha);
        newFecha62.setDate(newFecha62.getDate()+60);
        const addMantsqlCase62 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase62, [p_id,pv_id,newFecha62,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });
        const newFecha63 = new Date(newFecha62);
        newFecha63.setDate(newFecha63.getDate()+60);
        const addMantsqlCase63 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase63, [p_id,pv_id,newFecha63,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });
        const newFecha64 = new Date(newFecha63);
        newFecha64.setDate(newFecha64.getDate()+60);
        const addMantsqlCase64 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase64, [p_id,pv_id,newFecha64,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });
        const newFecha65 = new Date(newFecha64);
        newFecha65.setDate(newFecha65.getDate()+60);
        const addMantsqlCase65 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase65, [p_id,pv_id,newFecha65,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });

        const newFecha66 = new Date(newFecha65);
        newFecha66.setDate(newFecha66.getDate()+60);
        const addMantsqlCase66 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase66, [p_id,pv_id,newFecha66,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });

        res.json({statusCode:200});
        break;

        case '12' :
            const addMantsqlCase121 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
            db.query(addMantsqlCase121, [p_id,pv_id,fecha,hora,periodicidad,estado,notas], (err, result) => {
            if (err) {
                console.log(err);
            }
        });
        const newFecha122 = new Date(req.body.fecha);
        newFecha122.setDate(newFecha122.getDate()+30);
        const addMantsqlCase122 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase122, [p_id,pv_id,newFecha122,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });
        const newFecha123 = new Date(newFecha122);
        newFecha123.setDate(newFecha123.getDate()+30);
        const addMantsqlCase123 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase123, [p_id,pv_id,newFecha123,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });
        const newFecha124 = new Date(newFecha123);
        newFecha124.setDate(newFecha124.getDate()+30);
        const addMantsqlCase124 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase124, [p_id,pv_id,newFecha124,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });
        const newFecha125 = new Date(newFecha124);
        newFecha125.setDate(newFecha125.getDate()+30);
        const addMantsqlCase125 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase125, [p_id,pv_id,newFecha125,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });

        const newFecha126 = new Date(newFecha125);
        newFecha126.setDate(newFecha126.getDate()+30);
        const addMantsqlCase126 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase126, [p_id,pv_id,newFecha126,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });
        
        const newFecha127 = new Date(newFecha126);
        newFecha127.setDate(newFecha127.getDate()+30);
        const addMantsqlCase127 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase127, [p_id,pv_id,newFecha127,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });
        
        const newFecha128 = new Date(newFecha127);
        newFecha128.setDate(newFecha128.getDate()+30);
        const addMantsqlCase128 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase128, [p_id,pv_id,newFecha128,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });
        const newFecha129 = new Date(newFecha128);
        newFecha129.setDate(newFecha129.getDate()+30);
        const addMantsqlCase129 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase129, [p_id,pv_id,newFecha129,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });
        const newFecha130 = new Date(newFecha129);
        newFecha130.setDate(newFecha130.getDate()+30);
        const addMantsqlCase130 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase130, [p_id,pv_id,newFecha130,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });
        const newFecha131 = new Date(newFecha130);
        newFecha131.setDate(newFecha131.getDate()+30);
        const addMantsqlCase131 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase131, [p_id,pv_id,newFecha131,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });
        const newFecha132 = new Date(newFecha131);
        newFecha132.setDate(newFecha132.getDate()+30);
        const addMantsqlCase132 = "INSERT INTO mantenimientos (p_id,pv_id,fecha,hora,periodicidad,estado,notas) VALUES (?,?,?,?,?,?,?)";
        db.query(addMantsqlCase132, [p_id,pv_id,newFecha132,hora,periodicidad,estado,notas], (err, result) => {
        if (err) {
            console.log(err);
        }
        });
        
        res.json({statusCode:200});
        break;

    }
});

router.put("/editarMantenimiento/:id", (req, res) => {
    const id = req.params.id;
    const {p_id,pv_id,fecha, hora, estado, notas} = req.body;
    const putsql = (`UPDATE mantenimientos SET p_id=?,pv_id=?,fecha=?,hora=?,estado=?,notas=? WHERE m_id=${id}`);
    db.query(putsql,[p_id,pv_id,fecha, hora, estado, notas], (err, result) => {
        if (err){
            console.log(err);
        } 
        res.json(result);
    })
});

router.get("/calendar", (req, res) => {
    const currentyear = new Date().getFullYear();
    //console.log(currentyear);
    const getsql = `SELECT man.m_id,p.nombre as proyecto,prov.nombre as proveedor, (SELECT s.nombre FROM servicios s INNER JOIN proveedores pv ON pv.s_id=s.s_id\
        WHERE pv.pv_id=man.pv_id) as servicio,\
    max(case month(man.fecha) when '1' THEN man.fecha ELSE '' end) enero,\
    max(case month(man.fecha) when '2' THEN man.fecha ELSE '' end) febrero,\
    max(case month(man.fecha) when '3' THEN man.fecha ELSE '' end) marzo,\
    max(case month(man.fecha) when '4' THEN man.fecha ELSE '' end) abril,\
    max(case month(man.fecha) when '5' THEN man.fecha ELSE '' end) mayo,\
    max(case month(man.fecha) when '6' THEN man.fecha ELSE '' end) junio,\
    max(case month(man.fecha) when '7' THEN man.fecha ELSE '' end) julio,\
    max(case month(man.fecha) when '8' THEN man.fecha ELSE '' end) agosto,\
    max(case month(man.fecha) when '9' THEN man.fecha ELSE '' end) septiembre,\
    max(case month(man.fecha) when '10' THEN man.fecha ELSE '' end) octubre,\
    max(case month(man.fecha) when '11' THEN man.fecha ELSE '' end) noviembre,\
    max(case month(man.fecha) when '12' THEN man.fecha ELSE '' end) diciembre,\
    man.hora\
    FROM mantenimientos man\
    INNER JOIN proyectos p ON p.p_id = man.p_id\
    INNER JOIN proveedores prov ON prov.pv_id = man.pv_id\
    WHERE man.fecha >= '${currentyear}-01-01' AND man.fecha <= '${currentyear}-12-31' AND man.estado <> 'Ejecutado' AND p.estado='Activo'\
    GROUP BY man.m_id,man.hora,proveedor,servicio\
    ORDER BY man.fecha ASC,proyecto,proveedor`;
    db.query(getsql, async (err, result) => {
       if(err){
        console.log(err);
       }
       res.json(result);
     })
});

router.get("/calendar/byYear/:yearid", (req, res) => {
    const yearid = req.params.yearid;
    //console.log(yearid)
    const getsql = `SELECT man.m_id,p.nombre as proyecto,prov.nombre as proveedor, (SELECT s.nombre FROM servicios s INNER JOIN proveedores pv ON pv.s_id=s.s_id\
        WHERE pv.pv_id=man.pv_id) as servicio,\
    max(case month(man.fecha) when '1' THEN man.fecha ELSE '' end) enero,\
    max(case month(man.fecha) when '2' THEN man.fecha ELSE '' end) febrero,\
    max(case month(man.fecha) when '3' THEN man.fecha ELSE '' end) marzo,\
    max(case month(man.fecha) when '4' THEN man.fecha ELSE '' end) abril,\
    max(case month(man.fecha) when '5' THEN man.fecha ELSE '' end) mayo,\
    max(case month(man.fecha) when '6' THEN man.fecha ELSE '' end) junio,\
    max(case month(man.fecha) when '7' THEN man.fecha ELSE '' end) julio,\
    max(case month(man.fecha) when '8' THEN man.fecha ELSE '' end) agosto,\
    max(case month(man.fecha) when '9' THEN man.fecha ELSE '' end) septiembre,\
    max(case month(man.fecha) when '10' THEN man.fecha ELSE '' end) octubre,\
    max(case month(man.fecha) when '11' THEN man.fecha ELSE '' end) noviembre,\
    max(case month(man.fecha) when '12' THEN man.fecha ELSE '' end) diciembre,\
    man.hora
    FROM mantenimientos man\
    INNER JOIN proyectos p ON p.p_id = man.p_id\
    INNER JOIN proveedores prov ON prov.pv_id = man.pv_id\
    WHERE man.fecha >= '${yearid}-01-01' AND man.fecha <= '${yearid}-12-31' AND man.estado <> 'Ejecutado' AND p.estado='Activo'\
    GROUP BY man.m_id,man.hora,proveedor,servicio\
    ORDER BY man.fecha ASC,proyecto,proveedor`;
    db.query(getsql, async (err, result) => {
       if(err){
        console.log(err);
       }
       res.json(result);
     })
});

router.get("/calendar/byP_Id/:id", (req, res) => {
    const id = req.params.id;
    const currentyear = new Date().getFullYear();
    const getsql = `SELECT man.m_id,p.nombre as proyecto,prov.nombre as proveedor, (SELECT s.nombre FROM servicios s INNER JOIN proveedores pv ON pv.s_id=s.s_id\
        WHERE pv.pv_id=man.pv_id) as servicio,\
    max(case month(man.fecha) when '1' THEN man.fecha ELSE '' end) enero,\
    max(case month(man.fecha) when '2' THEN man.fecha ELSE '' end) febrero,\
    max(case month(man.fecha) when '3' THEN man.fecha ELSE '' end) marzo,\
    max(case month(man.fecha) when '4' THEN man.fecha ELSE '' end) abril,\
    max(case month(man.fecha) when '5' THEN man.fecha ELSE '' end) mayo,\
    max(case month(man.fecha) when '6' THEN man.fecha ELSE '' end) junio,\
    max(case month(man.fecha) when '7' THEN man.fecha ELSE '' end) julio,\
    max(case month(man.fecha) when '8' THEN man.fecha ELSE '' end) agosto,\
    max(case month(man.fecha) when '9' THEN man.fecha ELSE '' end) septiembre,\
    max(case month(man.fecha) when '10' THEN man.fecha ELSE '' end) octubre,\
    max(case month(man.fecha) when '11' THEN man.fecha ELSE '' end) noviembre,\
    max(case month(man.fecha) when '12' THEN man.fecha ELSE '' end) diciembre,\
    man.hora
    FROM mantenimientos man\
    INNER JOIN proyectos p ON p.p_id = man.p_id\
    INNER JOIN proveedores prov ON prov.pv_id = man.pv_id\
    WHERE man.fecha >= '${currentyear}-01-01' AND man.fecha <= '${currentyear}-12-31' AND man.estado <> 'Ejecutado' AND p.estado='Activo' AND p.p_id=${id}\
    GROUP BY man.m_id,man.hora,proveedor,servicio\
    ORDER BY man.fecha,proyecto,proveedor`;
    db.query(getsql, async (err, result) => {
       if(err){
        console.log(err);
       }
       res.json(result);
     })
});

router.get("/calendar/byYearbyPid", (req, res) => {
    const yearid = req.query.yearid;
    const p_id = req.query.p_id;
    //console.log(yearid, p_id);
    // const getsql = (`SELECT m.*, p.nombre as proyecto,pv.nombre as proveedor,s.nombre as servicio\
    // FROM mantenimientos m  INNER JOIN proyectos p ON p.p_id = m.p_id INNER JOIN proveedores pv ON pv.pv_id = m.pv_id\
    // INNER JOIN servicios s ON s.s_id = m.s_id WHERE m.estado <> 'Ejecutado' 
    // AND m.fecha >= "${datestart}" AND m.fecha <= "${dateend}" AND p.status ='Activo' ORDER BY m.fecha`);
    const getsql = (`SELECT man.m_id,p.nombre as proyecto,prov.nombre as proveedor, (SELECT s.nombre FROM servicios s INNER JOIN proveedores pv ON pv.s_id=s.s_id\
        WHERE pv.pv_id=man.pv_id) as servicio,\
    max(case month(man.fecha) when '1' THEN man.fecha ELSE '' end) enero,\
    max(case month(man.fecha) when '2' THEN man.fecha ELSE '' end) febrero,\
    max(case month(man.fecha) when '3' THEN man.fecha ELSE '' end) marzo,\
    max(case month(man.fecha) when '4' THEN man.fecha ELSE '' end) abril,\
    max(case month(man.fecha) when '5' THEN man.fecha ELSE '' end) mayo,\
    max(case month(man.fecha) when '6' THEN man.fecha ELSE '' end) junio,\
    max(case month(man.fecha) when '7' THEN man.fecha ELSE '' end) julio,\
    max(case month(man.fecha) when '8' THEN man.fecha ELSE '' end) agosto,\
    max(case month(man.fecha) when '9' THEN man.fecha ELSE '' end) septiembre,\
    max(case month(man.fecha) when '10' THEN man.fecha ELSE '' end) octubre,\
    max(case month(man.fecha) when '11' THEN man.fecha ELSE '' end) noviembre,\
    max(case month(man.fecha) when '12' THEN man.fecha ELSE '' end) diciembre,\
    man.hora
    FROM mantenimientos man\
    INNER JOIN proyectos p ON p.p_id = man.p_id\
    INNER JOIN proveedores prov ON prov.pv_id = man.pv_id\
    WHERE man.fecha >= '${yearid}-01-01' AND man.fecha <= '${yearid}-12-31' AND man.estado <> 'Ejecutado' AND p.estado='Activo' AND p.p_id=${p_id}\
    GROUP BY man.m_id,man.hora,proveedor,servicio\
    ORDER BY man.fecha ASC,proyecto,proveedor`);
    db.query(getsql, async(err, result) => {
        res.json(result);
        // console.log(result);
    })
});

router.get("/getMantenimientoNotasBym_id/:id", (req, res) => {

    const id = req.params.id;

    const getsql = (`SELECT mn.* FROM mantenimientos_notas mn WHERE m_id = '${id}' ORDER BY created_at DESC`);
    db.query(getsql, async(err, result) => {
        res.json(result);
        // console.log(result);
    })
});


// router.put("/editarMantenimientos", (req, res) => {
//     const pv_id = req.params.pv_id;
//     const s_id = req.params.s_id;
//     console.log(req);
//     const putsql = (`UPDATE mantenimientos SET s_id=${s_id} WHERE pv_id=${pv_id}`);
//     db.query(putsql, (err, result) => {
//         if (err){
//             console.log(err);
//         } 
//         res.json(result);
//     })
// });


module.exports = router;
