"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favorito = void 0;
var mongoose_1 = require("mongoose");
var favoritoSchema = new mongoose_1.Schema({
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
exports.Favorito = mongoose_1.model('Favorito', favoritoSchema);
