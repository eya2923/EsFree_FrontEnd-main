import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lostandfound } from 'src/app/Modules/LostandFound';
import { LostandfoundService } from 'src/app/Services/lostandfound.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myitems',
  templateUrl: './myitems.component.html',
  styleUrls: ['./myitems.component.css']
})
export class MyitemsComponent implements OnInit {
  searchText:any;
onSubmit() {
  this.lostandfoundservice.updateItem(this.lostandfound).subscribe(
    (response) => {
      console.log('Product updated successfully:', response);
      this.showAddDialog = false;
      window.location.reload();
      
    },
    (error) => {
      console.error('Error updating product:', error);
    }
  );
}
  showAddDialog: boolean = false;
  lostandfound: lostandfound = new lostandfound();
  terminate(arg0: number) {
    this.lostandfoundservice.changestatus(arg0).subscribe(
      data => {
        console.log("terminated");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
          didClose: () => {
            window.location.reload();
          }
        });
        Toast.fire({
          icon: "success",
          title: "Thank you for participating in finding our items !"
        });
      }
    );
  }
constructor(private lostandfoundservice:LostandfoundService, private route:ActivatedRoute){ } 
public items: Array<lostandfound> =[];
userId!:number;  
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = this.route.snapshot.params['id'] // Récupère l'ID de l'événement depuis l'URL
      this.getListItem(this.userId)
    });
    
  }
  getListItem(id : number){
    this.lostandfoundservice.getItemsbyIdUser(id).subscribe(
      (d) => {
       d.forEach((type:lostandfound) =>
        {
          console.log(type.idPub);
          console.log(type.name);
          console.log(type.location);
          console.log("image:",type.image);
          console.log(type.datePub);
          console.log(type.description);
          this.items = d ;
        })
      },
      (error) => 
        {
          console.error(error);
        }
      );
  }
  openAddDialog(LostandFound : lostandfound) {
    this.showAddDialog = true;
    console.log('Selected PubItem:', LostandFound);
    this.lostandfound = new lostandfound(); // Create a new instance
    Object.assign(this.lostandfound, LostandFound);
  }
  

}
