import Server from "./classes/server";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/usuario';
import ejercicioRoutes from './routes/ejercicio'
import tablaRoutes from "./routes/tabla";
import fileUpload from "express-fileupload";
import rutinaRoutes from "./routes/rutina";
import cors from 'cors';

const server = new Server();

// Levantar express
server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});

// Body Parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// Fileupload
server.app.use(fileUpload({useTempFiles: true}));

// Configurar CORS
server.app.use(cors({origin: true, credentials: true}));

// Conectar Base de datos
mongoose.connect('mongodb://localhost:27017/gymgo', (err)=>{
    if(err) throw err;
    console.log('Base de datos ONLINE');
})

// Rutas de mi app
server.app.use('/user',userRoutes);
server.app.use('/ejercicio',ejercicioRoutes);
server.app.use('/tabla',tablaRoutes);
server.app.use('/rutina',rutinaRoutes);



