"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var uniqid_1 = __importDefault(require("uniqid"));
var FileSystem = /** @class */ (function () {
    function FileSystem() {
    }
    FileSystem.prototype.guardarImagenTemporal = function (file, userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // Crear carpetas
            var path = _this.crearCarpetaUsuario(userId);
            // Nombre archivo
            var nombreArchivo = _this.generarNombreUnico(file.name);
            // Mover el archivo del Temp a nuestra carpeta
            file.mv(path + "/" + nombreArchivo, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    FileSystem.prototype.guardarCoverTemp = function (file) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var pathDir = path_1.default.resolve(__dirname, '../uploads/cover/temp');
            // Nombre archivo
            var nombreArchivo = _this.generarNombreUnico(file.name);
            var existe = fs_1.default.existsSync(pathDir);
            if (!existe) {
                fs_1.default.mkdirSync(pathDir);
            }
            file.mv(pathDir + "/" + nombreArchivo, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(nombreArchivo);
                }
            });
        });
    };
    FileSystem.prototype.guardarCover = function (file) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var pathDir = path_1.default.resolve(__dirname, '../uploads/cover');
            // Nombre archivo
            var nombreArchivo = _this.generarNombreUnico(file.name);
            var existe = fs_1.default.existsSync(pathDir);
            if (!existe) {
                fs_1.default.mkdirSync(pathDir);
            }
            file.mv(pathDir + "/" + nombreArchivo, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(nombreArchivo);
                }
            });
        });
    };
    FileSystem.prototype.crearCarpetaUsuario = function (userId) {
        var pathUser = path_1.default.resolve(__dirname, '../uploads/', userId);
        var pathUserTemp = pathUser + '/temp';
        //console.log(pathUser);
        var existe = fs_1.default.existsSync(pathUser);
        if (!existe) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    };
    FileSystem.prototype.generarNombreUnico = function (nombreOriginal) {
        // Extraemos extensión del archivo
        var nombreArr = nombreOriginal.split('.');
        var extension = nombreArr[nombreArr.length - 1];
        var idUnico = uniqid_1.default();
        return idUnico + "." + extension;
    };
    FileSystem.prototype.obtenerImagenesEnTemp = function (userId) {
        var pathTemp = path_1.default.resolve(__dirname, '../uploads/', userId, 'temp');
        return fs_1.default.readdirSync(pathTemp) || [];
    };
    FileSystem.prototype.obtenerCoverEnTemp = function () {
        var pathTemp = path_1.default.resolve(__dirname, '../uploads/cover/temp');
        return fs_1.default.readdirSync(pathTemp) || [];
    };
    FileSystem.prototype.vaciarCoverTemp = function () {
        var pathTemp = path_1.default.resolve(__dirname, '../uploads/cover/temp');
        fs_1.default.rmSync(pathTemp, { recursive: true });
    };
    FileSystem.prototype.coverDeTempHaciaEjercicio = function () {
        var pathTemp = path_1.default.resolve(__dirname, '../uploads/cover/temp');
        var pathEjercicio = path_1.default.resolve(__dirname, '../uploads/ejercicios');
        if (!fs_1.default.existsSync(pathTemp)) {
            return [];
        }
        if (!fs_1.default.existsSync(pathEjercicio)) {
            fs_1.default.mkdirSync(pathEjercicio);
        }
        var coverTemp = this.obtenerCoverEnTemp();
        fs_1.default.renameSync(pathTemp + "/" + coverTemp, pathEjercicio + "/" + coverTemp);
        return coverTemp[0];
    };
    FileSystem.prototype.imagenesDeTempHaciaEjercicio = function (userId) {
        var pathTemp = path_1.default.resolve(__dirname, '../uploads/', userId, 'temp');
        var pathEjercicio = path_1.default.resolve(__dirname, '../uploads/', userId, 'ejercicios');
        if (!fs_1.default.existsSync(pathTemp)) {
            return [];
        }
        if (!fs_1.default.existsSync(pathEjercicio)) {
            fs_1.default.mkdirSync(pathEjercicio);
        }
        var imagenesTemp = this.obtenerImagenesEnTemp(userId);
        imagenesTemp.forEach(function (imagen) {
            fs_1.default.renameSync(pathTemp + "/" + imagen, pathEjercicio + "/" + imagen);
        });
        return imagenesTemp;
    };
    FileSystem.prototype.getCoverUrl = function (img) {
        var pathFoto = path_1.default.resolve(__dirname, '../uploads/ejercicios', img);
        var existe = fs_1.default.existsSync(pathFoto);
        if (!existe) {
            return path_1.default.resolve(__dirname, '../assets/400x250.jpg');
        }
        return pathFoto;
    };
    return FileSystem;
}());
exports.default = FileSystem;
