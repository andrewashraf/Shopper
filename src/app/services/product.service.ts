import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';



@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private cartItems: any[] = []; // Array to store cart items
  private cartItemCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0); // Subject to emit cart item count changes
  private cartItemCountSource = new BehaviorSubject<number>(0);

  getProduct(productId: string | null) {
    throw new Error('Method not implemented.');
  }
  constructor(public http: HttpClient) {}

  public getProducts(): Observable<any[]> {
    return this.http
      .get<any[]>(`${environment.apiUrl}/Products`)
      .pipe();
  }


  public addNewProduct(Product: any) {
    return this.http
      .post<any>(`${environment.apiUrl}/Products`, Product)
      .pipe();
    
  }

  public deleteProduct(ProductId: any) {
    return this.http
      .delete<any>(`${environment.apiUrl}/Products/${ProductId}`)
      .pipe();
  }

  public editProduct(ProductId:any , Product: any) {
    return this.http
      .put<any>(`${environment.apiUrl}/Products/${ProductId}`, Product)
      .pipe();
    
  }
/// testing with Couse video n:20
  public getProductsByID(prdID:number):  Observable<any> {
    return this.http
    .get<any[]>(`${environment.apiUrl}/Products/${prdID}`)
    .pipe();
  }

  public getProductcart(productId: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/Products/${productId}`);
  }

  get cartItemCount() {
    return this.cartItemCountSource.asObservable(); // Expose as Observable
  }

  addToCart(product: any) {
    this.cartItems.push(product);
    this.updateCartItemCount(this.cartItems.length); // Emit cart item count change
  }
  
  removeFromCart(product: any) {
    const index = this.cartItems.indexOf(product);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.updateCartItemCount(this.cartItems.length); // Emit cart item count change
    }
  }

  updateCartItemCount(count: number) {
    this.cartItemCountSource.next(count); // Emit cart item count change
  }

  // Other methods for fetching, adding, updating, and deleting products



}
