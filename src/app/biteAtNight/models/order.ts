import { Item } from './item';
import {Address} from './address';
import {CartObj} from './user';

export class Order{

    orderId : string;
    userId : string;
    cart : Array<CartObj>;
    state_Of_Order : string;
    orderedOn : Date;
    delivery_Address : Address;
    total_Price : number;
    discount : number;
    tax : number;
    payable_Amount : number;

    constructor(){
        this.orderId = '';
        this.userId = '';
        this.cart = [];
        this.state_Of_Order = '';
        this.orderedOn = null;
        this.delivery_Address = null;
        this.total_Price = null;
        this.discount = null;
        this.tax = null;
        this.payable_Amount = null;
    }

}