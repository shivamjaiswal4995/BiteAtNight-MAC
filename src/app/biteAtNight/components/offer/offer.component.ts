import { Component, OnInit } from '@angular/core';
import {Offer} from '../../models/offer';
import {OfferService} from '../../services/offer.service';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  offers : Array<Offer>;
  isOfferApplied : boolean;
  appliedOfferName : string;


  constructor(private _offerService : OfferService, private _cartService : CartService) { }

  ngOnInit() {
    this._offerService.getOffer().subscribe(
      data => {
        console.log(data);
        this.offers = data;
        console.log(this.offers);
      });

      this.isOfferApplied = false;
  }

  applyOffer(offerId : string){

    if(!this.isOfferApplied){
    this.isOfferApplied = true;
    const appliedOffer = this.offers.find(offer => offer.offerId == offerId);
    this.appliedOfferName = appliedOffer.offerName;
    this._cartService.applyCoupon(offerId);
    } else {
      //some message have to be displayed that only one offer should be allowed.
    }
  }

  removeOffer(){
    this.isOfferApplied = false;
    this._cartService.removeCoupon();
  }
  addOffer(){
    this._offerService.addOffer
    //to be used by admin side
  }
  deleteOffer(){
    //to be used by admin side
  }
  

}
