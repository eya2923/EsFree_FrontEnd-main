import { Component, OnInit } from '@angular/core';
import { CovoiturageService } from 'src/app/Services/covoiturage.service';
import { Covoiturage } from 'src/app/Models/covoiturage';
import { AvisService } from 'src/app/Services/avis.service';
import { Avis } from 'src/app/Models/avis';
declare var $: any;
@Component({
  selector: 'app-my-covoiturages',
  templateUrl: './my-covoiturages.component.html',
  styleUrls: ['./my-covoiturages.component.css']
})
export class MyCovoituragesComponent implements OnInit{
  public covoiturages: Array<Covoiturage> =[];
  ListCov: Covoiturage[] = [];
  covoiturage: Covoiturage = new Covoiturage();
  public avisList: Array<Avis>=[];
  selectedCovoiturageId!: number;

  selectedCovId!: number;
  showAddDialog: boolean = false;

  listavisCov: { [id_cov: string]: Avis[] } = {};

  selectedCov: Covoiturage | undefined;
  tunisianCities: string[] = [
    "Tunis",
    "Sfax",
    "Sousse",
    "Kairouan",
    "Bizerte",
    "Gabès",
    "Ariana",
    "Gafsa",
    "Manouba",
    "Medenine",
    "Monastir",
    "Nabeul",
    "Tataouine",
    "Tozeur",
    "Zaghouan",
    "Beja",
    "BenArous",
    "Kasserine",
    "Kef",
    "Mahdia",
    "Manouba",
    "SidiBouzid",
    "Siliana",
    "Zarzis",
    "Kébili"
  ];
constructor(private covoiturageService:CovoiturageService , private avisService: AvisService){}
ngOnInit(): void {
    this.retrieveCovoituragesByUser(this.id)
    this.retrieveAllAvisByUser(this.id)
}

openEditCovModal(idCov: number): void {
  this.selectedCovId = idCov;
  this.selectedCov = this.ListCov.find(cov => cov.id_cov === idCov);
  $('#editCovModal').modal('show');
}
editCov() {
  if (this.selectedCovId && this.selectedCov) { // Vérifiez si selectedCovId et selectedCov sont définis
    this.covoiturageService.updateCov(this.selectedCovId, this.selectedCov)
      .subscribe(
        (updatedCov: Covoiturage) => {
          $('#editCovModal').modal('hide');
        },
        (error: any) => console.error(error)
      );
  } else {
    console.error('Selected ID or covoiturage not found');
  }
}
userId = localStorage.getItem('angular17TokenUserId');
  id!: number ;

  getId(){
     if(this.userId ){
     this.id=parseFloat(this.userId)
  }
}


  retrieveCovoituragesByUser(userId: number): void {
    this.getId()
    console.log(this.id)
    this.covoiturageService.retrieveAllCovByUser(this.id).subscribe(
      (d) => {
        d.forEach((type:Covoiturage) =>
         {
           console.log(type.id_cov);
           console.log(type.nombre_placecov);
           console.log(type.lieu_depart);
           console.log(type.destination);
           console.log(type.date_depart);
           console.log(type.description);
           this.ListCov = d ;
           this.getListAvis(type.id_cov);
           console.log(this.id)
  
         })
       },
       (error) => 
         {
           console.error(error);
         }
       );
  }

  deleteCovoiturage(id_cov: number) {
    
    
    this.covoiturageService.deleteCovoiturage(id_cov).subscribe(
      response => {
        console.log('Covoiturage deleted successfully:', response);
        window.location.reload()
     
      },
      (error) => {
        console.error('Error deleting covoiturage:', error);
        // Handle error
      }
    );
  }
  retrieveAllAvisByUser(id:number) {
    this.avisService.retrieveAllAvisByUser(this.id)
      .subscribe(avisList => {
        this.avisList = avisList;
      });
  }
  
deleteavis(id_avis:number)
{
  this.avisService.deleteAvis(id_avis).subscribe(
    response => {
      console.log('avis deleted successfully:', response);
window.location.reload()
   
    },
    (error) => {
      console.error('Error deleting avis:', error);
      // Handle error
    }
  );
}  
getListAvis(id_cov:any)
    { 
      this.avisService.getAvisByCov(id_cov)
      .subscribe(
        (avisList: Avis[]) => {
          this.listavisCov[id_cov] = avisList;
        },
        (error) => {
          console.error(error);
        }
      );
  }  
  openDialog(id_cov:number): void {
    this.showAddDialog = true;
    this.selectedCovoiturageId = id_cov;
    
  }
}
