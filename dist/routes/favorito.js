"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var favorito_model_1 = require("../models/favorito.model");
var autentication_1 = require("../middlewares/autentication");
var favoritoRoutes = express_1.Router();
//Crear lista de favoritos
favoritoRoutes.post('/create', [autentication_1.verificaToken], function (req, res) {
    var id = req.body.id; // Id del usuario
    favorito_model_1.Favorito.create(id).then(function (userDB) {
        res.json({
            ok: true,
            userDB: userDB
        });
    });
});
// Agregar ejercicio
favoritoRoutes.post('/agregar-favorito', [autentication_1.verificaToken], function (req, res) {
    // Recibimos el _id del usuario por headers y _id del ejercicio
    var id = req.body.id; // Id del ejercicio
    favorito_model_1.Favorito.findOneAndUpdate({ _id: req.body._id }, { $addToSet: { ejercicios: id } }, { new: true }, function (err, favDB) {
        if (err)
            throw err;
        if (!favDB) {
            return res.json({
                ok: false,
                mensaje: 'No se encuentra la lista de favoritos'
            });
        }
        res.json({
            ok: true,
            favDB: favDB
        });
    });
});
exports.default = favoritoRoutes;
