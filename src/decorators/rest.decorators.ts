import { Router } from 'express';

export const appRouter = Router();

interface IOptions{
    path:string;
    method?: string;
    middlewares?:any[];
}

function GET(options:IOptions){
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        (appRouter as any)['get'](options.path, options.middlewares || [] ,target[propertyKey]);
     };
}

function POST(options:IOptions){
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        (appRouter as any)['post'](options.path, options.middlewares || [] , target[propertyKey]);
     };
}

function PUT(options:IOptions){
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        (appRouter as any)['put'](options.path, options.middlewares || [] , target[propertyKey]);
     };
}

function DELETE(options:IOptions){
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        (appRouter as any)['delete'](options.path, options.middlewares || [] , target[propertyKey]);
     };
}

export {GET,POST,PUT,DELETE};