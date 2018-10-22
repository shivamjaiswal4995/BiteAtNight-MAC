import { Component, OnInit, NgZone, ViewChild, OnDestroy } from '@angular/core';
import {UserService} from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {User} from "../../models/user";
import {Address} from '../../models/address';
import {Order} from '../../models/order';
import { MatSidenav, MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { RouterService } from '../../services/router.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px`);
  user: User;
  userName : string;
  userEmail : string;
  contactNo : number;
  addresses : Array<Address>;
  previousOrders : Array<Order>;
  options = [
    {name: 'Orders', link : '/home/myaccount/previousorders'},
    {name : 'Offers', link : '/home/myaccount/offers'},
    {name: 'Addresses', link: '/githome/myaccount/addresses'}
  ]
  

  constructor(
    private _userService : UserService,
    zone: NgZone,
    private _routerService : RouterService,
    private _router : Router,
    private _dialog : MatDialog) {
      this.mediaMatcher.addListener(mql =>
        zone.run(() => this.mediaMatcher = mql));
     }

  ngOnInit() {

    this._userService.getUserProfile().subscribe( user => {

      this.user  = user;
      console.log(this.user);

      this._router.events.subscribe(() => {
        if (this.isScreenSmall()) {
          this.sidenav.close();
        }
      });

    });

    this.userName = this.user.userName;
      this.userEmail = this.user.userEmail;
      this.contactNo = this.user.contactNo;
      this.addresses = this.user.addresses;
      this.previousOrders = this.user.orders; 
      
  }
  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

}
