import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Jeux, TypeJeux } from 'src/app/Models/Jeux';
import { GameService } from 'src/app/Services/game.service';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.css']
})
export class GameAddComponent{

  formgame!: FormGroup
  id!: number

  listgame:Jeux[]=[]
  constructor(private act:ActivatedRoute, private gameservice:GameService, private router:Router){
    
  }

  ngOnInit(): void {
    this.formgame=new FormGroup({
      nom: new FormControl('',Validators.required),
      typeJeux: new FormControl('',Validators.required),
    })
    
  }


  addGame(){
    this.gameservice.addGame(this.formgame.value).subscribe(
      () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Game added Successfully !',
          showConfirmButton: false,
          timer: 1500
        });
      this.router.navigate(['/admin/gameListB'])
    })
  }
}
