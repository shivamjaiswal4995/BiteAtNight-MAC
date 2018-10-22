import { Order } from './order';
import { Address } from './address';

export class CartObj{
    itemId : string;
    itemName : string;
    count : number;
    price : number;

    constructor(){
        this.itemId = '';
        this.itemName= '';
        this.count = null;
        this.price = null;
    }
}

export class User{

 userId: string;
 userName: string;
 password: string;
 userEmail : string;
 contactNo: number;
 addresses: Array<Address>;
 orders: Array<Order>;
 cart : Array<CartObj>;
 referralCode : string;
 referralPoints : number;


 constructor(){
     this.userId = '';
     this.userName = '';
     this.password = '';
     this.userEmail = '';
     this.contactNo = null;
     this.addresses = [];
     this.orders = [];
     this.cart = [];
     this.referralCode = '';
     this.referralPoints = null;
 }

}
