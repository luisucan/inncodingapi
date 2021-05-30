import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { DELETE, GET, POST, PUT } from "../decorators/rest.decorators";
import bcrypt from 'bcryptjs'

import { User } from "../entity/user";
import { validateLogin } from "../schemas/login.schema";
import Login from "../interface/login.interface";
import Token from "../class/token";
import verificarToken from "../middleware/authentication";
import { validateUser, validateUserUpdate } from "../schemas/user.schema";
import Convert from "../class/convert";

export default class LoginController{

    @GET({path:'/users',middlewares:[verificarToken]})
    async users( req:Request,res:Response ){
        try {
            let users:User[] = await getRepository(User).find();
            users = users.map((user:User)=>{ 
                delete user.password;
                return user;
            });
            return res.json( users );
        } catch (error) {
            return res.status(400).json({
                message: error
            })
        }
    }

    @POST({path:'/login'})
    async login( req:Request,res:Response ){
        try {
            const login:Login = validateLogin( req.body );
            
            const userdb:User = await getRepository(User).findOne({username:login.username,status:1});
            if(!userdb && !bcrypt.compareSync(login.password,userdb.password))
                throw 'wrong user or password'
            if(!bcrypt.compareSync(login.password,userdb.password))
                throw 'wrong user or password'  
            delete userdb.password;

            //GENERANDO TOKEN
            const token = Token.generar( userdb );

            return res.json( {
                user:userdb,
                token
            });
        } catch (error) {
            return res.status(400).json({
                message: error
            })
        }
    }

    @POST({path:'/register'})
    async register( req:Request,res:Response ){
        try {
            let user:User = validateUser( req.body );
            user.password = bcrypt.hashSync(user.password, 10);

            const newUser = getRepository(User).create( user );
            const resultUser:User = await getRepository(User).save( newUser );
            delete resultUser.password;

            return res.json( resultUser );
        } catch (error) {
            return res.status(400).json({
                message: error
            })
        }
    }

    @PUT({path:'/users/:id',middlewares:[verificarToken]})
    async update( req:Request,res:Response ){
        try {
            let id:number = Convert.number( req.params.id );
            let user:User = validateUserUpdate( req.body );

            const userdb = await getRepository(User).findOne(id);
            if(!userdb) throw 'user no found';

            getRepository(User).merge(userdb,user);
            const userResult = await getRepository(User).save(userdb);
            delete userResult.password;

            return res.json( userResult );
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message: error
            })
        }
    }

    @DELETE({path:'/users/:id'})
    async delete( req:Request,res:Response ){

    }

}