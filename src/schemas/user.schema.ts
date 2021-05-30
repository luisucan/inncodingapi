import Joi from "joi"
import { User } from "../entity/user";
import { options } from "./option";

export const validateUser = ( body:any ):User=>{

    const schema = Joi.object({
        name: Joi.string().required(),
        lastname: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string(),
        status: Joi.number().required()
    });
    const {error,value} = schema.validate(body,options);
    if(error)throw error.details.map(x => x.message).join(', ');
    return value;
}

export const validateUserUpdate = ( body:any ):User=>{

    const schema = Joi.object({
        name: Joi.string().required(),
        lastname: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string(),
        status: Joi.number().required()
    });
    const {error,value} = schema.validate(body,options);
    if(error)throw error.details.map(x => x.message).join(', ');
    return value;
}
