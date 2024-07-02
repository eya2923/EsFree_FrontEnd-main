import { Component, OnInit } from '@angular/core';
import { AddCovoiturageComponent } from '../add-covoiturage/add-covoiturage.component';
import { Router } from '@angular/router';
import { Covoiturage } from 'src/app/Models/covoiturage';
import { CovoiturageService } from 'src/app/Services/covoiturage.service';
import { Avis } from 'src/app/Models/avis';
import { AvisService } from 'src/app/Services/avis.service';
import { MatDialog } from '@angular/material/dialog';
import { MapComponent } from '../map/map.component'; 
import { MapService } from 'src/app/Services/map.service';

@Component({
  selector: 'app-list-covoiturage',
  templateUrl: './list-covoiturage.component.html',
  styleUrls: ['./list-covoiturage.component.css']
})
export class ListCovoiturageComponent implements OnInit{
  constructor(private router:Router , private covoiturageService:CovoiturageService , private avisService:AvisService,public dialog: MatDialog,){ } 
  
  public covoiturages: Array<Covoiturage> =[];
  covoiturage: Covoiturage = new Covoiturage();
  avis : Avis = new Avis();
  listavisCov: { [id_cov: string]: Avis[] } = {};
  searchTerm: string = '';
  showAddDialog: boolean = false;
  selectedCovoiturageId!: number;
  currentPage: number = 1;
  CovPerPage: number = 4;
  totalCov: number = 0;
  totalPages: number = 0;
  pages: number[] = [];
  startIndex: number = 0;
  endIndex: number = 0;
  

  //public listavisCov: Array<Avis> =[];

  ngOnInit(): void {
    this.getListCovoiturage();
    this.loadCovoiturages();
   
   
  }


  updateCovPerPage(): void {
    this.startIndex = (this.currentPage - 1) * this.CovPerPage;
    this.endIndex = Math.min(this.startIndex + this.CovPerPage, this.totalCov);
   // this.filteredEvents = this.events.slice(this.startIndex, this.endIndex);
  }
  

  changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updateCovPerPage();
  }

/*
  submitAvis() {
    if (!this.avis.description) {
      // Show error message if description is empty
      console.log("Description is required.");
      return;
    }
    // Add the avis for the selected covoiturage
    this.avisService.addAvis(this.avis, this.selectedCovoiturageId)
      .subscribe(
        (response) => {
          console.log("Avis added successfully:", response);
          // Refresh the list of avis
          this.getListAvis(this.selectedCovoiturageId);
          // Reset the form
          this.avis = new Avis();
        },
        (error) => {
          console.error("Error adding avis:", error);
          // Handle error
        }
      );
  }
*/
    ajouterCovoiturage() {
      this.router.navigate(['/user/addCovoiturage']);
    
    }
    getListCovoiturage()
  {
   this.covoiturageService.getListCovoiturage().subscribe(
     (d) => {
      d.forEach((type:Covoiturage) =>
       {
         console.log(type.id_cov);
         console.log(type.nombre_placecov);
         console.log(type.lieu_depart);
         console.log(type.destination);
         console.log(type.date_depart);
         console.log(type.description);
         this.covoiturages = d ;
         this.getListAvis(type.id_cov);
         

       })
     },
     (error) => 
       {
         console.error(error);
       }
     );
    }
    
     loadCovoiturages() {
      this.covoiturageService.getListCovoiturage().subscribe(
        data => {
          this.covoiturages = data;
        },
        error => {
          console.error('Error loading covoiturages:', error);
          // Handle the error appropriately, e.g., display an error message to the user
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
  

  

    openDialog(lieu_depart: string): void {
      this.showAddDialog = true;
      setTimeout(() => {
      }, 100); // Delay to ensure that the dialog is fully rendered before initializing the map
    }
    

 
  navigateToCovDetail(id_cov:number) {
    this.router.navigate(['/user/DetailCov',id_cov]); // Redirige vers la page event-detail avec l'ID de l'événement en tant que paramètre
  }
  searchCov(): void {
    if (this.searchTerm.trim()) {
      this.covoiturageService.retrieveCovByDest(this.searchTerm).subscribe(covoiturages => {
        this.covoiturages = covoiturages;
      });
    } else {
      // Si le champ de recherche est vide, rechargez la liste complète des événements approuvés
      this.covoiturageService.getListCovoiturage().subscribe(covoiturages => {
        this.covoiturages = covoiturages;
      });
    }
  }

}



