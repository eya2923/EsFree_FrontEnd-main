import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Cart } from '../Models/cart';
import { PubItem } from '../Models/pubitem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl : String ="http://localhost:8082/cart/";

  
  constructor(private httpClient : HttpClient) { }


  
  getCartById(cartId: number): Observable<Cart> {
    return this.httpClient.get<Cart>(`${this.baseUrl}${cartId}`);
  }

  getProductsInCart(cartId: number): Observable<PubItem[]> {
    return this.httpClient.get<PubItem[]>(`${this.baseUrl}${cartId}/items`);
  }
 
  getAllCartsWithProducts(): Observable<Cart[]> {
    return this.httpClient.get<Cart[]>(`${this.baseUrl}allcart`);
  }

  deleteCart(cartId: number): Observable<string> {
    const url = `${this.baseUrl}${cartId}`;
    return this.httpClient.delete<string>(url);
  }

  searchCarts(cartId?: number, total?: number, itemName?: string): Observable<Cart[]> {
    let params = new HttpParams();
    if (cartId) params = params.set('cartId', cartId.toString());
    if (total) params = params.set('total', total.toString());
    if (itemName) params = params.set('itemName', itemName);
    return this.httpClient.get<Cart[]>(`${this.baseUrl}search`, { params });
  }

  createCartForUser(userId: number): Observable<Cart> {
    // Check if a cart already exists for the user
    return this.httpClient.get<Cart>(`${this.baseUrl}user/${userId}`).pipe(
      // If a cart exists, return it directly
      catchError(error => {
        if (error.status === 404) {
          // If no cart exists (status code 404), create a new cart
          return this.httpClient.post<Cart>(`${this.baseUrl}user/${userId}`, null);
        }
        throw error;
      })
    );
  }


  getCartForUser(userId: number): Observable<Cart> {
    return this.httpClient.get<Cart>(`${this.baseUrl}user/${userId}`);
  }


  addItemToCart(cartId: number, itemId: number): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}${cartId}/items?itemId=${itemId}`, null);
  }

  getPubItemsInCartByUserId(userId: number): Observable<PubItem[]> {
    const url = `${this.baseUrl}user/${userId}/pubitems`;
    return this.httpClient.get<PubItem[]>(url);
  }

  removeItemFromCart(cartId: number, itemId: number): Observable<string> {
    const url = `${this.baseUrl}${cartId}/items/${itemId}`;
    return this.httpClient.delete<string>(url);
  }


}
