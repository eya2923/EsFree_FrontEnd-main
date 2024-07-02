import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Raba3 } from 'src/app/Models/raba3';
import { Raba3Service } from 'src/app/Services/raba3.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { environments } from "src/environements/environement";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit{
  idJeux!: number
  newSession: Raba3 = new Raba3(); 
  showAddDialog: boolean = false;
  raba3: Raba3 = new Raba3();
  title = 'af-notification';
  message:any = null;
  disableJoinButton: boolean = false; // Flag to disable the join button
  disableJoinButton2: boolean = true; // Flag to disable the join button
  name = localStorage.getItem('name');

  userId = localStorage.getItem('angular17TokenUserId');
  id!: number ;

  getId(){
     if(this.userId ){
     this.id=parseFloat(this.userId)
  }
}


  openAddDialog() {
    this.showAddDialog = true;
  }

  closeAddDialog() {
    this.showAddDialog = false;
  }
  
  constructor(private act:ActivatedRoute,private raba3Service:Raba3Service , private router: Router,private dialog :MatDialog){ }
  public sessions: Array<Raba3> =[];


  ngOnInit(): void {
    this.act.paramMap.subscribe(params => {
      this.idJeux = this.act.snapshot.params['idJeux']
    });

    this.getListSessions(this.idJeux);
    this.requestPermission();
    this.listen();
    console.log(this.name)
  }


  getListSessions(idJeux: number): void {
    this.raba3Service.getListSessions(idJeux).subscribe(
      (d: Raba3[]) => {
        this.sessions = d.map(session => {
          // Convert the dateDebut property to a Date object
          session.dateDebut = new Date(session.dateDebut);
          return session;
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

    getNumberArray(count: number): number[] {
      return Array.from({ length: count }, (_, i) => i + 1);
    }

    

    addGameSessionAndAssignToGame(): void {
      //const staticUserId = 1; // Static user ID value
this.getId()
console.log(this.id)
      this.raba3Service.addGameSessionAndAssignToGameAndUser(this.newSession, this.idJeux, this.id)
        .subscribe(response => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Game Session added Successfully !',
            showConfirmButton: false,
            timer: 1500})
          this.showAddDialog = false;
          window.location.reload();
        });


    }
    shareOnFacebook() {
      const urlToShare = 'https://virtiverse.com'; // URL to share
      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
      window.open(facebookShareUrl, 'join us in this game session !!');
    }

    getTimeUntilStart(startDate: Date): { hours: number, minutes: number } {
      // Get the current time
      const currentTime = new Date();
      
      // Calculate the difference in milliseconds between the start date and the current time
      const timeDifference = startDate.getTime() - currentTime.getTime();
      
      // Convert milliseconds to minutes
      const minutesDifference = Math.floor(timeDifference / (1000 * 60));
      
      // Calculate the remaining hours and minutes
      const hours = Math.floor(minutesDifference / 60);
      const remainingMinutes = minutesDifference % 60;
    
      // Return an object containing the hours and minutes
      return { hours, minutes: remainingMinutes };
    }

    requestPermission() {
      const messaging = getMessaging();
      getToken(messaging, 
       { vapidKey: environments.firebaseConfig.apiKey}).then(
         (currentToken) => {
           if (currentToken) {
             console.log("Hurraaa!!! we got the token.....");
             console.log(currentToken);
           } else {
             console.log('No registration token available. Request permission to generate one.');
           }
       }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
      });
    }
    listen() {
      const messaging = getMessaging();
      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        this.message=payload;
      });
    }

    join(idRaba3: number): void {
      this.disableJoinButton = true;
      this.disableJoinButton2 = false;
this.getId()
      this.raba3Service.addUserToSession(idRaba3, this.id).subscribe(() => {
        console.log('User added to session successfully.');
         // Update the number of players attribute in the session object
    const session = this.sessions.find(s => s.idRaba3 === idRaba3);
    if (session) {
      session.nombrePlaces++; // Increment number of players
      // Update session on the server
      this.raba3Service.updateGameSession(session.idRaba3, session).subscribe(
        updatedSession => {
          console.log('Session updated:', updatedSession);
          // Refresh the session list after successful update
          this.getListSessions(this.idJeux);
          this.sendNotification();
        },
        error => {
          console.error('Failed to update session:', error);
        }
      );
    }
        this.sendNotification();
      }, error => {
        console.error('Failed to add user to session:', error);
      });

      Swal.fire({
        title: "You Joined The Session Successfully !",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("assets/FrontOffice/img/cat.gif")
          left top
          no-repeat
        `
      });
      this.getListSessions(this.idJeux);
    }
  

    leave(idRaba3: number): void {
      this.disableJoinButton2 = false;
this.getId()
      this.raba3Service.removeUserFromSession(idRaba3, this.id).subscribe(() => {
        console.log('User removed successfully.');
        const session = this.sessions.find(s => s.idRaba3 === idRaba3);
        if (session) {
          session.nombrePlaces--; // Decrement number of players
          // Update session on the server
          this.raba3Service.updateGameSession(session.idRaba3, session).subscribe(
            updatedSession => {
              console.log('Session updated:', updatedSession);
              // Refresh the session list after successful update
              this.getListSessions(this.idJeux);
            },
            error => {
              console.error('Failed to update session:', error);
            }
          );
        }
    
      }, error => {
        console.error('Failed to remove user from session:', error);
      });


      Swal.fire({
        title: "You Left The Session Successfully !",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("assets/FrontOffice/img/sad.gif")
          left top
          no-repeat
        `
      });
      this.getListSessions(this.idJeux); 
      window.location.reload();

    }

    sendNotification(): void {
      const notificationData = {
        method: 'POST',
        to : "eIpYA7Puv0NqXUTIKlKwcf:APA91bFfj5CbK_eEbIH7Xplnz8qPtLjt8k_f3tlgt4m2c-0OMzrlnJAbuwIIZLJzBpbi4r8zTKYwFJZsC0NyU2B1EqxL-yeS-3yvVQv0Bm9Wx1R8WNQU_zu7Y3MKUR4G8z2iE9gXsBZQ",
        notification : {
            title : "Game Session",
            body : "A user joined your session",
            icon : "https://i.ibb.co/zWgfqtD/430112506-957916262375552-2785303533872510482-n.jpg"
        }
    }
      this.raba3Service.sendNotification(notificationData)
        .subscribe(
          response => {
            console.log('Notification sent successfully:', response);
            // Handle success response
          },
          error => {
            console.error('Failed to send notification:', error);
            // Handle error response
          }
        );
    }

  }