"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ejercicio = void 0;
var mongoose_1 = require("mongoose");
var ejercicioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    preparacion: {
        type: String,
        required: [true, 'La preparacion es necesaria']
    },
    ejecucion: {
        type: String,
        required: [true, 'La ejecucion es necesaria']
    },
    recomendacion: {
        type: String
    },
    cover: {
        type: String,
        required: [true, 'La imagen es necesaria']
    },
    tipo: {
        type: String,
        required: [true, 'El tipo es necesario']
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe existir una referencia a un usuario']
    }
});
exports.Ejercicio = mongoose_1.model('Ejercicio', ejercicioSchema);
