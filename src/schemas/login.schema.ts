import Joi from "joi"
import { options } from "./option";

export const validateLogin = ( body:any )=>{
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    const {error,value} = schema.validate(body,options);
    if(error)throw error.details.map(x => x.message).join(', ');
    return value;
}