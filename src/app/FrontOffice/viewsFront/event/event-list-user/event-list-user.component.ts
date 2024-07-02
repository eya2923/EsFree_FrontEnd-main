import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Services/event.service';
import {Event} from 'src/app/Models/statistiv/event';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AngularFireStorage } from '@angular/fire/compat/storage'; 
declare var $: any;

@Component({
  selector: 'app-event-list-user',
  templateUrl: './event-list-user.component.html',
  styleUrls: ['./event-list-user.component.css']
})
export class EventListUserComponent implements OnInit{
 // id!: number; // Définir le nom d'utilisateur actuel
  userEvents: Event[] = [];
  event: Event = {} as Event;
  selectedEventId!: number;
  selectedEvent: Event | undefined;

  constructor(private eventService: EventService, private router: Router, private fireStorage:AngularFireStorage) { }

  navigateToEventDetail(idEvent: number) {
    this.router.navigate(['/user/eventdetail', idEvent]); // Redirige vers la page event-detail avec l'ID de l'événement en tant que paramètre
  }
  addevent(): void {
    this.router.navigate(['/user/addevent']);
  }

  ngOnInit(): void {
    this.getId();
    console.log(this.id);
    this.getEventsByUser(this.id);
    
  }

  userId = localStorage.getItem('angular17TokenUserId');
  id!: number ;
  getId(){
     if(this.userId ){
     this.id=parseFloat(this.userId)
  }
}
 
  
  getEventsByUser(id: number): void {
    this.eventService.getEventsByUser(id).subscribe(
      (events: Event[]) => {
        this.userEvents = events;
      },
      (error) => {
        console.error('Error fetching user events:', error);
      }
    );
  }
  openEditEventModal(eventId: number): void {
    this.selectedEventId = eventId;
    this.selectedEvent = this.userEvents.find(event => event.idEvent === eventId);
    $('#editEventModal').modal('show');
  }
  async onFileSelected(event:any){
    const file = event.target.files[0]
    if(file){
      const path = `yt/${file.name}`
      const uploadTask =await this.fireStorage.upload(path,file)
      const url = await uploadTask.ref.getDownloadURL()
      console.log(url)
      if (this.selectedEvent) {
        this.selectedEvent.imageEvent = url; // Affecter l'URL de l'image si selectedEvent est défini
      }
    }
  }

  async editEvent() {
    const updatedEvent = this.userEvents.find(event => event.idEvent === this.selectedEventId);
    if (updatedEvent) { // Vérifiez si updatedEvent est défini
      if (this.event.imageEvent) {
        updatedEvent.imageEvent = this.event.imageEvent;
      }
     await this.eventService.updateEvent(this.selectedEventId, updatedEvent)
        .subscribe(
          (updatedEvent: Event) => {
            $('#editEventModal').modal('hide');
          },
          (error: any) => console.error(error)
        );
    } else {
      console.error('Event not found for the selected ID');
    }
  }
  deleteEvent(idEvent: number): void {
    // Affichage de la boîte de dialogue de confirmation
    Swal.fire({
      title: 'Are you sure ?',
      text: 'You want to delete this event ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it.',
      cancelButtonText: 'No, cancel.'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Yes", supprimez l'événement
        this.eventService.deleteEvent(idEvent)
          .subscribe(
            () => {
              // Mettez à jour la liste des événements après la suppression
              this.userEvents = this.userEvents.filter(event => event.idEvent !== idEvent);
              // Affichez une alerte de suppression réussie
              Swal.fire('Deleted!', 'Your event has been deleted.', 'success');
            },
            (error: any) => {
              console.error('Error deleting event:', error);
              // Affichez une alerte d'erreur en cas d'échec de suppression
              Swal.fire('Error!', 'Failed to delete the event.', 'error');
            }
          );
      }
    });
  }
}
