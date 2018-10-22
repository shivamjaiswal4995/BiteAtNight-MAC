import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import { AuthenticationService } from './authentication.service';
import { User, CartObj } from '../models/user';
import {Address} from '../models/address';
import {Order} from '../models/order';
import {UserService} from './user.service';
import {Offer} from './../models/offer';
import {OfferService} from './offer.service';
import {Bill} from './../models/bill';

@Injectable()
export class CartService {

    private billObj : Bill;
    private data : CartObj;
    private _usersUrl: string;
    private _token;
    private userCart : Array<CartObj>;
    private userCartSubject : BehaviorSubject<Array<CartObj>>;
    private offers : Array<Offer>;

    constructor(private _http: HttpClient, private _authService: AuthenticationService,
        private _userService : UserService, private _offerSevice: OfferService) {
         
        this.userCart = [];
        this.userCartSubject = new BehaviorSubject(this.userCart);
        this.fetchUserCart();
        }
//this method is for admin.
   
    
    

    fetchUserCart(){

        this._userService.getUserProfile().subscribe( data => {
            console.log(data);
            this.userCart = data.cart;
            console.log(this.userCart);
            this.userCartSubject.next(this.userCart);
            
        });

    }

    getUserCart() : Observable<CartObj[]>{
        return this.userCartSubject;
    }

    addItemInCart(data : CartObj ){

        this.userCart.push(data);
        this.userCartSubject.next(this.userCart);
    }

    increaseItemCountInCart(itemId: string){
       const cartObjToUpdate = this.userCart.find(cartObj => cartObj.itemId == itemId);
       cartObjToUpdate.count = cartObjToUpdate.count + 1;
         this.userCartSubject.next(this.userCart);
         console.log(this.userCart);
    }

    decreaseItemCountInCart(itemId : string){
        const cartObjToUpdate = this.userCart.find(cartObj => cartObj.itemId == itemId);
        console.log("decreaseItemCountInCart is called in itemService")
        
        if(cartObjToUpdate.count==1){
            
           const index = this.userCart.findIndex(cartObj => cartObj.itemId == itemId);
           this.userCart.splice(index,1);
           this.userCartSubject.next(this.userCart);
           console.log(this.userCart);


        } else if(cartObjToUpdate.count > 1){
            cartObjToUpdate.count = cartObjToUpdate.count - 1;
            this.userCartSubject.next(this.userCart);
            console.log(this.userCart);
        }
        
    }

    getBill(){
        var i;
        this.billObj = new Bill();
        for(i=0;i<this.userCart.length ; i++){
            this.billObj.totalPrice += this.userCart[i].price * this.userCart[i].count;
        }
        this.billObj.deliveryCharges = 20;
        this.billObj.gst = this.billObj.totalPrice/10 + this.billObj.totalPrice%10;
        this.billObj.toPay = (this.billObj.totalPrice + this.billObj.deliveryCharges + this.billObj.gst - this.billObj.couponDiscount);

        return this.billObj;
    }

    applyCoupon(offerId : string){
         this._offerSevice.getOffer().subscribe( data => {
             this.offers = data;
         });
        
         const offerApplied = this.offers.find(offer => offer.offerId == offerId);
         const offerAppliedCategory = offerApplied.category;

         if (offerAppliedCategory == "discount"){

            const value = offerApplied.value;
            const maxDiscount = offerApplied.maxDiscount;
            const discountAmount = this.billObj.totalPrice / value;

            if(discountAmount >= maxDiscount){
                this.billObj.couponDiscount = maxDiscount;
            } else{
                this.billObj.couponDiscount = discountAmount;
            }

         } else if (offerAppliedCategory == "flatOff"){

            const minimumAmountFlatOff = offerApplied.minimumAmount;
            if(this.billObj.totalPrice >= minimumAmountFlatOff){
                this.billObj.couponDiscount = offerApplied.value;
            }
            else {
                //have to return something that a error can be shown that the minimum amount should be this.
            }
         } else if(offerAppliedCategory == "referral"){
            const minimumAmountReferral = offerApplied.minimumAmount;
            if(this.billObj.totalPrice >= minimumAmountReferral){
                this.billObj.couponDiscount = offerApplied.value;
            } else{
                ////have to return something that a error can be shown that the minimum amount should be this.
            }
         }
     }
    removeCoupon(){
        this.billObj.couponDiscount = 0;
    }
}
