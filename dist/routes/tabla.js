"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tabla_model_1 = require("../models/tabla.model");
var autentication_1 = require("../middlewares/autentication");
var tablaRoutes = express_1.Router();
// Crear tabla
tablaRoutes.post('/new', [autentication_1.verificaToken], function (req, res) {
    var tabla = req.body;
    tabla_model_1.Tabla.create(tabla).then(function (tablaDB) {
        res.json({
            ok: true,
            tablaDB: tablaDB
        });
    }).catch(function (err) {
        res.json({
            ok: false,
            err: err
        });
    });
});
// Agregar ejercicio
tablaRoutes.post('/agregar-ejercicio', [autentication_1.verificaToken], function (req, res) {
    // Recibimos el _id de la tabla y el id del ejercicio
    var body = req.body;
    tabla_model_1.Tabla.findOneAndUpdate({ _id: body._id }, { $addToSet: { ejercicios: body.id } }, { new: true }, function (err, tablaDB) {
        if (err)
            throw err;
        if (!tablaDB) {
            return res.json({
                ok: false,
                mensaje: 'No se encuentra la tabla'
            });
        }
        res.json({
            ok: true,
            tablaDB: tablaDB
        });
    });
});
// Eliminar ejercicio
tablaRoutes.post('/eliminar-ejercicio', [autentication_1.verificaToken], function (req, res) {
    // Recibimos el _id de la tabla y el id del ejercicio
    var body = req.body;
    tabla_model_1.Tabla.findByIdAndUpdate({ _id: body._id }, { $pull: { ejercicios: body.id } }, { new: true }, function (err, tablaDB) {
        if (err)
            throw err;
        if (!tablaDB) {
            return res.json({
                ok: false,
                mensaje: 'No se encuentra la tabla'
            });
        }
        res.json({
            ok: true,
            tablaDB: tablaDB
        });
    });
});
// Ver rutinas ( Tablas creadas por el administrador ) NO
tablaRoutes.get('/ver-rutinas', [autentication_1.verificaToken], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rutinas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tabla_model_1.Tabla.find()
                    .where('usuario.rol').equals('admin')
                    .exec()];
            case 1:
                rutinas = _a.sent();
                res.json({
                    ok: true,
                    rutinas: rutinas
                });
                return [2 /*return*/];
        }
    });
}); });
// Ver tablas sin paginar
tablaRoutes.get('/', [autentication_1.verificaToken], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, tablas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.query._id;
                return [4 /*yield*/, tabla_model_1.Tabla.find({ 'usuario': userId })
                        .exec()];
            case 1:
                tablas = _a.sent();
                res.json({
                    ok: true,
                    tablas: tablas
                });
                return [2 /*return*/];
        }
    });
}); });
// Ver tabla
tablaRoutes.get('/ver', [autentication_1.verificaToken], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = req.query._id;
        tabla_model_1.Tabla.findOne({ _id: id }, function (err, tablaDB) {
            if (err)
                throw err;
            if (!tablaDB) {
                return res.json({
                    ok: false,
                    mensaje: 'No se encuentra la tabla'
                });
            }
            res.json({
                ok: true,
                tablaDB: tablaDB
            });
        });
        return [2 /*return*/];
    });
}); });
// Eliminar tabla
tablaRoutes.post('/delete', [autentication_1.verificaToken], function (req, res) {
    tabla_model_1.Tabla.findOneAndRemove({ _id: req.body._id }, function (err, tablaDB) {
        if (err)
            throw err;
        if (!tablaDB) {
            return res.json({
                ok: false,
                mensaje: 'No se ha encontrado la tabla'
            });
        }
        res.json({
            ok: true,
            mensaje: 'Tabla eliminada satisfactoriamente',
            tablaDB: tablaDB
        });
    });
});
// Devuelve los ejercicios de una tabla
tablaRoutes.get('/ejercicios', function (req, res) {
    var id = req.query._id;
    tabla_model_1.Tabla.findOne({ _id: id }, function (err, tablaDB) {
        if (err)
            throw err;
        if (!tablaDB) {
            return res.json({
                ok: false,
                mensaje: 'No se encuentra la tabla'
            });
        }
        var ejercicios = tablaDB.ejercicios;
        res.json({
            ok: true,
            ejercicios: ejercicios
        });
    });
});
exports.default = tablaRoutes;
