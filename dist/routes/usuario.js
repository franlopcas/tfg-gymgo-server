"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_model_1 = require("../models/usuario.model");
var bcrypt_1 = __importDefault(require("bcrypt"));
var token_1 = __importDefault(require("../classes/token"));
var autentication_1 = require("../middlewares/autentication");
var userRoutes = express_1.Router();
userRoutes.get('/prueba', function (req, res) {
    res.json({
        ok: true,
        mensaje: 'Todo funciona bien'
    });
});
// Login
userRoutes.post('/login', function (req, res) {
    var body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, function (err, userDB) {
        if (err)
            throw err;
        if (!userDB) {
            res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }
        if (userDB.compararPassword(body.password)) {
            var tokenUser = token_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar,
                rol: userDB.rol
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos ****'
            });
        }
    });
});
// Crear un usuario
userRoutes.post('/create', function (req, res) {
    var user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar,
        rol: req.body.rol
    };
    usuario_model_1.Usuario.findOne({ email: user.email }, function (err, userDB) {
        if (err)
            throw err;
        if (userDB) {
            return res.json({
                ok: false,
                mensaje: 'El correo electrónico ya se encuentra en el sistema'
            });
        }
    });
    usuario_model_1.Usuario.create(user).then(function (userDB) {
        var tokenUser = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar,
            rol: userDB.rol
        });
        res.json({
            ok: true,
            token: tokenUser
        });
    }).catch(function (err) {
        res.json({
            ok: false,
            err: err
        });
    });
});
// Actualizar usuario
userRoutes.post('/update', autentication_1.verificaToken, function (req, res) {
    var user = {
        nombre: req.body.nombre || req.usuario.nombre,
        avatar: req.body.avatar || req.usuario.avatar
    };
    usuario_model_1.Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, function (err, userDB) {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        var tokenUser = token_1.default.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar,
            rol: userDB.rol
        });
        res.json({
            ok: true,
            token: tokenUser
        });
    });
});
// Mostrar usuario
userRoutes.get('/', autentication_1.verificaToken, function (req, res) {
    var usuario = req.usuario;
    res.json({
        ok: true,
        usuario: usuario
    });
});
// Mostrar rol de usuario
userRoutes.get('/rol', autentication_1.verificaToken, function (req, res) {
    var rol = req.usuario.rol;
    res.json({
        ok: true,
        rol: rol
    });
});
// Agregar a favoritos
userRoutes.post('/agregar-favorito', autentication_1.verificaToken, function (req, res) {
    // Recibimos el _id del usuario y el id del ejercicio
    var id = req.body._id; // Id del ejercicio
    usuario_model_1.Usuario.findByIdAndUpdate(req.usuario._id, { $addToSet: { favoritos: id } }, { new: true }, function (err, userDB) {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No se encuentra el usuario'
            });
        }
        var favoritos = userDB.favoritos;
        res.json({
            ok: true,
            favoritos: favoritos
        });
    });
});
// Eliminar de favoritos
userRoutes.post('/eliminar-favorito', [autentication_1.verificaToken], function (req, res) {
    // Recibimos el _id del usuario y el id del ejercicio
    var id = req.body._id;
    usuario_model_1.Usuario.findByIdAndUpdate(req.usuario._id, { $pull: { favoritos: id } }, { new: true }, function (err, userDB) {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No se encuentra el usuario'
            });
        }
        var favoritos = userDB.favoritos;
        res.json({
            ok: true,
            favoritos: favoritos
        });
    });
});
//Ver lista de favoritos
userRoutes.get('/favoritos', autentication_1.verificaToken, function (req, res) {
    usuario_model_1.Usuario.findOne({ _id: req.usuario._id }, function (err, userDB) {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No se encuentra el usuario'
            });
        }
        var favoritos = userDB.favoritos;
        res.json({
            ok: true,
            favoritos: favoritos
        });
    });
});
exports.default = userRoutes;
