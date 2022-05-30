import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema: Schema<IUsuario> = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    favoritos: [{
        type: Schema.Types.ObjectId,
        ref: 'Ejercicio'
    }],
    rol: {
        type: String,
        required: [true, 'El rol es necesario'],
        default: "user"
    }
});

usuarioSchema.method('compararPassword', function(password: string=''): boolean{
    if(bcrypt.compareSync(password, this.password)){
        return true;
    }else{
        return false;
    }
});

interface IUsuario extends Document{
    nombre: string;
    email: string;
    password: string;
    avatar: string;
    favoritos: string[];
    rol: string;
    compararPassword(password: string): boolean;
}

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);