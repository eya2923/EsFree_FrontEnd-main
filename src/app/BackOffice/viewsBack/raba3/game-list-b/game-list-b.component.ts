import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jeux } from 'src/app/Models/Jeux';
import { GameService } from 'src/app/Services/game.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

declare var $: any;


@Component({
  selector: 'app-game-list-b',
  templateUrl: './game-list-b.component.html',
  styleUrls: ['./game-list-b.component.css']
})


export class GameListBComponent implements OnInit{

  games: Jeux[] = [];
  jeux: Jeux = {} as Jeux;
  affiche_modif : boolean = false;
  newGame: Jeux = new Jeux(); 
  showUpdateDialog: boolean = false;
  searchText:any;
  searchDate: string = '';


  openUpdateDialog() {
    this.showUpdateDialog = true;
  }

  closeUpdateDialog() {
    this.showUpdateDialog = false;
    window.location.reload();
  }
  

  constructor(private gameservice: GameService, private router: Router,private dialog :MatDialog) {}

  ngOnInit(): void {
    this.getListGames();

    }
    

  getListGames():void {

    this.gameservice.getListGames().subscribe(games => {
      this.games = games;
    });
  }

  OpenEditModalGame(idJeux: number): void {
    this.openUpdateDialog();
    this.gameservice.retrieveGame(idJeux).subscribe((games: Jeux) => {
      // Affecter les valeurs récupérées aux champs de formulaire
      this.newGame = games;
      
      
    });
  }

  updateGame(): void {
    this.gameservice.updateGame(this.newGame).subscribe(
      response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Game updated Successfully !',
          showConfirmButton: false,
          timer: 1500
        });
        this.closeUpdateDialog();
      },
      error => {
        console.error('Erreur lors de la mise à jour du jeux : ', error);
      }
    );
  }


  deleteGame(idJeux: number): void {
    // Affichage de la boîte de dialogue de confirmation
    Swal.fire({
      title: 'Are you sure ?',
      text: 'You want to delete this game ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it.',
      cancelButtonText: 'No, cancel.'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Yes", supprimez l'événement
        this.gameservice.deleteGame(idJeux)
          .subscribe(
            () => {
              // Mettez à jour la liste des événements après la suppression
              this.games = this.games.filter(jeux => jeux.idJeux !== idJeux);
              // Affichez une alerte de suppression réussie
              Swal.fire('Deleted!', 'Your game has been deleted.', 'success');
            },
            (error: any) => {
              console.error('Error deleting game:', error);
              // Affichez une alerte d'erreur en cas d'échec de suppression
              Swal.fire('Error!', 'Failed to delete the game.', 'error');
            }
            
          );
          window.location.reload();

      }
    });
  }

}
