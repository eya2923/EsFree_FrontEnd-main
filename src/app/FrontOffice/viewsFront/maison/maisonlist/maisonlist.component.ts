import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Maison } from 'src/app/Models/maison';
import { MaisonService } from 'src/app/Services/maison.service';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/Models/user';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { CoordinatesMapService } from 'src/app/Services/coordinates-map.service';
import 'leaflet-routing-machine'
import { error } from 'jquery';
import { UserService } from 'src/app/Service/user.service';
@Component({
  selector: 'app-maisonlist',
  templateUrl: './maisonlist.component.html',
  styleUrls: ['./maisonlist.component.css']
})
export class MaisonlistComponent {
  maison : Maison[]=[]
  affiche_add: boolean = false;
  affiche_modif : boolean = false;
  newMaison: Maison = new Maison(); 
  showAddDialog: boolean = false;
  showUpdateDialog: boolean = false;
  demandeur!:User;
  maisonsDisponibles: Maison[]=[];
  maisons!: any[];
  priceRange: number = 0;
  minPrice: number = 0;
  maxPrice: number = 2000;
  sortOrder: string = 'asc'; 
  totalPages: number = 0;
  pageNumber: number = 0;
  pageSize: number = 6; 
  map: any;
  loc!:string;
  searchTerm: string = '';
  userId = localStorage.getItem('angular17TokenUserId');
  id!: number ;
  username = localStorage.getItem('name');

  getId(){
     if(this.userId ){
     this.id=parseFloat(this.userId)
  }
}


  openAddDialog() {
    this.showAddDialog = true;
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

  constructor(private maisonService: MaisonService, private router: Router,private dialog :MatDialog,private http: HttpClient,private MapService:CoordinatesMapService,private userservice : UserService) {
    this.newMaison.user = {
      id: 3,
      name: 'fedi',
      email: 'fedi.benameur@esprit.tn',
      password: 'fedi',
      image :'',
      phoneNumber : 93661180,
      role :'[USER]'
    };
    this.demandeur ={
      id: 4,
      name: 'fedi2',
      email: 'fedi2.benameur@esprit.tn',
      password: 'Azertyuiop1',
      image :'',
      phoneNumber : 93661180,
      role :'[USER]'

    }
  }
  ngOnInit(){
    this.getId()
    this.listMaisons(this.pageNumber);
    this.initMap(); 
  }
  listMaisons(pageNumber: number): void {
    this.maisonService.findAllMaisons().subscribe(
      maisons => {
        // Filtrer les maisons avec un nombre de places disponibles > 0 et dans la plage de prix sélectionnée
        this.maisonsDisponibles = maisons.filter(maison => maison.nbrplacedispo > 0 && maison.prix >= this.minPrice && maison.prix <= this.maxPrice);
  
        // Trier les maisons en fonction de sortOrder
        if (this.sortOrder === 'asc') {
          this.maisonsDisponibles.sort((a, b) => a.prix - b.prix);
        } else if (this.sortOrder === 'desc') {
          this.maisonsDisponibles.sort((a, b) => b.prix - a.prix);
        }
  
        // Recalculer le nombre total de pages
        this.recalculateTotalPages(this.maisonsDisponibles.length);
  
        // Découper les maisons en pages
        const chunkedMaisons = this.chunkArray(this.maisonsDisponibles, this.pageSize);
  
        // Sélectionner la page spécifique
        this.maisonsDisponibles = chunkedMaisons[pageNumber];
        console.log(this.maisonsDisponibles)
      },
      error => {
        console.error('Error loading houses:', error);
      }
    );
  }

  
  
  onSubmit(): void {
    this.getId()
    console.log('Nouvelle maison a été ajouté', this.newMaison);

    this.maisonService.addMaisonByUser(this.newMaison,this.id).subscribe(() => {
      console.log('Nouvelle maison a été ajouté', this.newMaison);
      this.showAddDialog = false;
      window.location.reload();
      
    });
  }
  

  deleteMaison(idMaison: number): void {
    this.maisonService.deleteMaison(idMaison).subscribe(() => {
      console.log("Maison supprimé avec succés");
    }, (error) => {
      console.log("Echec dasn la suppression de cette maison ");
    });
    window.location.reload();
  }

  /*reserverMaison(maisonId: number, demandeur: User): void {
    console.log(demandeur)
    this.maisonService.ajouterDemandeur(maisonId, demandeur)
      .subscribe(() => {
        // Affichez une alerte de succès pour la demande envoyée
        Swal.fire('Success!', 'Demande envoyée avec succès', 'success');
        console.log('Demandeur ajouté avec succès');
        console.log(demandeur)
      }, (error) => {
        console.error('Erreur dans l\'Envoie de cette demande. : ', error);
        // Affichez une alerte d'erreur en cas d'échec de l'ajout du demandeur
        Swal.fire('Error!', 'Erreur dans l\'Envoie de cette demande.', 'error');
      });
      this.http.post<any>('http://localhost:8082/send-sms', {}).subscribe( 
      response => {
        console.log('SMS envoyé avec succès');
      },
      error => {
        console.error('Erreur lors de l\'envoi du SMS :', error);
      }
    );
      
  }*/
    reserverMaison(maisonId: number, demandeurid: number): void {
      console.log("le demandeur id : ",demandeurid)
      this.maisonService.ajouterDemandeur(maisonId, demandeurid)
        .subscribe(() => {
          // Affichez une alerte de succès pour la demande envoyée
          Swal.fire('Success!', 'Demande envoyée avec succès', 'success');
          console.log('Demandeur ajouté avec succès');
          console.log(demandeurid)
        }, (error) => {
          console.error('Erreur dans l\'Envoie de cette demande. : ', error);
          // Affichez une alerte d'erreur en cas d'échec de l'ajout du demandeur
          Swal.fire('Error!', 'Erreur dans l\'Envoie de cette demande.', 'error');
        });
        this.http.post<any>('http://172.213.199.171:8082/send-sms', {}).subscribe(
        response => {
          console.log('SMS envoyé avec succès');
        },
        error => {
          console.error('Erreur lors de l\'envoi du SMS :', error);
        }
      );
        
    }
  /*reserverMaison(maisonId: number, demandeur_id: number): void {
    // Récupérer les détails du demandeur par son ID
    this.userservice.GetUser(demandeur_id).subscribe(
      demandeur => {
        // Si le demandeur est trouvé, continuer avec la réservation de la maison
        if (demandeur) {
          this.maisonService.ajouterDemandeur(maisonId, demandeur)
            .subscribe(() => {
              // Affichez une alerte de succès pour la demande envoyée
              Swal.fire('Success!', 'Demande envoyée avec succès', 'success');
              console.log('Demandeur ajouté avec succès');
            }, (error) => {
              console.error('Erreur dans l\'Envoie de cette demande. : ', error);
              // Affichez une alerte d'erreur en cas d'échec de l'ajout du demandeur
              Swal.fire('Error!', 'Erreur dans l\'Envoie de cette demande.', 'error');
            });
          // Envoyer le SMS après avoir ajouté le demandeur à la maison
          this.http.post<any>('http://localhost:8082/send-sms', {}).subscribe(
            response => {
              console.log('SMS envoyé avec succès');
            },
            error => {
              console.error('Erreur lors de l\'envoi du SMS :', error);
            }
          );
        } else {
          // Si aucun demandeur n'est trouvé avec l'ID spécifié, affichez une alerte d'erreur
          Swal.fire('Error!', 'Demandeur introuvable.', 'error');
          console.error('Demandeur introuvable');
        }
      },
      error => {
        console.error('Erreur lors de la récupération du demandeur :', error);
        // Affichez une alerte d'erreur en cas d'échec de récupération du demandeur
        Swal.fire('Error!', 'Erreur lors de la récupération du demandeur.', 'error');
      }
    );
  }*/

  onRangeChange(pageNumber: number) {
    this.listMaisons(pageNumber);
}
  sortMaisons(pageNumber: number) {
    this.listMaisons(pageNumber); // Rechargez les maisons lorsque l'ordre de tri change
  }
  chunkArray(array: any[], pageSize: number): any[] {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += pageSize) {
      chunkedArray.push(array.slice(i, i + pageSize));
    }
    return chunkedArray;
  }

  isNextButtonDisabled(): boolean {
    return this.pageNumber >= this.totalPages - 1;
  }
  isPreviousButtonDisabled(): boolean {
    return this.pageNumber <= 0;
  }

  // Méthode pour recalculer le nombre total de pages
  recalculateTotalPages(totalMaisons: number): void {
    this.totalPages = Math.ceil(totalMaisons / this.pageSize);
  }
  loadMaisons(pageNumber: number): void {
    this.pageNumber = pageNumber; 
    this.listMaisons(pageNumber); 
  }
  initMap(): void {
    this.map = L.map('map').setView([36.900933647068676, 10.184360909117451], 15); 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  addMarker(latitude: number, longitude: number): void {
    L.marker([latitude, longitude]).addTo(this.map);
  }


  getLocationCoordinates(): void {
    this.MapService.getCoordinates(this.loc)
      .then(coordinates => {
        console.log('Latitude:', coordinates.latitude);
        console.log('Longitude:',coordinates.longitude);
        this.addMarker(coordinates.latitude, coordinates.longitude);
        L.Routing.control({
          waypoints: [
            L.latLng(36.8990424,10.187917573856005),
            L.latLng(coordinates.latitude,coordinates.longitude)

          ]
        }).addTo(this.map)
        // Now you can use these coordinates as needed 36.8990424,10.187917573856005
      })
      .catch(error => {
        console.error('Error fetching coordinates:', error);
      });
  }
  // Component
chercherMaison(): void {
  if (this.searchTerm.trim()) {
    this.maisonService.chercherMaison(this.searchTerm).subscribe(
      maisons => {
        this.maisonsDisponibles = maisons;
        console.log("houses:",this.maisonsDisponibles)
      },
      error => {
        console.error('Une erreur est survenue lors de la recherche de maisons :', error);
        // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur
      }
    );
  } else {
    // Gérer le cas où le terme de recherche est vide
  }
}

  }
