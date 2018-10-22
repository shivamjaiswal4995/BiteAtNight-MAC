export class Bill{

    totalPrice : number;
    couponDiscount : number;
    deliveryCharges : number;
    toPay : number;
    gst : number;

    constructor(){

        this.totalPrice = null;
        this.couponDiscount = null;
        this.deliveryCharges = null;
        this.gst = null;
        this.toPay = null;
        
    }
}