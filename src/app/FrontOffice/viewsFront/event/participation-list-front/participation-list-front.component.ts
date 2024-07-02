import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Participation } from 'src/app/Models/participation/participation.model';
import { ParticipationService } from 'src/app/Services/participation.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-participation-list-front',
  templateUrl: './participation-list-front.component.html',
  styleUrls: ['./participation-list-front.component.css']
})
export class ParticipationListFrontComponent implements OnInit{
  participations: Participation[] = [];
  //id!: number;
  userParticipations: Participation[] = [];
  selectedParticipationId!: number;
  selectedParticipation: Participation | undefined;
  qrCodeUrls: { [id: number]: Observable<string> } = {};
  constructor(private participationService: ParticipationService) { }

  ngOnInit(): void {
   // this.getParticipationsByUser(this.id); 
   this.getId()
   console.log(this.id)
    this.getParticipationsByUser(this.id); // Remplacez 'id' par l'id du user
  }

  userId = localStorage.getItem('angular17TokenUserId');
  id!: number ;
  getId(){
     if(this.userId ){
     this.id=parseFloat(this.userId)
  }
}

  getParticipationsByUser(id: number): void {
    this.participationService.getParticipationsByUser(id)
      .subscribe(
        (participations: Participation[]) => {
          this.userParticipations = participations; // Mettez à jour userParticipations
          this.participations = participations; // Optionnel : mettre à jour participations également si nécessaire
          participations.forEach(participation => {
            this.qrCodeUrls[participation.idParticipation] = this.getQRCodeUrl(participation.idParticipation);
          });
        },
        (error) => {
          console.error('Error fetching user participations:', error);
        }
      );
  }
  openEditParticipationModal(participationId: number): void {
    this.selectedParticipationId = participationId;
    this.selectedParticipation = this.userParticipations.find(participation => participation.idParticipation === participationId);
    $('#editParticipationModal').modal('show');
  }
  editParticipation(): void {
    const updatedParticipation = this.userParticipations.find(participation => participation.idParticipation === this.selectedParticipationId);
    if (updatedParticipation) { // Vérifiez si updatedEvent est défini
      this.participationService.updateParticipation(this.selectedParticipationId, updatedParticipation)
        .subscribe(
          (updatedParticipation: Participation) => {
            $('#editParticipationModal').modal('hide');
          },
          (error: any) => console.error(error)
        );
    } else {
      console.error('Participation not found for the selected ID');
    }
  }

  deleteParticipation(idParticipation: number): void {
    // Affichage de la boîte de dialogue de confirmation
    Swal.fire({
      title: 'Are you sure ?',
      text: 'You want to cancel your Participation ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it.',
      cancelButtonText: 'No, cancel.'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Yes", supprimez la participation
        this.participationService.deleteParticipation(idParticipation)
          .subscribe(
            () => {
              // Mettez à jour la liste des événements après la suppression
              this.userParticipations = this.userParticipations.filter(participation => participation.idParticipation !== idParticipation);
              // Affichez une alerte de suppression réussie
              Swal.fire('Deleted!', 'Your participation has been canceled.', 'success');
            },
            (error: any) => {
              console.error('Error cancelling participation:', error);
              // Affichez une alerte d'erreur en cas d'échec de suppression
              Swal.fire('Error!', 'Failed to cancel the participation.', 'error');
            }
          );
      }
    });
  }

  getQRCodeUrl(idParticipation: number): Observable<string> {
    return this.participationService.getQRCodeUrlPart(idParticipation)
  }

}
