import {Schema, model, Document} from 'mongoose';

const ejercicioSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es necesario']
    },
    preparacion:{
        type: String,
        required: [true, 'La preparacion es necesaria']
    },
	ejecucion:{
        type: String,
        required: [true, 'La ejecucion es necesaria']
    },
    recomendacion:{
        type: String
    },
    cover:{
        type: String,
        required: [true, 'La imagen es necesaria']
    },
    tipo:{
        type: String,
        required: [true, 'El tipo es necesario']
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe existir una referencia a un usuario']
    }
});

interface IEjercicio extends Document{
    nombre: string;
    preparacion: string;
	ejecucion: string;
    recomendacion: string;
    cover: string;
    tipo: string;
    usuario: string;
}

export const Ejercicio = model<IEjercicio> ('Ejercicio', ejercicioSchema);