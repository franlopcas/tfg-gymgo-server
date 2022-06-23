"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./classes/server"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var usuario_1 = __importDefault(require("./routes/usuario"));
var ejercicio_1 = __importDefault(require("./routes/ejercicio"));
var tabla_1 = __importDefault(require("./routes/tabla"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var rutina_1 = __importDefault(require("./routes/rutina"));
var cors_1 = __importDefault(require("cors"));
var server = new server_1.default();
// Levantar express
server.start(function () {
    console.log("Servidor corriendo en el puerto " + server.port);
});
// Body Parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// Fileupload
server.app.use(express_fileupload_1.default({ useTempFiles: true }));
// Configurar CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Conectar Base de datos
mongoose_1.default.connect('mongodb://localhost:27017/gymgo', function (err) {
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});
// Rutas de mi app
server.app.use('/user', usuario_1.default);
server.app.use('/ejercicio', ejercicio_1.default);
server.app.use('/tabla', tabla_1.default);
server.app.use('/rutina', rutina_1.default);
