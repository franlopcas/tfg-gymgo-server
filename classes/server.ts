import  express  from 'express';

export default class Server{
    public app: express.Application;
    public port;
    //public port: number = 3000;

    constructor(){
        // Crea una instancia del servidor
        this.app = express();
        this.port = process.env.PORT || 3000;
    }

    start(callback: () => void){
        // Hace correr el servidor
        this.app.listen(this.port, callback);
    }
}
