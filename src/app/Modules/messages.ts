import { User } from "../Models/user";
import { lostandfound } from "./LostandFound";

export class message{
    idmessage!:number;
     content!:string;
     sendat!:Date;
     idpub!:lostandfound;
     iduser!:User;
     
}