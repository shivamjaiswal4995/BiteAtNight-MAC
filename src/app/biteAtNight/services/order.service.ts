import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import { AuthenticationService } from './authentication.service';
import { Order } from '../models/order';
import { Address } from '../models/address';

@Injectable()
export class OrderService {
    private deliveryAddress: Address;
    private _orderUrl: string;
    private _token;
    private orders: Array<Order>;
    private previousOrders: Array<Order>;
    private orderSubject: BehaviorSubject<Array<Order>>;
    private previousOrderSubject: BehaviorSubject<Array<Order>>;


constructor(private _http: HttpClient, private _authService: AuthenticationService){

    //as we are mentioning only this URL which will take it till 
    //orders/order.router.js.. how it is decided afterwards which method to be executed as we
    //are not appending Url with addOrder, findPreviousorder orsomething...
     this._orderUrl = 'api/v1/orders';
    this.orders = [];
    this.orderSubject = new BehaviorSubject(this.orders);
    this.previousOrders = [];
    this.previousOrderSubject = new BehaviorSubject(this.previousOrders);
    //this.findPreviousOrders();
    //when  we import a service in another class, its constructor is called?
}

addOrder(data : Order) : Observable<Order> {
this._token = this._authService.getBearerToken();
return this._http.post<Order>(this._orderUrl, data, {
    headers: new HttpHeaders()
    .set('Authorization', `Bearer ${this._token}`)
}).do(addedOrder => {
    this.orders.push(addedOrder);
    this.orderSubject.next(this.orders);
    this.previousOrders.push(addedOrder);
    this.previousOrderSubject.next(this.previousOrders);
})
//.catch(this.handleError);
}

fetchAllOrders() {
    this._token = this._authService.getBearerToken();
    return this._http.get<Order[]>(this._orderUrl, {
        headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this._token}`)
    })
   // .catch(this.handleError);
   .subscribe(orders => {

    this.orders = orders;
    this.orderSubject.next(this.orders);
   });
}
//how will this getNotes observable know that it is subscribed 
//to fetchAllOrders?
getNotes() : Observable<Order[]>{
    return this.orderSubject;
}

fetchPreviousOrder( userId){
    this._token = this._authService.getBearerToken();
    return this._http.post<Order[]>(this._orderUrl, userId, {
        headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this._token}`)
    })
    //.catch(this.handleError)
    .subscribe(orders => {
        this.previousOrders = orders;
        this.previousOrderSubject.next(this.previousOrders);
    });
   // this.previousOrders = this.orders.find(order => order.userId === userId);
// have ot run a loop for this type of approach.

} 
getPreviousOrder() : Observable<Order[]>{
    return this.previousOrderSubject;
}
saveDeliveryAddress(address : Address){
    this.deliveryAddress = address;
}

getDeliveryAddress() : Address {
    return this.deliveryAddress;
}
}