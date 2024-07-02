import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/Services/event.service';
import { Event } from 'src/app/Models/statistiv/event';
import { ParticipationService } from 'src/app/Services/participation.service';
import Swal from 'sweetalert2';
import { Participation } from 'src/app/Models/participation/participation.model';
declare var $: any;
@Component({
  selector: 'app-event-detail-front',
  templateUrl: './event-detail-front.component.html',
  styleUrls: ['./event-detail-front.component.css']
})
export class EventDetailFrontComponent implements OnInit {
  idEvent!: number;
  event: Event = {} as Event;
  qrCodeUrl: string | undefined;

  constructor(private route: ActivatedRoute, private eventService: EventService, private participationService: ParticipationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idEvent = +params['idEvent']; // Récupère l'ID de l'événement depuis l'URL
      this.getEventDetails(this.idEvent);
    });
  }

  getEventDetails(idEvent: number): void {
    this.eventService.getEventById(idEvent).subscribe((data: Event) => {
      this.event = data;
      // Appel pour récupérer le lien du QR code
      this.eventService.getQRCodeUrl(idEvent).subscribe((qrCodeUrl: string) => {
        this.qrCodeUrl = qrCodeUrl;
      });
    });
  }
  openParticipationModal(): void {
    $('#participationModal').modal('show');
  }

  userId = localStorage.getItem('angular17TokenUserId');
  id!: number ;
  getId(){
     if(this.userId ){
     this.id=parseFloat(this.userId)
  }
}

  participation: Participation = {} as Participation;
 
  submitParticipationForm(): void {
    this.getId()
    console.log(this.id)
   // const id = 1; // Assurez-vous d'obtenir le nom d'utilisateur correctement
    if (this.idEvent && this.id) {
      this.participationService.addParticipation(this.participation, this.idEvent, this.id)
        .subscribe(response => {
          // Gérer la réponse de la requête
          console.log('Participation added successfully:', response);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your participation has been added successfully.'
          });
          // Fermer la modal
          $('#participationModal').modal('hide');
        }, error => {
          // Gérer les erreurs de la requête
          console.error('Error adding participation:', error);
          // Afficher une alerte SweetAlert pour l'erreur
          if (error.error && error.error.message) {
            // Si le message d'erreur est disponible, l'afficher
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.error.message
            });
          } else {
            // Si le message d'erreur n'est pas disponible, afficher un message générique
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Une erreur inattendue s\'est produite. Veuillez réessayer.'
            });
          }
        });
    }
  }
}
