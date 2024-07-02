import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { Cart } from 'src/app/Models/cart';
import { PubItem } from 'src/app/Models/pubitem';
import { CartService } from 'src/app/Services/cart.service';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cartf',
  templateUrl: './cartf.component.html',
  styleUrls: ['./cartf.component.css']
})
export class CartfComponent implements OnInit {

  cartItems: PubItem[] = [];
  handler:any = null;
  cartId!: number ;

  userId= localStorage.getItem('angular17TokenUserId');
  id!: number ;

  getId(){
  if(this.userId ){
    this.id=parseInt(this.userId)
  }
}

  constructor(private cartService: CartService, private cdr: ChangeDetectorRef, private httpClient:HttpClient , private router: Router) { }
  ngOnInit(): void {
    this.getId();

    this.getCartItemsForUser();
  }

  getCartItemsForUser(): void {
    console.log("test",this.id)
    this.cartService.getPubItemsInCartByUserId(this.id).subscribe(
      (pubItems: PubItem[]) => {
        this.cartItems = pubItems;
        console.log('Cart items retrieved:', this.cartItems);
      },
      (error: any) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  calculatePriceOfItems(): number {
    return this.cartItems.reduce((total, item) => total + item.prix, 0);
  }

  removeItemFromCart(itemId: number): void {
    this.cartService.removeItemFromCart(this.id, itemId).pipe(
      switchMap(() => this.cartService.getPubItemsInCartByUserId(this.id))
    ).subscribe(
      (pubItems: PubItem[]) => {
        this.cartItems = pubItems;
        this.cdr.detectChanges(); // Trigger change detection
      },
      (error: any) => {
        console.error('Error removing item from cart:', error);
      }
    );
    location.reload();
  }

  pay(amount: any) {    
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
      locale: 'auto',
      token: (token: any) => {
        // This will be called when the user successfully completes the payment
        this.handleToken(token, amount);
       
      }
    });

 
    handler.open({
      name: 'Stripe payment',
      description: 'enter your card credentials',
      amount: amount * 1000
    });
 
  }
  handleToken(token: any, amount: any) {
    // Construct the URL with query parameters
    const url = `http://lbackend-service:8082/payments/create-payment-intent?amount=${amount}&currency=usd`;
  
    // Make the HTTP POST request to the backend server
    this.httpClient.post(url, null)
      .subscribe(
        (response: any) => {
          console.log('Payment intent created:', response);
          // Handle success
          alert('Payment Successful!');
         
        },
        (error: any) => {
          console.error('Failed to create payment intent:', error);
        }
      );
       this.router.navigate(['/user/market'])
       this.deleteCart(this.cartId);
  }

  deleteCart(cartId: number) {
    this.cartService.deleteCart(cartId).subscribe(
      () => {
        console.log('Cart deleted successfully');
      },
      (error) => {
        console.error('Error deleting cart:', error);
      }
    );
  }

  }

  