export class PubItem {
    id_pub?: number;
    name!: string;
    description!: string;
    image!: string;
    prix!: number;
    numTelephone!: number;
    etat!: Etat;
    datePost?: Date;

}

export enum Etat {
    Excellente = 'excellente',
    Bien = 'bien',
    Moyenne = 'moyenne',
    Mauvaise = 'mauvaise'
}