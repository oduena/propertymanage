//import { useState } from 'react';
const express = require('express');
const router = express.Router();
const db = require("../DbConnect");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
//const { useState } = require('react');
const app = express();
//const [LoginUser, setLoginUser] = useState([]);

app.use(cors());
app.use(cookieParser());


require('dotenv').config();

router.get("/", (req, res) => {
    const getsql = "SELECT * FROM users";
    db.query(getsql, async (err, result) => {
        // console.log(result);
        if(err) throw err;
        res.json(result);
     })
});

router.get("/list", (req, res) => {
    const getsql = "SELECT u.id, u.nombre FROM users u ORDER BY u.nombre ASC";
    db.query(getsql, async (err, result) => {
        // console.log(result);
        if(err) throw err;
        res.json(result);
     })
});

router.get("/listuser/:id", (req, res) => {
    const id = req.params.id;
    const getsql = `SELECT u.id, u.nombre FROM users u WHERE u.id=${id}`;
    db.query(getsql, async (err, result) => {
        // console.log(result);
        if(err) throw err;
        res.json(result);
     })
});


router.post("/", (req, res)=>{
const {nombre, email, role, password} = req.body;
bcrypt.hash(password, 10).then((hash)=>{
    const addUsersql = "INSERT INTO users (nombre, email, role, password) VALUES (?,?,?,?)";
    db.query(addUsersql, [nombre,email,role,hash],(err, result) =>{
        if(err){
            console.log(err);
        }
        res.json(result);
    });

});
});

router.put("/editarusuario/:id", (req, res) => {
    const id = req.params.id;
    const {nombre, email, role, estado} = req.body;
    console.log(req.body)
    //bcrypt.hash(password,10).then((hash)=>{
    const editUserSql = (`UPDATE users SET nombre=?,email=?,role=?,estado=? WHERE id='${id}'`);
    //const editUserSql = (`UPDATE users SET nombre=?,email=?,role=?,estado=? WHERE id='${id}'`);
       db.query(editUserSql, [nombre,email,role,estado], (err, result) => {
       if (err) {
           console.log(err);
       }
       console.log(result);
       res.json(result);
   //});
  });
});

router.post("/login", async (req, res) =>{
const {username,password} = req.body;

if(!username || !password)
{ return res.status(400).json({error:"Usuario o password no pueden estar en blanco"})}
  
    
    const getsql = `SELECT u.id as userID, nombre, password, estado, role  FROM users u WHERE email='${username}'`;
    db.query(getsql, async (err, result)=>{
        if(err){
            console.log(err);
        }
       
        if (result.length===0){
            res.status(404).json({error: "Usuario no existe"});
        } else {
            
        if(result[0].estado === 'Activo'){
           
           const dbPassword = result[0].password;

          const match = await bcrypt.compare(password, dbPassword);

          if(match){

            const accessToken = jwt.sign(
                {"username":result[0].nombre,"userID":result[0].userID,"role":result[0].role},
                'e002631dd4993b1e76cf9f697ac1d5ebb9bfb46e229c2a6ec7fe886bcb2d8af9',
                {expiresIn:'6h'}
            )

            const refreshToken = jwt.sign(
                {"username":result[0].nombre,"userID":result[0].userID,"role":result[0].role},
                '059aec9e4a901358e5075ee458d373d5e5ca743a90d78bf677e334f717a9553b',
                { expiresIn: '1d' }
            )

            //res.cookie("jwt", refreshToken,{httpOnly:true,maxAge:24 * 60 * 60 * 1000});
            res.json({"currentUser":result[0].nombre,"userID":result[0].userID,"role":result[0].role,"expiresIn":240, accessToken });

           } else {
            res.status(401).json({ error: "Usuario o password estan errados"});
           }
        }else{
            res.status(403).json({error:"Usuario NO esta habilitado para hacer Login"});
        }    
    }
 })
});


router.put("/resetpwd", async (req,res)=>{

const {username, password} = req.body

if(!username || !password)
{ return res.status(400).json({error:"Usuario o password no pueden estar en blanco"})}

const getsql = `SELECT u.id as userID, nombre FROM users u WHERE email='${username}'`;

db.query(getsql, async (err, result)=>{
    if(err){
        console.log(err);
    }

    if (result.length===0){
        res.status(404).json({error: "Usuario No existe"});
    } else {
       
        bcrypt.hash(password,10).then((hash)=>{
            const editUserSql = (`UPDATE users SET users.password=? WHERE users.email='${username}'`);
               db.query(editUserSql, [hash], (err, result) => {
               if (err) {
                   console.log(err);
               }
               res.json(result);
           });
          });
     }
   })
});

router.get("/refresh", async (req,res) =>{
    const cookies = req.cookies;
    //console.log(cookies);
    if (!cookies.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    //console.log(refreshToken);

    jwt.verify(
        refreshToken,
        '059aec9e4a901358e5075ee458d373d5e5ca743a90d78bf677e334f717a9553b',
        (err, decoded) => {
            if(err) return res.sendStatus(403).json({"error": err});

            const accessToken = jwt.sign(
                {"username" : decoded.username },
                'e002631dd4993b1e76cf9f697ac1d5ebb9bfb46e229c2a6ec7fe886bcb2d8af9',
                {expiresIn : '2h'}
            );
            res.json({ accessToken })
        }
    );
});

module.exports = router;