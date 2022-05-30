import {Schema, model, Document} from 'mongoose';

const tablaSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es necesario']
    },
    ejercicios:[{
        type: Schema.Types.ObjectId,
        ref: 'Ejercicio'
    }],
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe existir una referencia a un usuario']
    }
});

interface ITabla extends Document{
    nombre: string;
    ejercicios: string[];
    usuario: string;
}

export const Tabla = model<ITabla> ('Tabla', tablaSchema);