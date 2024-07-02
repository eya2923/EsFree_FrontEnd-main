import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Maison } from 'src/app/Models/maison';
import { MaisonService } from 'src/app/Services/maison.service';
import { MatDialog } from '@angular/material/dialog';
import { CoordinatesMapService } from 'src/app/Services/coordinates-map.service';

@Component({
  selector: 'app-maisonlist',
  templateUrl: './maisonlist.component.html',
  styleUrls: ['./maisonlist.component.css']
})
export class MaisonlistbackComponent {
  maison : Maison[]=[]
  affiche_add: boolean = false;
  affiche_modif : boolean = false;
  newMaison: Maison = new Maison(); 
  showAddDialog: boolean = false;
  showUpdateDialog: boolean = false;
  showAddContratDialog: boolean = false;
  userId = localStorage.getItem('angular17TokenUserId');
  id!: number ;
  user_name!: string;
  username = localStorage.getItem('name');

  getId(){
     if(this.userId ){
     this.id=parseFloat(this.userId)
  }
}
  openAddDialog() {
    this.showAddDialog = true;
  }
  openAddContratDialog() {
    this.showAddContratDialog = true;
  }
  openUpdateDialog() {
    this.showUpdateDialog = true;
  }

  closeAddDialog() {
    this.showAddDialog = false;
  }
  closeUpdateDialog() {
    this.showUpdateDialog = false;
  }
  constructor(private maisonService: MaisonService, private router: Router,private dialog :MatDialog,private MapService:CoordinatesMapService) {
    this.newMaison.user = {
      id: 3,
      name: 'fedi',
      email: 'fedi.benameur@esprit.tn',
      password: 'Azertyuiop1',
      image :'',
      phoneNumber : 93661180,
      role :'[USER]'
    };
  }
  ngOnInit() {
    this.getId()
    this.getMaisonsByUtilisateur(this.id);
  }
  getMaisonsByUtilisateur(iduser: number) {
    this.maisonService.getMaisonsByUtilisateur(iduser)
      .subscribe(maison => this.maison = maison);
  }
  
  listMaisons(){
    this.maisonService.findAllMaisons().subscribe(
      maison => {
        this.maison =maison     
      }
    );
  }
  onSubmit(): void {
    this.maisonService.addMaisonByUser(this.newMaison,this.id).subscribe(() => {
      console.log('Nouvelle maison a été ajouté', this.newMaison);
      this.showAddDialog = false;
      
    });
    window.location.reload();
  }

  onModalUpdateOpen(maison: Maison): void {
    this.openUpdateDialog();
    this.newMaison = { ...maison };
  }
  onSubmitUpdate(): void {
    this.maisonService.updateMaison(this.newMaison).subscribe(
      (response) => {
        console.log('Maison mise à jour avec succès', response);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la maison :', error);
      }
    );
    window.location.reload();
  }
  

  deleteMaison(idMaison: number): void {
    this.maisonService.deleteMaison(idMaison).subscribe(() => {
      console.log("Maison supprimé avec succés");
    }, (error) => {
      console.log("Echec dans la suppression de cette maison ");
    });
    window.location.reload();
  }


  
}
