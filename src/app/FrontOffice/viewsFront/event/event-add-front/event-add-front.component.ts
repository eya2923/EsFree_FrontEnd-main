import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Services/event.service'; // Assurez-vous d'importer le service EventService
import { Event } from 'src/app/Models/statistiv/event'; // Assurez-vous d'importer le modèle Event
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage'; 
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-add-front',
  templateUrl: './event-add-front.component.html',
  styleUrls: ['./event-add-front.component.css']
})
export class EventAddFrontComponent implements OnInit {
  event: Event = {} as Event; // Initialisation de l'objet eventData
  eventForm!: FormGroup;
  imageURL: string = '';

  constructor(private eventService: EventService, private fireStorage:AngularFireStorage, private router:Router, private formBuilder: FormBuilder) {} // Injection du service EventService
  ngOnInit(): void {
    console.log('test')
    this.eventForm = this.formBuilder.group({
      nomEvent: ['', Validators.required],
      organisateurEvent: ['', Validators.required],
      descriptionEvent: ['', Validators.required],
      lieuEvent: ['', Validators.required],
      dateDebutEvent: ['', [Validators.required, this.validateStartDate.bind(this)]],
      dateFinEvent: ['', [Validators.required, this.validateEndDate.bind(this)]],
      prixEvent: ['', [Validators.required, Validators.min(0)]],
      capaciteEvent: ['', [Validators.required, Validators.min(0)]],
      imageEvent: ['', Validators.required]
    });
  }

  validateStartDate(control: AbstractControl): ValidationErrors | null {
    const startDate = new Date(control.value);
    const today = new Date();
    return startDate >= today ? null : { startDateInvalid: true };
  }
  
  validateEndDate(control: AbstractControl): ValidationErrors | null {
    const endDate = new Date(control.value);
    const startDateControl = control.parent?.get('dateDebutEvent');
    
    if (!startDateControl) {
      return null; // Si le contrôle de la date de début n'existe pas, retourner null
    }
  
    const startDate = new Date(startDateControl.value);
  
    return endDate >= startDate ? null : { endDateInvalid: true };
  }
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadImage(file);
    }
  }

  async uploadImage(file: File) {
    const filePath = `yt/${new Date().getTime()}_${file.name}`;
    const uploadTask = this.fireStorage.upload(filePath, file);

    uploadTask.percentageChanges().subscribe(percent => {
      console.log(percent);
    });

    uploadTask.snapshotChanges().subscribe(() => {
      this.fireStorage.ref(filePath).getDownloadURL().subscribe(url => {
        console.log(url); // Affichez l'URL de téléchargement dans la console
        this.imageURL = url; // Stockez l'URL de téléchargement dans la variable imageURL
      });
    });
  }

  userId = localStorage.getItem('angular17TokenUserId');
  id!: number ;
  getId(){
     if(this.userId ){
     this.id=parseFloat(this.userId)
  }
}

  submitEvent() {
    this.getId()
    console.log(this.id);

    if (this.eventForm.valid) {
      const formData = this.eventForm.value;
      formData.imageEvent = this.imageURL; // Utilisez l'URL de l'image dans les données du formulaire
      
      this.eventService.addEvent(formData, this.id).subscribe(
        () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Event added Successfully !',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/user/myevents']);
        },
        (error: HttpErrorResponse) => {
          console.error('Error adding event:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
  
  
 
