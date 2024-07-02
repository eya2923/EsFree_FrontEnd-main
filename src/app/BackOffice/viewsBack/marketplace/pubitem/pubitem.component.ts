import { Component, OnInit } from '@angular/core';
import { Etat, PubItem } from 'src/app/Models/pubitem';
import { PubitemService } from 'src/app/Services/pubitem.service';




@Component({
  selector: 'app-pubitem',
  templateUrl: './pubitem.component.html',
  styleUrls: ['./pubitem.component.css']
})
export class PubitemComponent implements OnInit {
  
  constructor(private pubItemService: PubitemService) {}
  public pubItems: Array<PubItem> =[];
  searchText: string = ''
  etatOptions = Object.values(Etat);
  selectedEtat!: Etat;
  pubItem: PubItem = new PubItem();
  productAddedSuccessfully: boolean = false;

  public paginatedPubItems: PubItem[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 5; // Adjust this value as needed
  public totalPages: number = 0;
  public pages: number[] = [];


  

  ngOnInit(): void {
    this.loadPubItems();
  }

  loadPubItems(): void {
    this.pubItemService.getPubitems().subscribe(
      (data) =>  {
        this.pubItems = data;
        this.totalPages = Math.ceil(this.pubItems.length / this.itemsPerPage);
        this.updatePagination();
      },
      (error) => {
        console.error('Error fetching pub items:', error);
      }
    );
  }

  deleteItem(itemId: number) {
    this.pubItemService.deletePubitem(itemId).subscribe(
      () => {
        console.log('Item deleted successfully');
        // Reload items after successful deletion
        this.loadPubItems();
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
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
    this.pubItemService.updatePubItem(this.pubItem).subscribe(
      (response) => {
        console.log('Product updated successfully:', response);
        this.loadPubItems();
        
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }


  searchProducts() {
    if (this.searchText.trim() !== '') {
      this.pubItemService.searchPubItems(this.searchText).subscribe(products => {
        this.pubItems = products;
        this.totalPages = Math.ceil(this.pubItems.length / this.itemsPerPage); // Update total pages
        this.updatePagination(); // Update pagination logic
      });
    } else {
      this.loadPubItems(); // Reload all products which will also update pagination
    }
  }

addPubItemm(): void {
  this.pubItem.etat = this.selectedEtat;
  this.pubItemService.addPubItemm(this.pubItem).subscribe(
    (data: PubItem) => {
      console.log('PubItem added successfully:', data);

      this.pubItem = new PubItem();
      this.loadPubItems();
      
    },
    (error) => {
      console.error('Error adding PubItem:', error);
    }
  );
}
updatePagination(): void {
  this.pages = [];
  for (let i = 1; i <= this.totalPages; i++) {
    this.pages.push(i);
  }
  this.paginatedPubItems = this.pubItems.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
}

changePage(page: number): void {
  this.currentPage = page;
  this.paginatedPubItems = this.pubItems.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
}

}

