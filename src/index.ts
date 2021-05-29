import "reflect-metadata";
import { createConnection } from "typeorm";
import Server from "./class/server";

const server = Server.init( 3000 );
createConnection();
server.start();


