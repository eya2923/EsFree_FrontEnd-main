import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Services/event.service';
import {Event} from 'src/app/Models/statistiv/event';
import { Router } from '@angular/router';
@Component({
  selector: 'app-event-list-front',
  templateUrl: './event-list-front.component.html',
  styleUrls: ['./event-list-front.component.css']
})
export class EventListFrontComponent implements OnInit  {
  events: Event[] = [];
  searchTerm: string = '';
  filteredEvents: Event[] = [];
  searchDate: string = '';

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.loadApprovedEvents();
  }

  loadApprovedEvents(): void {
    this.eventService.getApprovedListEvents().subscribe(events => {
      this.events = events;
      this.filteredEvents = events;
    });
  }

  searchEvents(): void {
    if (this.searchTerm.trim()) {
      this.eventService.searchEventsByOrganisateur(this.searchTerm).subscribe(events => {
        // Filtrer les événements approuvés uniquement
        this.events = events.filter(event => event.statut === 'Approuvé');
        this.filteredEvents = this.events;
      });
    } else {
      this.loadApprovedEvents();
    }
  }

  filterEventsByDate(): void {
    if (this.searchDate) {
      const searchDateObj = new Date(this.searchDate);
      const formattedDate = searchDateObj.toISOString().split('T')[0];
      this.eventService.findByDateDebutEvent(formattedDate).subscribe(events => {
        // Filtrer les événements approuvés uniquement
        this.events = events.filter(event => event.statut === 'Approuvé');
        this.filteredEvents = this.events;
      });
    } else {
      this.loadApprovedEvents();
    }
  }

  resetFilters(): void {
    this.loadApprovedEvents();
  }

  navigateToEventDetail(idEvent: number) {
    this.router.navigate(['/user/eventdetail', idEvent]);
  }

  addevent(): void {
    this.router.navigate(['/user/addevent']);
  }

}
