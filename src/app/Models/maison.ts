import { Contratlocation } from "./contratlocation";
import { User } from "./user";

export class Maison {
    id_maison!: number;
    adresse!: string;
    prix!: number;
    description!: string;
    nbrplacedispo!: number;
    images!: string[];
    contratsLocation!: Contratlocation[];
    demandeurs!: User[];
    user!: User ; 

}
