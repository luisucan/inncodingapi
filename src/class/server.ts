import express = require('express');
import cors from 'cors';
import '../pathControllers/pathsControllers';
import { appRouter } from '../decorators/rest.decorators';

export default class Server{

    public app: express.Application;
    public port: number;

    constructor( port:number ){
        this.port = port;
        this.app = express();
    }
    static init( puerto:number ){
        return new Server( puerto );
    }

    start( ){
        
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( appRouter );
        //cors

        this.app.listen( this.port, ()=>{
            console.log(`servidor en linea en el puerto ${this.port}`);
        } );
    }


}