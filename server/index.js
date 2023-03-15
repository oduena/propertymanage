require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const credentials = require('./middleware/credentials');
//const verifyJWT = require('./middleware/verifyJWT');
const corsOptions = require('../config/corsOptions');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT;

app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));

const UsuariosRouter = require('./routes/Usuarios');
app.use('/api/usuarios', UsuariosRouter);
app.use('/api/addUsuario', UsuariosRouter);


const ProyectosRouter = require('./routes/Proyectos');
app.use('/api/proyectos', ProyectosRouter);
app.use('/api/addProyecto', ProyectosRouter);

//app.use(verifyJWT);
const ServiciosRouter = require('./routes/Servicios');
app.use('/api/servicios', ServiciosRouter);
app.use('/api/addServicio', ServiciosRouter);

const ProveedoresRouter = require('./routes/Proveedores');
app.use('/api/proveedores', ProveedoresRouter);
app.use('/api/addProveedor', ProveedoresRouter);

const MantenimientosRouter = require('./routes/Mantenimientos');
app.use('/api/mantenimientos', MantenimientosRouter);
app.use('/api/addMantenimiento', MantenimientosRouter);

const TareasRouter = require('./routes/Tareas');
app.use('/api/tareas', TareasRouter);
app.use('/api/addTarea', TareasRouter);


app.listen(PORT, () => {
    console.log("running on port "+PORT);
});