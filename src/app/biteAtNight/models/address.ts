export class Address{
    addressId : string;
    houseNo : string;
    userId : string;
    landmark : string;
    type : string; //home, other?
    area : string;
    city : string;
    state : string;
    pincode : number;

    constructor(){
        this.addressId = '';
        this.houseNo = '';
        this.userId = '';
        this.landmark = '';
        this.type = '';
        this.area = '';
        this.city = '';
        this.state = '';
        this.pincode = null;
    }
}