import { Router, Request, Response } from "express";
import { Usuario } from "../models/usuario.model";
import bcrypt from 'bcrypt';
import Token from "../classes/token";
import { verificaToken } from '../middlewares/autentication';

const userRoutes = Router();

// Login
userRoutes.post('/login', (req: Request, res: Response)=>{
    const body = req.body;
    Usuario.findOne({email: body.email}, (err: any, userDB: any)=>{
        if(err) throw err;
        if(!userDB){
            res.json({
                ok: false,
                mensaje: 'Usuario y/o contraseña no son correctos'
            })
        }
        if(userDB.compararPassword(body.password)){
            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar,
                rol: userDB.rol
            });
            res.json({
                ok: true,
                token: tokenUser
            })
        }else{
            return res.json({
                ok: false, 
                mensaje: 'Usuario y/o contraseña no son correctos'
            })
        }
    })
});

// Crear un usuario
userRoutes.post('/create',(req: Request, res: Response)=>{
        const user = {
            nombre: req.body.nombre,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,10),
            avatar: req.body.avatar,
            rol: req.body.rol
        }

        Usuario.findOne({email: user.email}, (err: any, userDB: any)=>{

            if(err) throw err;
            if(userDB){
                return res.json({
                    ok: false,
                    mensaje: 'Usuario y/o contraseña no son correctos'
                });
            }else{
                Usuario.create(user).then(userDB=>{
                    const tokenUser = Token.getJwtToken({
                        _id: userDB._id,
                        nombre: userDB.nombre,
                        email: userDB.email,
                        avatar: userDB.avatar,
                        rol: userDB.rol
                    });
                    res.json({
                        ok: true,
                        token: tokenUser
                    })
                }).catch(err =>{
                    res.json({
                        ok: false,
                        err
                    })
                })
            }
        });

});

// Actualizar usuario
userRoutes.post('/update',verificaToken, (req: any, res: Response)=>{
    const user ={
        nombre: req.body.nombre || req.usuario.nombre,
        avatar: req.body.avatar || req.usuario.avatar
    }
    Usuario.findByIdAndUpdate(req.usuario._id, user, {new: true}, (err, userDB)=>{
        if(err) throw err;
        if(!userDB){
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar,
            rol: userDB.rol
        });
        res.json({
            ok: true,
            token: tokenUser
        })
    });

});

// Mostrar usuario
userRoutes.get('/', verificaToken, (req: any, res: Response)=>{
		const usuario = req.usuario;
		
		res.json({
			ok: true,
			usuario
		});
});

// Mostrar rol de usuario
userRoutes.get('/rol', verificaToken, (req: any, res: Response)=>{
		const rol = req.usuario.rol;
		
		res.json({
			ok: true,
			rol
		});
});

// Agregar a favoritos
userRoutes.post('/agregar-favorito', verificaToken, (req: any, res: Response)=>{
        // Recibimos el _id del usuario y el id del ejercicio
        const id = req.body._id; // Id del ejercicio
        Usuario.findByIdAndUpdate(req.usuario._id, {$addToSet: {favoritos: id}}, {new: true}, (err: any, userDB: any)=>{
            if(err) throw err;
            if(!userDB){
                return res.json({
                    ok: false,
                    mensaje: 'No se encuentra el usuario'
                });
            }
            const favoritos = userDB.favoritos;
            res.json({
                ok: true,
                favoritos
            });
        });
});

// Eliminar de favoritos
userRoutes.post('/eliminar-favorito', [verificaToken], (req: any, res: Response)=>{
    // Recibimos el _id del usuario y el id del ejercicio
    const id = req.body._id;
    Usuario.findByIdAndUpdate(req.usuario._id, {$pull: {favoritos: id}}, {new: true}, (err: any, userDB: any)=>{
        if(err) throw err;
        if(!userDB){
            return res.json({
                ok: false,
                mensaje: 'No se encuentra el usuario'
            });
        }
        const favoritos = userDB.favoritos;
        res.json({
            ok: true,
            favoritos
        });
    });
});

//Ver lista de favoritos
userRoutes.get('/favoritos', verificaToken, (req: any, res: Response)=>{

    Usuario.findOne({_id: req.usuario._id}, (err: any, userDB: any)=>{

        if(err) throw err;
        if(!userDB){
            return res.json({
                ok: false,
                mensaje: 'No se encuentra el usuario'
            });
        }
        const favoritos = userDB.favoritos;
        res.json({
            ok: true,
            favoritos
        });
    });
});

export default userRoutes;