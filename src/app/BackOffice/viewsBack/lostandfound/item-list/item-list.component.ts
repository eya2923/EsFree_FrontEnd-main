import { Component, OnInit } from '@angular/core';
import { lostandfound } from 'src/app/Modules/LostandFound';
import { message } from 'src/app/Modules/messages';
import { LostandfoundService } from 'src/app/Services/lostandfound.service';
import { MessagesService } from 'src/app/Services/messages.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  showAddDialog: boolean = false;
  selectedItem!: number;
  nameItem!: String;
  listmesageItem: { [id_cov: string]: message[] } = {};
  lostandfound  : lostandfound = new lostandfound();
  constructor(private lostandfoundservice:LostandfoundService , private messageservice:MessagesService){ }
  public items: Array<lostandfound> =[];


  deleteItem(iditem : number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      customClass: {
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button'
      }
    
    }).then((result) => {
      if (result.isConfirmed) {
        this.lostandfoundservice.deleteItem(iditem).subscribe(
          data => {
            Swal.fire(
              'Deleted!',
              'This Item has been deleted.',
              'success'
            );
            this.loadCovoiturages();
          },
          error => {
            console.error('Error deleting Item:', error);
            Swal.fire(
              'Error!',
              'Failed to delete Item.',
              'error'
            );
            // Handle the error appropriately, e.g., display an error message to the user
          }
        );
      }
    });

    
  
}
getListAvis(id_cov:any)
{ 
  this.messageservice.getListmessage(id_cov)
  .subscribe(
    (avisList: message[]) => {
      this.listmesageItem[id_cov] = avisList;
    },
    (error) => {
      console.error(error);
    }
  );
}


loadCovoiturages() {
  this.lostandfoundservice.getListItem().subscribe(
    data => {
      this.items = data;
    },
    error => {
      console.error('Error loading items:', error);
      // Handle the error appropriately, e.g., display an error message to the user
    }
  );
}
 
  ngOnInit(): void {
    this.getListItem();
    
  }
  getListItem(){
    this.lostandfoundservice.getListItem().subscribe(
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
          this.getListAvis(type.idPub);
          
        })
      },
      (error) => 
        {
          console.error(error);
        }
      );
  }
  openDialog(lostItem:lostandfound): void {
    this.showAddDialog = true;
    this.selectedItem = lostItem.idPub;
    this.nameItem=lostItem.name
    
  }

}
