"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabla = void 0;
var mongoose_1 = require("mongoose");
var tablaSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    ejercicios: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Ejercicio'
        }],
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe existir una referencia a un usuario']
    }
});
exports.Tabla = mongoose_1.model('Tabla', tablaSchema);
