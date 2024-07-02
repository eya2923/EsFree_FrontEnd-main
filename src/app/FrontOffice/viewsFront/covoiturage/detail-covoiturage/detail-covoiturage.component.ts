import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Covoiturage } from 'src/app/Models/covoiturage';
import { CovoiturageService } from 'src/app/Services/covoiturage.service';
import { MapService } from 'src/app/Services/map.service';
import * as L from 'leaflet';
import { Avis } from 'src/app/Models/avis';
import { AvisService } from 'src/app/Services/avis.service';
import 'leaflet-routing-machine';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-covoiturage',
  templateUrl: './detail-covoiturage.component.html',
  styleUrls: ['./detail-covoiturage.component.css']
})
export class DetailCovoiturageComponent implements OnInit {
  id_cov!: number;
  map!: L.Map;
  tarif:string=''
  avis : Avis = new Avis();
  badWords: string[] = ['shit', 'fuck']; // Define your list of bad words here
  errorMessage: string = 'Your input contains bad words. Please remove them.';
  showModal: boolean = false;
  id!:number;
 

  listavisCov: { [id_cov: string]: Avis[] } = {};
 

  
  covoiturage: Covoiturage = new Covoiturage();
  constructor(private covService:CovoiturageService,private route:ActivatedRoute,private MapService:MapService,private avisService:AvisService){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_cov = +params['id_cov']; // Récupère l'ID de l'événement depuis l'URL
      this.getCovDetails(this.id_cov);
      this.getListAvis(this.id_cov);
      this.tarif = this.initMap(this.covoiturage.lieu_depart, this.covoiturage.destination, this.id_cov);
    });
   
  }
  ratingcount=0;
  totalrating=0

  Finalrating:any;

  ratingcontrol=new FormControl(0);
  GetRating(){
    this.ratingcount++;
    this.totalrating +=this.ratingcontrol?.value || 0;
    //console.log(this.ratingcontrol.value);
    this.Finalrating= (this.totalrating/this.ratingcount).toFixed(2)
  }
  
  addAvis(id_cov: number): void {
    this.getId()
    if (this.containsBadWords(this.avis.objet) || this.containsBadWords(this.avis.description)) {
      this.errorMessage = 'Your input contains bad words. Please remove them.';
      this.showModal = true;
    } else {
      this.showModal = false;
      this.avisService.addAvis(this.avis, id_cov,this.id).subscribe(
        data => {
          console.log('Avis added successfully!', data);
          window.location.reload()
          
        },
        error => {
          console.error('Error adding avis:', error);
        }
      );
    }
  }
  closeModal() {
    this.showModal = false; // Close the modal
  }
  containsBadWords(input: string): boolean {
    for (const word of this.badWords) {
      if (input.toLowerCase().includes(word.toLowerCase())) {
       
        return true;
      }
    }
    return false;
  }

  getCovDetails(id_cov: number): void {
    this.covService.retrieveCov(id_cov).subscribe((data: Covoiturage) => {
      this.covoiturage = data;
      console.log(this.covoiturage.description)
    //this.getDepartureCoordinates(this.covoiturage.lieu_depart);
    // this.getDestinationCoordinates(this.covoiturage.destination);
     this.initMap(this.covoiturage.lieu_depart,this.covoiturage.destination,id_cov) 
     
    });
  }
  getListAvis(id_cov:any)
    { 
      this.avisService.getAvisByCov(id_cov)
      .subscribe(
        (avisList: Avis[]) => {
          this.listavisCov[id_cov] = avisList;
        },
        (error) => {
          console.error(error);
        }
      );
  }
  userId = localStorage.getItem('angular17TokenUserId');

  getId(){
     if(this.userId ){
     this.id=parseFloat(this.userId)
  }
}
  //sms
  sendMessage(to: string, message: string,id_cov:any): void {
    this.getId()
    console.log(this.id)
    this.covService.sendSms(to, message).subscribe(
      response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sms sent Successfully !',
          showConfirmButton: false,
          timer: 1500
        });

        //this.covService.Reserve(id_cov,this.id)
        console.log('Message sent successfully:', response);
      },
      error => {
        console.error('Error sending message:', error);
      }
    );
  }
  reserveCov(id_cov: number) {
    this.getId()
    this.covService.ReserveCov(id_cov, this.id).subscribe(
      () => {
        this.sendMessage('','',id_cov)
        console.log('Reservation successful');
        // Handle success
      },
      (error) => {
        console.error('Reservation failed', error);
        // Handle error
      }
    );
  }

  updateNombrePlacecov(covId: number, newNombrePlacecov: number): void {
    this.covService.updateNombrePlacecov(covId, newNombrePlacecov).subscribe(
      response => {
        console.log('Nombre place updated successfully:', response);
      },
      error => {
        console.error('Error updating nombre place:', error);
      }
    );
  }

//Mappppp
addMarker(latitude: number, longitude: number): void {
  const marker = L.marker([latitude, longitude]).addTo(this.map);
  marker.bindPopup("Here is your departure location");
}

initMap(lieu_depart: string, destination: string,id_cov:number): any {
  const departureCoords: [number, number] = [0, 0]; // Default value or initialize as needed
  const destinationCoords: [number, number] = [0, 0];
  this.map = L.map('map').setView([34.0, 9.0], 7);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(this.map);

  Promise.all([
    this.MapService.getCoordinates(lieu_depart),
    this.MapService.getCoordinates(destination)
  ]).then(([departureCoordinates, destinationCoordinates]) => {
    departureCoords[0] = departureCoordinates.latitude;
    departureCoords[1] = departureCoordinates.longitude;
    destinationCoords[0] = destinationCoordinates.latitude;
    destinationCoords[1] = destinationCoordinates.longitude;
const tarif = this.calculateDistance(departureCoords[0],departureCoords[1],destinationCoords[0],destinationCoords[1]);

    // Add markers
    this.addMarker(departureCoords[0], departureCoords[1]);
    this.addMarker(destinationCoords[0], destinationCoords[1]);

    // Set up routing control with obtained coordinates
    L.Routing.control({
      waypoints: [
        L.latLng(departureCoords[0], departureCoords[1]),
        L.latLng(destinationCoords[0], destinationCoords[1])
      ]
    }).addTo(this.map);
    return `Your tarif is ${tarif.toFixed(2)} Dt`;
  });
}

 deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = this.deg2rad(lat2 - lat1);
  const dLon = this.deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  const tarif = d * 0.08
  console.log(tarif)
  return tarif
}
}
