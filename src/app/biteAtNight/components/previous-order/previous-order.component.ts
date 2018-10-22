import { Component, OnInit, Input } from '@angular/core';
import {Order} from '../../models/order';
import {Item} from '../../models/item';

@Component({
  selector: 'app-previous-order',
  templateUrl: './previous-order.component.html',
  styleUrls: ['./previous-order.component.css']
})
export class PreviousOrderComponent implements OnInit {

  @Input() order : Order;


  constructor() { }

  ngOnInit() {

  }

  reorder(orderId : string){

  }

  showOrder(){
    //show the order details. with a popup. like edit note view. reference swiggy.
  }
  //write a function to add delivery address in  order object.
  //write a function to add items(and quantity of ech item ordered) in order object.
}
