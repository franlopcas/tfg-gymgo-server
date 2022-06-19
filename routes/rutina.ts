import {Router, Request, Response} from 'express';
import { Rutina } from '../models/rutina.model';
import { verificaToken } from '../middlewares/autentication';

const rutinaRoutes = Router();

// Crear rutina
rutinaRoutes.post('/new', [verificaToken], (req: any, res: Response)=>{
    const rutina = req.body;
    Rutina.create(rutina).then(rutinaDB=>{
        res.json({
            ok: true,
            rutinaDB
        });
    }).catch(err=>{
        res.json({
            ok: false,
            err
        });
    });
});

// Agregar ejercicio
rutinaRoutes.post('/agregar-ejercicio', [verificaToken], (req: any, res: Response)=>{
    const body = req.body; // Recoge el _id de la rutina y el id del ejercicio
    Rutina.findOneAndUpdate({_id: body._id}, {$addToSet: {ejercicios: body.id}}, {new: true}, (err: any, rutinaDB: any)=>{
        if(err) throw err;
        if(!rutinaDB){
            return res.json({
                ok: false,
                mensaje: 'No se encuentra la rutina'
            });
        }
        res.json({
            ok: true,
            rutinaDB
        });
    });
});

// Eliminar ejercicio
rutinaRoutes.post('/eliminar-ejercicio', [verificaToken], (req: any, res: Response)=>{
    const body = req.body;
    Rutina.findByIdAndUpdate({_id: body._id}, {$pull: {ejercicios: body.id}}, {new: true}, (err: any, rutinaDB: any)=>{
        if(err) throw err;
        if(!rutinaDB){
            return res.json({
                ok: false,
                mensaje: 'No se encuentra la rutina'
            });
        }
        res.json({
            ok: true,
            rutinaDB
        });
    });
});

// Ver Rutinas sin paginadas
rutinaRoutes.get('/', async (req: any, res: Response)=>{
    
    const rutinas = await Rutina.find();
    res.json({
        ok: true,
        rutinas
    });
});

// Ver Rutina
rutinaRoutes.get('/ver', async (req: any, res: Response)=>{
    const id = req.query._id;
    Rutina.findOne({_id: id}, (err: any, rutinaDB: any)=>{
        if(err) throw err;
        if(!rutinaDB){
            return res.json({
                ok: false,
                mensaje: 'No se encuentra la rutina'
            });
        }
        res.json({
            ok: true,
            rutinaDB
        });
    });
});

// Eliminar Rutina
rutinaRoutes.post('/delete', (req: any, res: Response)=>{
    Rutina.findOneAndRemove({_id: req.body._id}, (err: any, rutinaDB: any)=>{
        if(err) throw err;
        if(!rutinaDB){
            return res.json({
                ok: false,
                mensaje: 'No se encuentra la rutina'
            });
        }
        res.json({
            ok: true,
            mensaje: 'Rutina eliminada satisfactoriamente',
            rutinaDB
        });
    });
});

// Devuelve los ejercicios de una rutina
rutinaRoutes.get('/ejercicios', (req: any, res: Response)=>{
    const id = req.query._id;
    Rutina.findOne({_id: id}, (err: any, rutinaDB: any)=>{
        if(err) throw err;
        if(!rutinaDB){
            return res.json({
                ok: false,
                mensaje: 'No se encuentra la rutina'
            });
        }
        const ejercicios = rutinaDB.ejercicios;
        res.json({
            ok: true,
            ejercicios
        })
    });
});

export default rutinaRoutes;