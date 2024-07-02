import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PubItem } from 'src/app/Models/pubitem';
import { CartService } from 'src/app/Services/cart.service';
import { PubitemService } from 'src/app/Services/pubitem.service';

@Component({
  selector: 'app-itemdetail',
  templateUrl: './itemdetail.component.html',
  styleUrls: ['./itemdetail.component.css']
})
export class ItemdetailComponent implements OnInit{

  pubItem!: PubItem;
  samePriceItems!: PubItem[];
  currentPubItemId: number | null = null;
  constructor(
    private route: ActivatedRoute,
    private pubitemService: PubitemService,
    private cartService: CartService,
    public snackBar: MatSnackBar
    
  ) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id_pub = params.get('id_pub');
      if (id_pub !== null) {
        this.currentPubItemId = +id_pub;
        this.getPubItemDetails(this.currentPubItemId);
      } else {
      }
    });
  }

  getPubItemDetails(id: number): void {
    this.pubitemService.getPubItemById(id).subscribe(pubItem => {
      this.pubItem = pubItem;
      this.getOtherItemsWithSamePrice(pubItem.prix); 
    });
  }

  getOtherItemsWithSamePrice(price: number): void {
    if (this.currentPubItemId !== null) {
      this.pubitemService.getPubItemsByPrice(price).subscribe(items => {
        // Filter out the current PubItem from the list of items with the same price
        this.samePriceItems = items.filter(item => item.id_pub !== this.currentPubItemId);
      });
    } else {
      // Handle case where currentPubItemId is null
    }
  }
  addToCart(itemId: number): void {
    const cartId = 1; // Assuming you have a fixed cart ID for now, you can replace it with dynamic logic if needed
    this.cartService.addItemToCart(cartId, itemId).subscribe(
      response => {
        // Handle successful addition to cart
        console.log(response);
        
  
      },
      error => {
        // Handle error, if any
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
