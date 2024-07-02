import { Component } from '@angular/core';
import { Participation } from 'src/app/Models/participation/participation.model';
import { ParticipationService } from 'src/app/Services/participation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participation-list',
  templateUrl: './participation-list.component.html',
  styleUrls: ['./participation-list.component.css']
})
export class ParticipationListComponent {
  participations: Participation[] = [];
  currentPage: number = 1;
  participationsPerPage: number = 4;
  totalParticipations: number = 0;
  totalPages: number = 0;
  pages: number[] = [];
  startIndex: number = 0;
  endIndex: number = 0;
  constructor(private participationService: ParticipationService, private router: Router) {}

  ngOnInit(): void {
    this.participationService.retrieveAllParticipations().subscribe(participations => {
      this.participations = participations;
      this.totalParticipations = participations.length;
      this.totalPages = Math.ceil(this.totalParticipations / this.participationsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.updateParticipationsPerPage();
    });
  }
  
  updateParticipationsPerPage(): void {
    this.startIndex = (this.currentPage - 1) * this.participationsPerPage;
    this.endIndex = Math.min(this.startIndex + this.participationsPerPage, this.totalParticipations);
  }
  

  changePage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updateParticipationsPerPage();
  }
}
