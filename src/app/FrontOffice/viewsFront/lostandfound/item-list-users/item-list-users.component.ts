import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { lostandfound } from 'src/app/Modules/LostandFound';
import { LostandfoundService } from 'src/app/Services/lostandfound.service';

@Component({
  
  selector: 'app-item-list-users',
  templateUrl: './item-list-users.component.html',
  styleUrls: ['./item-list-users.component.css']
})
export class ItemListUsersComponent implements OnInit  {
getFound() {
throw new Error('Method not implemented.');
}
getLost() {
throw new Error('Method not implemented.');
}
  searchText:any
  userId = localStorage.getItem('angular17TokenUserId');
  id!: number
  @ViewChild('taskForm') taskForm!: NgForm;
  file! : File;
  onFileSelected($event: Event) {
  const target = event!.target as HTMLInputElement;
      const files = target.files as FileList;
      this.file = files[0];
      console.log("file name " + this.file.name);
  
}
  showAddDialog: boolean = false;
  newItem: lostandfound = new lostandfound(); 

  openAddDialog() {
    this.showAddDialog = true;
  }

  closeAddDialog() {
    this.showAddDialog = false;
  }

  lostandfound  : lostandfound = new lostandfound();
  public items: Array<lostandfound> =[];
  constructor(private lostandfoundservice:LostandfoundService){ }
  ngOnInit(): void {
    this.getListItem();
    if(this.userId ){
      this.id=parseFloat(this.userId)
      console.log("userId",this.id)
   }
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
          console.log(type.iduser.email)
          this.items = d ;
        })
      },
      (error) => 
        {
          console.error(error);
        }
      );
  }
  onSubmit(): void {
    if (this.taskForm && this.taskForm.valid) {
    console.log('Nouvelle maison a été ajouté', this.newItem );

    this.lostandfoundservice.addItem(this.newItem,this.file, this.id ).subscribe(() => {
      console.log('Nouvelle maison a été ajouté', this.newItem);
      this.showAddDialog = false;
      window.location.reload();
      //this.dialogRef.close(true); 
    });
  }}

}
