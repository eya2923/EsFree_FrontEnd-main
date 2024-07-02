import { Maison } from "./maison";
import { User } from "./user";

export class Contratlocation {
    id_contrat!: number;
    date_debut!: Date;
    date_fin!: Date;
    m!: Maison;
    colocataires!: User[];

}
