import { Router, Response, Request } from 'express';
import { Ejercicio } from '../models/ejercicio.model';
import { verificaToken } from '../middlewares/autentication';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';

const fileSystem = new FileSystem();

const ejercicioRoutes = Router();

// Crear ejercicio
ejercicioRoutes.post('/new',verificaToken, async (req: any, res: Response)=>{

    const ejercicio = req.body;
    ejercicio.usuario = req.usuario._id;
	
    const cover = fileSystem.coverDeTempHaciaEjercicio();
    ejercicio.cover = cover;
	
    Ejercicio.findOne({nombre: ejercicio.nombre}, (err: any, ejercicioDB: any)=>{

            if(err) throw err;
            if(ejercicioDB){
                return res.json({
                    ok: false,
                    mensaje: 'El ejercicio ya se encuentra en el sistema'
                });
            }else{
                Ejercicio.create(ejercicio).then(ejercicioDB=>{
                    res.json({
                        ok: true,
                        ejercicioDB
                    })
                }).catch(err =>{
                    res.json({
                        ok: false,
                        err
                    })
                });
            }
        });
});

// Actualizar ejercicio con COVER
ejercicioRoutes.post('/update-cover', verificaToken, async (req: any, res: Response)=>{

    const ejercicio = req.body;
    const cover = fileSystem.coverDeTempHaciaEjercicio();
    ejercicio.cover = cover;

            Ejercicio.findOneAndUpdate({_id: ejercicio._id}, ejercicio, {new: true}, (err, ejercicioDB)=>{
                if(err) throw err;
                if(!ejercicioDB){
                    return res.json({
                        ok: false,
                        mensaje: 'No existe un ejercicio con ese id'
                    });
                }
                res.json({
                    ok: true,
                    ejercicioDB
                })
                
            });
        
});

// Actualizar ejercicio SIN COVER
ejercicioRoutes.post('/update', verificaToken, async (req: any, res: Response)=>{

    const ejercicio = req.body;

            Ejercicio.findOneAndUpdate({_id: ejercicio._id}, ejercicio, {new: true}, (err, ejercicioDB)=>{
                if(err) throw err;
                if(!ejercicioDB){
                    return res.json({
                        ok: false,
                        mensaje: 'No existe un ejercicio con ese id'
                    });
                }
                res.json({
                    ok: true,
                    ejercicioDB
                })
                
            });
        
});

// Eliminar ejercicio
ejercicioRoutes.post('/delete', (req: any, res: Response)=>{
	const body = req.body;
    Ejercicio.findOneAndRemove({_id: body._id}, (err: any, ejercicioDB: any)=>{
        if(err) throw err;
        if(!ejercicioDB){
            return res.json({
                ok: false,
                mensaje: 'No existe un ejercicio con ese id'
            });
        }
        res.json({
            ok: true
        })
    });
});

//Ver lista de ejercicios
ejercicioRoutes.get('/', async (req: any, res: Response)=>{

    const ejercicios = await Ejercicio.find();
    res.json({
        ok: true,
        ejercicios
    })
});

// Ver ejercicio
ejercicioRoutes.get('/ver', (req: any, res: Response)=>{
    const id = req.query._id;
    Ejercicio.findOne({_id: id}, (err: any, ejercicioDB: any)=>{
        if(err) throw err;
        if(!ejercicioDB){
            return res.json({
                ok: false,
                mensaje: 'No se encuentra el ejercicio'
            });
        }
        res.json({
            ok: true,
            ejercicioDB
        })
    });
});

// Ver ejercicio por id
ejercicioRoutes.get('/ver-ejercicio', (req: any, res: Response)=>{
    const id = req.query._id;
    Ejercicio.findOne({_id: id}, (err: any, ejercicioDB: any)=>{
        if(err) throw err;
        if(!ejercicioDB){
            return res.json({
                ok: false,
                mensaje: 'No se encuentra el ejercicio'
            });
        }
        res.json({
            ok: true,
            ejercicioDB
        })
    });
});

// Servicio para subir imágenes
ejercicioRoutes.post('/uploads', [verificaToken], async (req: any, res: Response)=>{

    if(!req.files){
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningún archivo'
        });
    }
    const file: FileUpload = req.files.image;

    if(!file){
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ninguna imagen'
        });
    }

    if(!file.mimetype.includes('image')){
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que ha subido no es una imagen'
        });
    }
    await fileSystem.guardarImagenTemporal(file, req.usuario._id);

    res.json({
        ok: true,
        file
    });
});

// Servicio para subir la cover
ejercicioRoutes.post('/upload-cover',verificaToken, async (req: any, res: Response)=>{
    fileSystem.vaciarCoverTemp();
    if(!req.files){
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningún archivo'
        });
    }
    const file: FileUpload = req.files.image;

    if(!file){
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ninguna imagen'
        });
    }

    if(!file.mimetype.includes('image')){
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que ha subido no es una imagen'
        });
    }

    await fileSystem.guardarCoverTemp(file);

    res.json({
        ok: true,
        file
    });
});

// Ver cover
ejercicioRoutes.get('/cover/:img', (req: any, res: Response)=>{
    const img = req.params.img;
    const pathFoto = fileSystem.getCoverUrl(img);
    res.sendFile(pathFoto);
});

// Ver imagenes
/*
ejercicioRoutes.get('/imgs/:img', (req: any, res: Response)=>{
    const imgs = req.params.imgs;
    const pathFoto = fileSystem.getImgUrl(imgs);
    res.sendFile(pathFoto);
});
 */

export default ejercicioRoutes;