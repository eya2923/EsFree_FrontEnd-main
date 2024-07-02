import { Component,OnInit } from '@angular/core';
import { Avis } from 'src/app/Models/avis';
import { AvisService } from 'src/app/Services/avis.service';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.css']
})
export class AvisComponent implements OnInit {
  avis: Avis = new Avis();
  public listavis: Array<Avis> =[];
  listavisCov: Avis[] = []; 
  selectedCovoiturageId: any;
  constructor(private AvisService:AvisService){}

  ngOnInit(): void {
      this.getListAvis();
  }
  getListAvis()
  {
   this.AvisService.getListAvis().subscribe(
     (d) => {
      d.forEach((type:Avis) =>
       {
         console.log(type.id_avis);
         console.log(type.description);
         
        
         this.listavis = d ;
       })
     },
     (error) => 
       {
         console.error(error);
       }
     );
    }
    onSelectCovoiturage(event: Event) {
      const selectedValue = (event.target as HTMLSelectElement).value;
      // Use the selectedValue to filter avis by carpooling ID
  }

  getAvisByCov(id_cov: any) {
      this.AvisService.getAvisByCov(id_cov).subscribe(
          (avisList: Avis[]) => {
              this.listavisCov = avisList;
          },
          (error) => {
              console.error(error);
          }
      );
  }
}
