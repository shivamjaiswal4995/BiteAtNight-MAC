import { Component, OnInit, Input } from '@angular/core';
import {AddressService} from '../../services/address.service';
import {OrderService} from '../../services/order.service';
import {Address} from '../../models/address';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  isAddressPresent : boolean;
  addressesOfUser : Array<Address>;
  
  @Input() address : Address;
  
 
  constructor(private _addressService : AddressService,
    private _orderService : OrderService) {} 

  ngOnInit() {
    this._addressService.fetchAllAddressesByUserId().subscribe(addresses => {
      this.addressesOfUser = addresses;
  });
  if(this.addressesOfUser.length >0){
      this.isAddressPresent = true;
  }else{
    this.isAddressPresent = false;
  }
  }

  openEditAddressView(addressId : string): void{
//route to editaddressView
  }

  deleteAddress(addressId : string){
    this._addressService.deleteAddress(addressId);
  }

  addAddress(){
    //route to add address panel which would be containing google maps api
  }

  addDeliveryAddress(addressId : string){
    const deliveryAddress = this.addressesOfUser.find(address => address.addressId === addressId);
    this._orderService.saveDeliveryAddress(deliveryAddress);
  }
}
