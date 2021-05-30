import { IsEmail, IsNotEmpty } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";

@Entity()
@Unique("index_user",["username"])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty({message:'The name is required'})
    name: string;

    @Column()
    lastname: string;

    @Column()
    @IsNotEmpty({message:'The username is required'})
    username: string;

    @Column()
    @IsNotEmpty({message:'The password is required'})
    password: string;

    @Column()
    @IsEmail({},{message:'Incorrect email'})
    email: string;

    @Column()
    @IsNotEmpty({message:'The status is required'})
    status: number;

}
