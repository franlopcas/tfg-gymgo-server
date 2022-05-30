"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rutina = void 0;
var mongoose_1 = require("mongoose");
var rutinaSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    ejercicios: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Ejercicio'
        }]
});
exports.Rutina = mongoose_1.model('Rutina', rutinaSchema);
