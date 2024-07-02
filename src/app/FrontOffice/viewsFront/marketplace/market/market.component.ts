import { Component, OnInit } from '@angular/core';
import bootstrap from '@fullcalendar/bootstrap';
import { Cart } from 'src/app/Models/cart';
import { PubItem } from 'src/app/Models/pubitem';
import { CartService } from 'src/app/Services/cart.service';
import { PubitemService } from 'src/app/Services/pubitem.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { cA } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  pubItems: PubItem[] = [];
  filteredItems: PubItem[] = [];
  searchText: string = '';
  etats: string[] = ['excellente','bien', 'moyenne', 'mauvaise'];
  selectedEtats: string[] = [];

  

  userId= localStorage.getItem('angular17TokenUserId');
  id!: number ;

  getId(){
  if(this.userId ){
    this.id=parseInt(this.userId)
  }
}
 

  constructor(private pubItemService: PubitemService, private cartService: CartService , public snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.retrieveAllPubItems();
    this.getId();
    this.createCartForUser(this.id);
  }

  retrieveAllPubItems(): void {
    this.pubItemService.getPubitems().subscribe(pubItems => {
      this.pubItems = pubItems;
      this.filteredItems = [...this.pubItems];
    });
  }

  
  createCartForUser(userId: number): void {
    this.cartService.createCartForUser(userId).subscribe(
      (cart: Cart) => {
        console.log('Cart created successfully:', cart);
        
        // Save only the cart id in local storage
      this.cartid=cart.id ;
      console.log("this cart is ", this.cartid);
      
      },
      (error) => {
        console.error('Error creating cart:', error);
      }
    );
  }
  
  searchItems(): void {
    if (this.searchText.trim()) {
      this.pubItemService.searchPubItems(this.searchText.trim()).subscribe(pubItems => {
        this.pubItems = pubItems;
      });
    } else {
      this.filteredItems = [...this.pubItems]; // If search text is empty, retrieve all items
    }
  }

  sortItemsByPriceDescending(): void {
    this.pubItemService.getPubItemsSortedByPriceDS().subscribe(pubItems => {
      this.filteredItems = pubItems;
    });
  }

  sortItemsByPriceAS(): void {
    this.pubItemService.getPubItemsSortedByPriceAS().subscribe(pubItems => {
      this.filteredItems = pubItems;
    });
  }


  filterItemsByEtat(etat: string, checked: boolean): void {
    if (checked) {
      // Add to selected Etats
      this.selectedEtats.push(etat);
    } else {
      // Remove from selected Etats
      this.selectedEtats = this.selectedEtats.filter(selectedEtat => selectedEtat !== etat);
    }
    this.applyFilters();
  }

  applyFilters(): void {
    console.log('Selected Etats:', this.selectedEtats); // Log selected etats to check the values
  
    if (this.selectedEtats.length === 0) {
      // If no filters selected, show all items
      this.filteredItems = [...this.pubItems];
        } else {
      // Filter items based on selected Etats
      this.filteredItems = this.pubItems.filter(item => {
        console.log('Item Etat:', item.etat); // Log item etat to check the value
        return this.selectedEtats.includes(item.etat);
      });
    }
  }
  
  getEtatItemCount(etat: string): number {
    return this.pubItems.filter(item => item.etat === etat).length;
  }
cartid !: number;

    // Assuming you have a fixed cart ID for now, you can replace it with dynamic logic if needed

  addToCart(itemId: number): void {
    this.cartService.addItemToCart(this.cartid, itemId).subscribe(
      response => {
        console.log(response);
        
  
      },
      error => {
        console.error(error);
      }
    );
    this.openSnackBar();
  }


  openSnackBar() {
    this.snackBar.open('Item added to cart', 'Close', {
      duration: 3000 // Duration in milliseconds
    });
  }
}
