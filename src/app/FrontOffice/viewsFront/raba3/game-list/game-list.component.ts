import { Component, OnInit } from '@angular/core';
import { Jeux, TypeJeux } from 'src/app/Models/Jeux';
import { GameService } from 'src/app/Services/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

    jeux: Jeux = new Jeux();

    constructor(private gameService:GameService){ }
    public games: Array<Jeux> =[];

    ngOnInit(): void {
      this.getListGames();
    }


    getListGames()
    {
     this.gameService.getListGames().subscribe(
       (d) => {
        d.forEach((type:Jeux) =>
         {
           console.log(type.idJeux);
           console.log(type.nom);
           console.log(type.typeJeux);
          
           this.games = d ;
         })
       },
       (error) => 
         {
           console.error(error);
         }
       );
      }

      getListGamesCard(): void {
        const card: TypeJeux = TypeJeux.JEUX_DE_CARTE;
        const typeAsString: string = TypeJeux[card]; // Convert enum value to string
        this.gameService.retrieveGameByType(typeAsString).subscribe(
          (games: Jeux[]) => {
            this.games = games;
            console.log(this.games);
          },
          (error) => {
            console.error(error);
          }
        );
      }
      getListGamesSport(): void {
        const sport: TypeJeux = TypeJeux.SPORTS;
        const typeAsString: string = TypeJeux[sport]; // Convert enum value to string
        this.gameService.retrieveGameByType(typeAsString).subscribe(
          (games: Jeux[]) => {
            this.games = games;
            console.log(this.games);
          },
          (error) => {
            console.error(error);
          }
        );
      }
      
    

}
