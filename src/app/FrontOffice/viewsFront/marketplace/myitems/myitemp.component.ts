import { Component, OnInit } from '@angular/core';
import { Etat, PubItem } from 'src/app/Models/pubitem';
import { PubitemService } from 'src/app/Services/pubitem.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-myitems',
  templateUrl: './myitemsp.component.html',
  styleUrls: ['./myitemsp.component.css']
})
export class MyitemspComponent implements OnInit  {

  pubItems!: PubItem[];
  pubItem: PubItem = new PubItem();
  etatOptions = Object.values(Etat);
  selectedEtat!: Etat;
  imageFile: File | undefined;
  

  userId= localStorage.getItem('angular17TokenUserId');
  id!: number ;
  getId(){
  if(this.userId ){
    this.id=parseInt(this.userId)
  }
}

 

  constructor(private pubitemService: PubitemService,  public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPubItems();
    this. getId();
    console.log(this.id);
    
  }

  getPubItems(): void {
    this.pubitemService.getPubItemsByCurrentUser()
      .subscribe(pubItems => this.pubItems = pubItems);
  }

  deleteItem(itemId: number) {
    this.pubitemService.deletePubitem(itemId).subscribe(
      () => {
        console.log('Item deleted successfully');
        // Reload items after successful deletion
        this.getPubItems();
        location.reload();
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
   this.SsnackBar();
  }


  openUpdateModal(pubItem: PubItem) {
    console.log('Selected PubItem:', pubItem);
    this.pubItem = new PubItem(); // Create a new instance
    Object.assign(this.pubItem, pubItem); // Copy properties from selected pubItem
    this.selectedEtat = pubItem.etat;

  }

  onEtatChange(event: any) {
    const newValue = event?.target?.value;
    if (newValue !== undefined) {
      this.pubItem.etat = newValue;
    }
  }
  updateProduct() {
    this.pubitemService.updatePubItem(this.pubItem).subscribe(
      (response) => {
        console.log('Product updated successfully:', response);
        this.getPubItems();
        
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
    this.SnackBar();
  }


  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.imageFile = event.target.files[0];
    }
  }


  onSubmit(): void {
    const formData = new FormData();
    formData.append('pubitem', JSON.stringify(this.pubItem)); // Corrected key name
    if (this.imageFile) {
      formData.append('image', this.imageFile, this.imageFile.name);
    }
    formData.append('id', this.id.toString() ); // Assuming staticUserId is always 1
  
    this.pubitemService.addPubItem(formData).subscribe(
      response => {
        console.log('Product added successfully:', response);
        this.pubItems.push(response); // Assuming response is the added PubItem
        this.getPubItems();

      },
      error => {
        console.error('Error adding product:', error);
      }
    );
    this.openSnackBar();
  }
  
  
  
  
  openSnackBar() {
    this.snackBar.open('Item added by you', 'Close', {
      duration: 3000 // Duration in milliseconds
    });
  }

  SnackBar() {
    this.snackBar.open('Item updated successfully', 'Close', {
      duration: 3000 // Duration in milliseconds
    });
  }

  SsnackBar() {
    this.snackBar.open('Item deleted successfully', 'Close', {
      duration: 3000 // Duration in milliseconds
    });
  }
  
  
}
