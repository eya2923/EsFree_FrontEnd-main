export class Covoiturage {
    id_cov!: number;
    nombre_placecov!: number;
    date_depart!: string; 
    lieu_depart!: string;
    destination!: string;
    description!: string;
   
    departureLatitude!: number
    departureLongitude!:number
    destinationLatitude!:number
    destinationLongitude!:number
     departureCoords = [this.departureLatitude, this.departureLongitude];
   destinationCoords= [this.destinationLatitude, this.destinationLongitude];
  }
  
  
  