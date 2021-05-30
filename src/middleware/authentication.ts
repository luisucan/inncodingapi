import { User } from "../entity/user";
import { Request,Response,NextFunction } from 'express';
import jwt from 'jsonwebtoken';


declare global {
    namespace Express {
        interface Request {
            session: User
        }
    }
}

let verificarToken = ( req:Request,res:Response,next:NextFunction )=>{
    let token = req.get('Authorization');
    
    if(token?.includes('Bearer')){
        token = token.split(' ')[1];//SACANDO EL TOKEN
    }else{
        token = undefined;
    }
    
    
    if( !token ){
        return res.status( 401 ).json({
            ok:false,
            error:'your session has expired'
        });
    }
    
    jwt.verify( token,'dXZsYTE5MDI5MQ==',( error:any,decode:any )=>{
        if( error ){
            return res.status( 401 ).json({
                ok:false,
                error: 'your session has expired'
            });
        }

        req.session = decode.session;
        next();
    });
};

export default verificarToken;