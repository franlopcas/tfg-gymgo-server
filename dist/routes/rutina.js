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
var rutina_model_1 = require("../models/rutina.model");
var autentication_1 = require("../middlewares/autentication");
var rutinaRoutes = express_1.Router();
// Crear rutina
rutinaRoutes.post('/new', [autentication_1.verificaToken], function (req, res) {
    var rutina = req.body;
    rutina_model_1.Rutina.create(rutina).then(function (rutinaDB) {
        res.json({
            ok: true,
            rutinaDB: rutinaDB
        });
    }).catch(function (err) {
        res.json({
            ok: false,
            err: err
        });
    });
});
// Agregar ejercicio
rutinaRoutes.post('/agregar-ejercicio', [autentication_1.verificaToken], function (req, res) {
    var body = req.body;
    //const _id = req.query._id;
    //const id = req.body.id; // Recibimos _id de la rutina y el id del ejercicio
    rutina_model_1.Rutina.findOneAndUpdate({ _id: body._id }, { $addToSet: { ejercicios: body.id } }, { new: true }, function (err, rutinaDB) {
        if (err)
            throw err;
        if (!rutinaDB) {
            return res.json({
                ok: false,
                mensaje: 'No se encuentra la rutina'
            });
        }
        res.json({
            ok: true,
            rutinaDB: rutinaDB
        });
    });
});
// Eliminar ejercicio
rutinaRoutes.post('/eliminar-ejercicio', [autentication_1.verificaToken], function (req, res) {
    var body = req.body;
    //const id = req.body.id;
    rutina_model_1.Rutina.findByIdAndUpdate({ _id: body._id }, { $pull: { ejercicios: body.id } }, { new: true }, function (err, rutinaDB) {
        if (err)
            throw err;
        if (!rutinaDB) {
            return res.json({
                ok: false,
                mensaje: 'No se encuentra la rutina'
            });
        }
        res.json({
            ok: true,
            rutinaDB: rutinaDB
        });
    });
});
/**
// Ver Rutinas paginadas
rutinaRoutes.get('/', async (req: any, res: Response)=>{
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const rutinas = await Rutina.find()
                                .sort({_id: -1})
                                .skip(skip)
                                .limit(10)
                                .exec();
    res.json({
        ok: true,
        rutinas
    });
});
 */
// Ver Rutinas sin paginadas
rutinaRoutes.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rutinas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, rutina_model_1.Rutina.find()];
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
// Ver Rutina
rutinaRoutes.get('/ver', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = req.query._id;
        rutina_model_1.Rutina.findOne({ _id: id }, function (err, rutinaDB) {
            if (err)
                throw err;
            if (!rutinaDB) {
                return res.json({
                    ok: false,
                    mensaje: 'No se encuentra la rutina'
                });
            }
            res.json({
                ok: true,
                rutinaDB: rutinaDB
            });
        });
        return [2 /*return*/];
    });
}); });
// Eliminar Rutina
rutinaRoutes.post('/delete', function (req, res) {
    rutina_model_1.Rutina.findOneAndRemove({ _id: req.body._id }, function (err, rutinaDB) {
        if (err)
            throw err;
        if (!rutinaDB) {
            return res.json({
                ok: false,
                mensaje: 'No se encuentra la rutina'
            });
        }
        res.json({
            ok: true,
            mensaje: 'Rutina eliminada satisfactoriamente',
            rutinaDB: rutinaDB
        });
    });
});
// Devuelve los ejercicios de una rutina
rutinaRoutes.get('/ejercicios', function (req, res) {
    var id = req.query._id;
    rutina_model_1.Rutina.findOne({ _id: id }, function (err, rutinaDB) {
        if (err)
            throw err;
        if (!rutinaDB) {
            return res.json({
                ok: false,
                mensaje: 'No se encuentra la rutina'
            });
        }
        var ejercicios = rutinaDB.ejercicios;
        res.json({
            ok: true,
            ejercicios: ejercicios
        });
    });
});
exports.default = rutinaRoutes;
