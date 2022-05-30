import { Router, Request, Response } from 'express';
import { Tabla } from '../models/tabla.model';
import { verificaToken } from '../middlewares/autentication';

const tablaRoutes = Router();

// Crear tabla
tablaRoutes.post('/new', [ verificaToken ], (req: any, res: Response)=>{
    const tabla = req.body;
    //tabla.usuario = req.usuario._id;
    Tabla.create(tabla).then(tablaDB=>{
        res.json({
            ok: true,
            tablaDB
        });
    }).catch(err=>{
        res.json({
            ok: false,
            err
        });
    });
});

// Agregar ejercicio
tablaRoutes.post('/agregar-ejercicio', [verificaToken], (req: any, res: Response)=>{
    // Recibimos el _id de la tabla y el id del ejercicio
    const body = req.body;
    Tabla.findOneAndUpdate({_id: body._id}, {$addToSet: {ejercicios: body.id}}, {new: true}, (err: any, tablaDB: any)=>{
        if(err) throw err;
        if(!tablaDB){
            return res.json({
                ok: false,
                mensaje: 'No se encuentra la tabla'
            });
        }
        res.json({
            ok: true,
            tablaDB
        });
    });
});

// Eliminar ejercicio
tablaRoutes.post('/eliminar-ejercicio', [verificaToken], (req: any, res: Response)=>{
    // Recibimos el _id de la tabla y el id del ejercicio
    const body = req.body;
    Tabla.findByIdAndUpdate({_id: body._id}, {$pull: {ejercicios: body.id}}, {new: true}, (err: any, tablaDB: any)=>{
        if(err) throw err;
        if(!tablaDB){
            return res.json({
                ok: false,
                mensaje: 'No se encuentra la tabla'
            });
        }
        res.json({
            ok: true, 
            tablaDB
        });
    });
});

// Ver rutinas ( Tablas creadas por el administrador ) NO
tablaRoutes.get('/ver-rutinas', [verificaToken], async (req: any, res: Response)=>{
    //const rol = req.usuario.rol;
    //const usuario = req.usuario;
    //console.log('El rol del usuario es: ', rol);

    //const rutinas = await Tabla.find({$and: [ {rol: {$in: 'admin'}} ]});
    //const rutinas = await Tabla.find({$where: function() { return (this.rol == 'admin')}});
    const rutinas = await Tabla.find()
                               .where('usuario.rol').equals('admin')
                               .exec();
    res.json({
        ok: true,
        rutinas
    })
});
/** 
// Ver tablas paginadas ( Tablas creadas por el usuario )
tablaRoutes.get('/', [verificaToken], async (req: any, res: Response)=>{
    //const userId = req.body.usuario;  // Id del usuario que recibimos por el body
    const userId = req.usuario._id;
    
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const tablas = await Tabla.find({'usuario': userId})
                              .sort({_id: -1})
                              .skip(skip)
                              .limit(10)
                              .exec();
    res.json({
        ok: true,
        tablas
    })
});
*/

// Ver tablas sin paginar
tablaRoutes.get('/', [verificaToken], async (req: any, res: Response)=>{
    //const userId = req.body.usuario;  // Id del usuario que recibimos por el body
    const userId = req.query._id;
    const tablas = await Tabla.find({'usuario': userId})
                              .exec();
    res.json({
        ok: true,
        tablas
    })
});


// Ver tabla
tablaRoutes.get('/ver', [verificaToken], async (req: any, res: Response)=>{
    const id = req.query._id; // Recibimos el id de la tabla que queremos ver
    Tabla.findOne({_id: id}, (err: any, tablaDB: any)=>{
        if(err) throw err;
        if(!tablaDB){
            return res.json({
                ok: false,
                mensaje: 'No se encuentra la tabla'
            });
        }
        res.json({
            ok: true,
            tablaDB
        });
    });
});

// Eliminar tabla
tablaRoutes.post('/delete', [verificaToken], (req: any, res: Response)=>{
    Tabla.findOneAndRemove({_id: req.body._id}, (err: any, tablaDB: any)=>{
        if(err) throw err;
        if(!tablaDB){
            return res.json({
                ok: false,
                mensaje: 'No se ha encontrado la tabla'
            });
        }
        res.json({
            ok: true,
            mensaje: 'Tabla eliminada satisfactoriamente',
            tablaDB
        });
    });
});

// Devuelve los ejercicios de una tabla
tablaRoutes.get('/ejercicios', (req: any, res: Response)=>{
    const id = req.query._id;
    Tabla.findOne({_id: id}, (err: any, tablaDB: any)=>{
        if(err) throw err;
        if(!tablaDB){
            return res.json({
                ok: false,
                mensaje: 'No se encuentra la tabla'
            });
        }
        const ejercicios = tablaDB.ejercicios;
        res.json({
            ok: true,
            ejercicios
        })
    });
});

export default tablaRoutes;