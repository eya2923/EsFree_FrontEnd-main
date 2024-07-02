import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/Services/map.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{
  constructor(private MapService:MapService){}
  lieu_depart!: string;

ngOnInit(): void {


}

getLocationCoordinates(): void {
  this.MapService.getCoordinates(this.lieu_depart)
    .then(coordinates => {
      console.log('Latitude:', coordinates.latitude);
      console.log('Longitude:',coordinates.longitude);
     // this.addMarker(coordinates.latitude, coordinates.longitude);

      // Now you can use these coordinates as needed
    })
    .catch(error => {
      console.error('Error fetching coordinates:', error);
    });
}

}
