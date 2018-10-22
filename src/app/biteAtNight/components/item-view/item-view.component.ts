import { Component, OnInit, Input } from '@angular/core';
import {Item} from './../../models/item';
import {CartObj} from './../../models/user';
import {CartService} from './../../services/cart.service';


@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.css']
})
export class ItemViewComponent implements OnInit {
  value : string;
 showAdd : boolean;
 showPlusMinus : boolean;
 count : number;
 data : CartObj;
 
  @Input() item : Item;

  ngOnInit() {
  }
 
  constructor(private _cartService : CartService){
    this.count = 1;
    this.value = this.count.toString();
    this.showAdd = true;
    this.showPlusMinus = false;

  }
   
   addFunction(item : Item){

     this.showAdd = false;
     this.showPlusMinus = true;
     this.data = new CartObj();
     console.log("add function in item-view.component is called");
     this.data.itemId = item.itemId;
     this.data.itemName = item.itemName;
     this.data.count = 1;
     this.data.price = item.price;
     
     this._cartService.addItemInCart(this.data);

   };
  plus(itemId: string){
         this.count++;
         console.log("plus() is called in item-view.component");
        this.value = this.count.toString();
        this._cartService.increaseItemCountInCart(itemId);
     };
      minus(itemId : string){
       if (this.count == 1) {
         this.count--;
         this.showAdd = true;
         this.showPlusMinus = false;
       }  else if(this.count>1){
         this.count--;
         this.value = this.count.toString();
       }
       console.log("minus() is called in item-view.component");
       this._cartService.decreaseItemCountInCart(itemId);
     };
}
