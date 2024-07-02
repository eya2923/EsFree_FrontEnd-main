import { Covoiturage } from "./covoiturage"; 


export class Avis {
  id_avis!: number;
  objet!: string;
  description!: string;
  date_avis!: string; 
  statut!: number;
  covoiturage!: Covoiturage;
  id_cov!: number;
  
}