import {Schema, model, Document} from 'mongoose';

const rutinaSchema: Schema<IRutina> = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es necesario']
    },
    ejercicios:[{
        type: Schema.Types.ObjectId,
        ref: 'Ejercicio'
    }]
});

interface IRutina extends Document{
    nombre: string;
    ejercicios: string[];
}

export const Rutina = model<IRutina> ('Rutina', rutinaSchema);