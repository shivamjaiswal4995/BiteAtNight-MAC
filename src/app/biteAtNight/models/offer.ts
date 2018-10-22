export class Offer{

    offerId :  string;
    userId : string;
    offerName : string;
    description : string;
    category : string; //a) percentage discount, b)flatOff c)referral d) comboPackshould not be there in offers.  
    value : number;
    maxDiscount : number;
    minimumAmount : number;

    constructor(){

        this.offerId = '';
        this.userId = '';
        this.offerName = '';
        this.description  = '';
        this.category = '';
        this.value = null;
    }
}
// i want to se this class such that while adding offer, just ihave to change here only.
//first thought- using services to detect which offer is applied and writing formula in other class o calculate 
//discount and subtracting it from 