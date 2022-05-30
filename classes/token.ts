import jwt from 'jsonwebtoken';

export default class Token{
    private static seed: string = 'La-cosita-de-mi-cosita-me-da-cosita';
    private static caducidad: string = '30d';
    constructor(){}

    static getJwtToken(payload: any): string{
        // Firmar token con el usuario, la semilla y la fecha de caducidad de la semilla
        return jwt.sign({usuario:payload}, this.seed, {expiresIn: this.caducidad});
    }

    static comprobarToken(userToken: string){
        return new Promise((resolve, reject)=>{
            jwt.verify(userToken, this.seed, (err, decoded)=>{
                if(err){
                    reject();
                }else{
                    resolve(decoded);
                }
            })
        });
    }
}