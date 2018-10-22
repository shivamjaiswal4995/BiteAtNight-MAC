import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import { AuthenticationService } from './authentication.service';
import { Offer } from '../models/offer';

@Injectable()
export class OfferService {

    private _offerUrl: string;
    private _token;
    private offers: Array<Offer>;
    private offerSubject: BehaviorSubject<Array<Offer>>;

constructor(private _http: HttpClient, private _authService: AuthenticationService){

    //as we are mentioning only this URL which will take it till 
    //orders/order.router.js.. how it is decided afterwards which method to be executed as we
    //are not appending Url with addOrder, findPreviousorder orsomething...
     this._offerUrl = 'api/v1/offers';
    this.offers = [];
    this.offerSubject = new BehaviorSubject(this.offers);
    //when  we import a service in another class, its constructor is called?
}
//**before addOffer method, fetchAllmethod will definitely be called. so this.offerSubject will be updated and thn we can push 
//newoffer in it so that we can see offerdded directly without refreshing the page.
//if we dont use observable thn we have to connect to database again to show the offer that was added.
addOffer(data : Offer) : Observable<Offer> {
this._token = this._authService.getBearerToken();
return this._http.post<Offer>(`${this._offerUrl}/addOffer`, data, {
    headers: new HttpHeaders()
    .set('Authorization', `Bearer ${this._token}`)
}).do(addedOffer => {
    this.offers.push(addedOffer);
    this.offerSubject.next(this.offers);
}).catch(this.handleError);
}

// fetchAllOffers() : Observable<Offer[]> {
//     this._token = this._authService.getBearerToken();
//     this._http.get<Offer[]>(`${this._offerUrl}/allOffer`, {
//         headers: new HttpHeaders()
//         .set('Authorization', `Bearer ${this._token}`)
//     }).catch(this.handleError)
//    .subscribe(offers => {
//     this.offers = offers;
//     this.offerSubject.next(this.offers);
//    });
//    return this.offerSubject;
// }
//how will this getNotes observable know that it is subscribed 
//to fetchAllOrders?
// getNotes() : Observable<Order[]>{
//     return this.orderSubject;
// } no use. directlyreturning offers observable from fetchAllOrders.

   // this.previousOrders = this.orders.find(order => order.userId === userId);
// have ot run a loop for this type of approach.
fetchAllOffers()  {
    this._token = this._authService.getBearerToken();
    this._http.get<Offer[]>(`${this._offerUrl}/allOffer`, {
        headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this._token}`)
    }).catch(this.handleError)
   .subscribe(offers => {
    this.offers = offers;
    this.offerSubject.next(this.offers);
   });
}

getOffer() : Observable<Offer[]>{
    console.log("getOffer() from offer.service applied");
    this.fetchAllOffers();
    return this.offerSubject;
}
//before deleteOffer, getOffer() will definitely be called so, this.notes and this.notesSubject will be updated.
deleteOffer(offerId : string) {
    const offer = this.offers.find(offer => offer.offerId === offerId);//hhow this find works?
    const index = this.offers.findIndex(offer => offer.offerId === offerId);
    this.offers.splice(index, 1);
    this.offerSubject.next(this.offers);
    this._token = this._authService.getBearerToken();
    this._http.delete<Offer>(`${this._offerUrl}/delete/:${offerId}`, {
        headers : new HttpHeaders()
        .set('Authorization', `Bearer ${this._token}`)
    }).catch(this.handleError)
}
//should we return obsevable in delete method also.
// what is the use of it?
//once admin delete the offer, i have to update offer list without refreshing page.

private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err);
  }
}