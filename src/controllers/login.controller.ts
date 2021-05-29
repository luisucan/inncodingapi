import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { GET, POST, PUT } from "../decorators/rest.decorators";

import { User } from "../entity/user";

export default class Login{

    @GET({path:'/login'})
    async login( req:Request,res:Response ){
        try {
            const users:User[] = await getRepository(User).find();
            return res.json( users );
        } catch (error) {
            return res.status(400).json({
                message: error
            })
        }
    }

    @POST({path:'/register'})
    async register( req:Request,res:Response ){
        try {
            const newUser = getRepository(User).create( req.body );
            const results = await getRepository(User).save( newUser );
            return res.json( results );
        } catch (error) {
            return res.status(400).json({
                message: error
            })
        }
    }

}