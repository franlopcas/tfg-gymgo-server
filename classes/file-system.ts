import { FileUpload } from "../interfaces/file-upload";
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem{
    constructor(){}

    guardarImagenTemporal(file: FileUpload, userId: string){
        return new Promise<void>((resolve, reject)=>{
            // Crear carpetas
            const path = this.crearCarpetaUsuario(userId);

            // Nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);

            // Mover el archivo del Temp a nuestra carpeta
            file.mv(`${path}/${nombreArchivo}`, (err: any)=>{
                if(err){
                    reject(err);
                }else{
                    resolve();
                }
            });
        });
    }

    guardarCoverTemp(file: FileUpload){
        return new Promise<string>((resolve, reject)=>{
            const pathDir = path.resolve(__dirname, '../uploads/cover/temp');
            // Nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            const existe = fs.existsSync(pathDir);
            if(!existe){
                fs.mkdirSync(pathDir);
            }
            file.mv(`${pathDir}/${nombreArchivo}`, (err: any)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(nombreArchivo);
                }
            });
        });     
    }

    guardarCover(file: FileUpload){
        return new Promise<string>((resolve, reject)=>{
            const pathDir = path.resolve(__dirname, '../uploads/cover');
            // Nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            const existe = fs.existsSync(pathDir);
            if(!existe){
                fs.mkdirSync(pathDir);
            }
            file.mv(`${pathDir}/${nombreArchivo}`, (err: any)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(nombreArchivo);
                }
            });
        });     
    }
     
    private crearCarpetaUsuario(userId: string){
        const pathUser = path.resolve(__dirname, '../uploads/',userId);
        const pathUserTemp = pathUser + '/temp';
        const existe = fs.existsSync(pathUser);
        if(!existe){
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }

    private generarNombreUnico(nombreOriginal: string){
        // Extraemos extensión del archivo
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length-1];
        const idUnico = uniqid();

        return `${idUnico}.${extension}`;
    }

    private obtenerImagenesEnTemp(userId: string){
        const pathTemp = path.resolve(__dirname,'../uploads/', userId, 'temp');
        return fs.readdirSync(pathTemp) || [];
    }

    private obtenerCoverEnTemp(){
        const pathTemp = path.resolve(__dirname,'../uploads/cover/temp');
        return fs.readdirSync(pathTemp) || [];
    }
    
    vaciarCoverTemp(){
        const pathTemp = path.resolve(__dirname,'../uploads/cover/temp');
        const existe = fs.existsSync(pathTemp);
        if(existe){
            fs.rmSync(pathTemp, {recursive: true});
        }
    }

    coverDeTempHaciaEjercicio(){
        const pathTemp = path.resolve(__dirname,'../uploads/cover/temp');
        const pathEjercicio = path.resolve(__dirname, '../uploads/ejercicios');

        if(!fs.existsSync(pathTemp)){
            return [];
        }

        if(!fs.existsSync(pathEjercicio)){
            fs.mkdirSync(pathEjercicio);
        }

        const coverTemp = this.obtenerCoverEnTemp();
        fs.renameSync(`${pathTemp}/${coverTemp}`,`${pathEjercicio}/${coverTemp}`);

        return coverTemp[0];
    }

    imagenesDeTempHaciaEjercicio(userId: string){
        const pathTemp = path.resolve(__dirname, '../uploads/',userId,'temp');
        const pathEjercicio = path.resolve(__dirname, '../uploads/',userId, 'ejercicios');

        if(!fs.existsSync(pathTemp)){
            return [];
        }

        if(!fs.existsSync(pathEjercicio)){
            fs.mkdirSync(pathEjercicio);
        }

        const imagenesTemp = this.obtenerImagenesEnTemp(userId);
        imagenesTemp.forEach(imagen =>{
            fs.renameSync(`${pathTemp}/${imagen}`,`${pathEjercicio}/${imagen}`)
        });

        return imagenesTemp;
    }

    getCoverUrl(img: string){
        const pathFoto = path.resolve(__dirname, '../uploads/ejercicios', img);
        const existe = fs.existsSync(pathFoto);
        if(!existe){
            return path.resolve(__dirname, '../assets/400x250.jpg')
        }
        return pathFoto;
    }
}