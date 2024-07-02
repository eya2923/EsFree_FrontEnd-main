import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lostandfound } from 'src/app/Modules/LostandFound';
import { message } from 'src/app/Modules/messages';
import { BadWordService } from 'src/app/Services/bad-word-service.service';
import { LostandfoundService } from 'src/app/Services/lostandfound.service';
import { MessagesService } from 'src/app/Services/messages.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pub-discuss',
  templateUrl: './pub-discuss.component.html',
  styleUrls: ['./pub-discuss.component.css']
})
export class PubDiscussComponent implements OnInit {
  newmessage: message = new message(); 

  id_cov!: number;
  userId = localStorage.getItem('angular17TokenUserId');
  id!: number
  lostandfound: lostandfound = new lostandfound();
  //public message: Array<message> =[];
  message : {[id_cov:number]:message[]}={}
  constructor(private covService:LostandfoundService, private messageservice:MessagesService, private route:ActivatedRoute, private badWordService: BadWordService, ){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_cov = this.route.snapshot.params['id'] // Récupère l'ID de l'événement depuis l'URL
      this.getEventDetails(this.id_cov);
      this.getmessage(this.id_cov)
    });
  
    if(this.userId ){
      this.id=parseFloat(this.userId)
      console.log("userId",this.id)
   }
  }


  getEventDetails(id_cov: number): void {
    this.covService.getItembyId(id_cov).subscribe((data: lostandfound) => {
      this.lostandfound = data;
      console.log(this.lostandfound.description)
      // Appel pour récupérer le lien du QR code
     
    });
  }
  getmessage(id_cov: any): void {
    this.messageservice.getListmessage(id_cov).subscribe((messagelis: message[]) => {
      this.message [id_cov] = messagelis;
      console.  log(this.message)
      console.log()

      // Appel pour récupérer le lien du QR code
     
    });
  }
  snedmsg(id_cov: number) {
    console.log(this.newmessage);

    this.badWordService.checkForBadWord(this.newmessage.content).subscribe(
      (response) => {
        if (!response['is-bad']) {
          // Message is clean, proceed to send it
          this.messageservice.addMessage(this.newmessage, id_cov, this.id ).subscribe(
            (data) => {
              console.log("Message sent successfully", data);
              this.getmessage(id_cov);
            },
            (error) => {
              console.error("Failed to send message", error);
            }
          );
        } else {
          // Message contains bad words, handle it appropriately
          console.error("Message contains bad words");
          Swal.fire({
            icon: "error",
            title: "Be Polite",
            text: "Message contains bad words",
            footer: "Number of bad words :"+(response['bad-words-total'])
          });
          // For example, display an error message to the user
        }
      },
      (error) => {
        console.error("Error checking for bad words", error);
      }
    );
  
  }



}
  


