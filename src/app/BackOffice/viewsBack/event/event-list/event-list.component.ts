import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Services/event.service';
import {Event} from 'src/app/Models/statistiv/event';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit{
  events: Event[] = [];
  searchTerm: string = '';
  ascendingOrder: boolean = true;
  filteredEvents: Event[] = [];
  searchDate: string = '';

  currentPage: number = 1;
eventsPerPage: number = 4;
totalEvents: number = 0;
totalPages: number = 0;
pages: number[] = [];
startIndex: number = 0;
endIndex: number = 0;

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
      this.totalEvents = events.length;
      this.totalPages = Math.ceil(this.totalEvents / this.eventsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.updateEventsPerPage();
    });
  }

  updateEventsPerPage(): void {
    this.startIndex = (this.currentPage - 1) * this.eventsPerPage;
    this.endIndex = Math.min(this.startIndex + this.eventsPerPage, this.totalEvents);
    this.filteredEvents = this.events.slice(this.startIndex, this.endIndex);
  }
  

  changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updateEventsPerPage();
  }

  searchEvents(): void {
    if (this.searchTerm.trim()) {
      this.eventService.searchEventsByOrganisateur(this.searchTerm).subscribe(events => {
        this.events = events;
        this.updateEventsPerPage();
      });
    } else {
      // Si le champ de recherche est vide, rechargez la liste complète des événements approuvés
      this.eventService.getAllEvents().subscribe(events => {
        this.events = events;
      });
    }
  }
  resetFilters(): void {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
      this.filteredEvents = events;
      this.updateEventsPerPage();
    });
}
  filterEventsByDate(): void {
    if (this.searchDate) {
      const searchDateObj = new Date(this.searchDate);
      const formattedDate = searchDateObj.toISOString().split('T')[0];
      this.eventService.findByDateDebutEvent(formattedDate).subscribe(events => {
        // Mettez à jour this.events avec les événements filtrés par date
        this.events = events;
        this.filteredEvents = events;
      });
    } else {
      // Si aucune date n'est saisie, réinitialisez les événements filtrés avec tous les événements
      this.filteredEvents = this.events;
    }
  }
  sortEventsByPrice(): void {
    this.ascendingOrder = !this.ascendingOrder;
    if (this.ascendingOrder) {
      this.filteredEvents.sort((a, b) => a.prixEvent - b.prixEvent);
    } else {
      // Inverser l'ordre de tri en utilisant la méthode reverse()
      this.filteredEvents.reverse();
    }
  }
  
  approveEvent(event: Event): void {
    this.eventService.approveEvent(event.idEvent).subscribe(
      () => {
        // Mettre à jour le statut de l'événement dans la liste des événements
        event.statut = 'Approuvé';
  
        // Afficher la notification de succès
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Event Approved Successfully !',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error: HttpErrorResponse) => {
        console.error('Error', error);
      }
    );
  }
  rejectEvent(event: Event): void {
    this.eventService.rejectEvent(event.idEvent).subscribe(
      () => {
        // Mettre à jour le statut de l'événement dans la liste des événements
        event.statut = 'Rejeté';
  
        // Afficher la notification de succès
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Event Rejected Successfully !',
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error: HttpErrorResponse) => {
        console.error('Error', error);
      }
    );
  }
}
