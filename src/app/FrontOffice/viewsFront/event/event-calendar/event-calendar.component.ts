import { Component, AfterViewInit } from '@angular/core';
import { EventService } from 'src/app/Services/event.service';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Router } from '@angular/router';
import { Event } from 'src/app/Models/statistiv/event';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.css']
})
export class EventCalendarComponent implements AfterViewInit {

  constructor(private eventService: EventService, private router: Router) {}

  addevent(): void {
    this.router.navigate(['/user/addevent']);
  }
  
  ngAfterViewInit(): void {
    this.initCalendar();
  }

  initCalendar(): void {
    const calendarEl = document.getElementById('calendar');
    
    if (calendarEl) {
      // Appeler la méthode du service pour récupérer tous les événements
      this.eventService.getApprovedListEvents().subscribe((events: Event[]) => {
        // Convertir les événements au format requis par FullCalendar
        const formattedEvents = events.map((event: Event) => ({
          title: event.nomEvent,
          start: event.dateDebutEvent,
          end: this.addDays(event.dateDebutEvent, this.getEventDuration(event)), // Calculer la date de fin
          color: '#e84545',// Définir la couleur de l'événement
          id: event.idEvent
        }));
        
        // Créer le calendrier avec les événements récupérés
        const calendar = new Calendar(calendarEl, {
          plugins: [dayGridPlugin],
          weekends: true,
          events: formattedEvents, // Utiliser les événements récupérés
          eventClick: this.handleEventClick.bind(this) // Ajouter le gestionnaire d'événements de clic
         
        });

        // Afficher le calendrier
        calendar.render();
      });
    } else {
      console.error('Element with ID "calendar" not found.');
    }
  }

  // Fonction pour ajouter un nombre de jours à une date
  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  // Fonction pour calculer la durée de l'événement en jours
  getEventDuration(event: Event): number {
    const start = new Date(event.dateDebutEvent);
    const end = new Date(event.dateFinEvent);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  // Gestionnaire d'événements de clic sur un événement
  handleEventClick(info:any): void {
    const idEvent = info.event.id; // Récupérer l'ID de l'événement
    this.router.navigate(['/user/eventdetail', idEvent]); // Rediriger vers la page des détails de l'événement
  }

}
