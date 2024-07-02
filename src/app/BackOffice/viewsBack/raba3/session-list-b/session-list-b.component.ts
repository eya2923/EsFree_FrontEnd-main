import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Raba3 } from 'src/app/Models/raba3';
import { Raba3Service } from 'src/app/Services/raba3.service';

@Component({
  selector: 'app-session-list-b',
  templateUrl: './session-list-b.component.html',
  styleUrls: ['./session-list-b.component.css']
})
export class SessionListBComponent implements OnInit{

  raba3: Raba3 = new Raba3();
  searchText:any;
  searchDate: string = '';
  constructor(private act:ActivatedRoute,private raba3Service:Raba3Service){ }
  public sessions: Array<Raba3> =[];


  ngOnInit(): void {
    this.getListSessions2();
    
  }

  getListSessions2()
  {
   this.raba3Service.getListSessions2().subscribe(
     (d) => {
      d.forEach((type:Raba3) =>
       {
         console.log(type.idRaba3);
         console.log(type.description);
         console.log(type.nombrePlaces);
         console.log(type.dateDebut);
         console.log(type.dateFin);
        
         this.sessions = d ;
       })
     },
     (error) => 
       {
         console.error(error);
       }
     );
    }
}



