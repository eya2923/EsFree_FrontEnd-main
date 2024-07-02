// jeux.model.ts
export enum TypeJeux {
    JEUX_DE_CARTE,
    SPORTS,
    JEUX_VIDEO
  }
  
  export class Jeux {
    forEach(arg0: (type: Jeux) => void) {
      throw new Error('Method not implemented.');
    }
    idJeux!: number;
    nom!: string;
    typeJeux!: TypeJeux;
    image!: string;
  }
  