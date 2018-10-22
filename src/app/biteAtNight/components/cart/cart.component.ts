import { Component, OnInit, ViewChild } from '@angular/core';
import { Address } from './../../models/address';
import { MatSidenav, MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { CartObj } from './../../models/user';
import { Bill } from './../../models/bill';
import { CartService } from './../../services/cart.service';
import { OrderService } from './../../services/order.service';
import { AddressService } from './../../services/address.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  data: Array<CartObj>;
  value: string;
  showAdd: boolean;
  showPlusMinus: boolean;
  count: number;

  billObj: Bill;
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(private _cartService: CartService, private _orderService: OrderService,
    private _addressService: AddressService) { }

  ngOnInit() {
    this._cartService.getUserCart().subscribe(cartObjs => {
      this.data = cartObjs;
    });
    this.billObj = this._cartService.getBill();
  }

  displayedColumns: string[] = ['itemName', 'quantity', 'totalPrice'];

  placeOrder() {
    //order must be saved in orderDatabase
    //a mail should be sent to user
    //referral code must be updated... coupon points should be there which would be equivalent to 1 ruppee.

  }

  plus(itemId: string) {
    this.count++;
    console.log("plus() is called in item-view.component");
    this.value = this.count.toString();
    this._cartService.increaseItemCountInCart(itemId);
    this.billObj = this._cartService.getBill();
  };

  minus(itemId: string) {
    if (this.count == 1) {
      this.count--;
      this.showAdd = true;
      this.showPlusMinus = false;
    } else if (this.count > 1) {
      this.count--;
      this.value = this.count.toString();
    }
    console.log("minus() is called in item-view.component");
    this._cartService.decreaseItemCountInCart(itemId);
    this.billObj = this._cartService.getBill();
  };

}






/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
