import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Raba3 } from 'src/app/Models/raba3';
import { Raba3Service } from 'src/app/Services/raba3.service';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-user-sessions',
  templateUrl: './user-sessions.component.html',
  styleUrls: ['./user-sessions.component.css']
})
export class UserSessionsComponent implements OnInit {
 // name: string = "rechpa";
  sessions: Raba3[] = [];
  newSession: Raba3 = new Raba3();
  showUpdateDialog: boolean = false;
  selectedGameId!: number;
  selectedGame: Raba3 | undefined;
  username!: string;
  name = localStorage.getItem('name');
  getName(){
    if(this.name)
    this.username=this.name

  }

  constructor(private act: ActivatedRoute, private raba3Service: Raba3Service, private router: Router) { }

  ngOnInit(): void {
    this.getName()
    console.log(this.username)
    this.act.params.subscribe(params => {
      this.username = this.act.snapshot.params['name']
    });
    this.retrieveGameSessions();
  }

  retrieveGameSessions(): void {
    this.getName()
    console.log(this.username)
    this.raba3Service.retrieveUserGameSession(this.username).subscribe(
      (sessions: Raba3[]) => {
        this.sessions = sessions;
      },
      (error) => {
        console.error('Error retrieving game sessions:', error);
      }
    );
  }
  closeUpdateDialog(): void {
    this.showUpdateDialog = false;
    window.location.reload();

  }


  openUpdateDialog(idRaba3: number): void {
    this.selectedGameId = idRaba3;
    this.selectedGame = this.sessions.find(session => session.idRaba3 == idRaba3)
    $('#myModalUpdate').modal('show');
    this.showUpdateDialog = true;
    this.raba3Service.retieveGameSessionSpecificUser(idRaba3, this.username).subscribe(
      (session: Raba3) => {
        this.newSession = session;
      },
      (error) => {
        console.error('Error retrieving game session:', error);
      }
    );
  }
  
  onSubmitUpdate(): void {
    if (this.selectedGameId && this.selectedGame) { 
  
    this.raba3Service.updateGameSession(this.selectedGameId, this.selectedGame).subscribe(
      (updatedSession : Raba3) => {
        console.log('Game session updated:', updatedSession);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Game updated Successfully !',
          showConfirmButton: false,
          timer: 2000
        });
        this.closeUpdateDialog();
        // Handle successful update here
      },
      (error) => {
        console.error('Failed to update game session:', error);
        // Handle error here
      }
    );
  }
}

  deleteGameSession(idRaba3: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this game session?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.raba3Service.deleteGameSession(idRaba3).subscribe(
          () => {
            this.sessions = this.sessions.filter(session => session.idRaba3 !== idRaba3);
            Swal.fire('Deleted!', 'Your game session has been deleted.', 'success');
          },
          (error) => {
            console.error('Error deleting game session:', error);
            Swal.fire('Error!', 'Failed to delete the game session', 'error');
          }
        );
      }
    });
  }

  getNumberArray(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }

}
