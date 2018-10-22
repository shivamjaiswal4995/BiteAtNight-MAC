import { Injectable } from '@angular/core';
import { Router } from '@angular/router/';
import { Location } from '@angular/common';

@Injectable()
export class RouterService {

  constructor(private _router: Router, private _location: Location) { }

  routeToHome() {
    this._router.navigate(['biteAtNight/home']);
  }

  routeToLogin() {
    this._router.navigate(['biteAtNight/login']);
  }

  routeToCart(){
    this._router.navigate(['biteAtNight/home/cart']);
  }

  routeToFaqs(){
    this._router.navigate(['biteAtNight/home/faq']);
  }

  routeToMyAccountPage(){
    this._router.navigate(['biteAtNight/home/myaccount']);
  }

  routeToEditAddressView(addressId) {
    this._router.navigate(['biteAtNight/home', {
      outlets: {
        addressEditOutlet: ['address', addressId, 'edit']
      }
    }]);
  }

//   routeToEditNoteView(noteId) {
//     this._router.navigate(['biteAtNight/dashboard', {
//       outlets: {
//         noteEditOutlet: ['note', noteId, 'edit']//what is use of noteEditOutlet?
//       }
//     }]);
//   }

  routeBack() {
    this._location.back();
  }

}
