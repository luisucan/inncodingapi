import jwt from 'jsonwebtoken';

export default class Token{
    static generar( session:any ):string{
        return jwt.sign({
            session
        },'dXZsYTE5MDI5MQ==',{ expiresIn: 600000 });
    }
}