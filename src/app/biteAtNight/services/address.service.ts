import { AuthenticationService } from './authentication.service';
import { Address } from '../models/address';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

@Injectable()
export class AddressService {
    private _addressUrl: string;
    private _token: string;
    private addresses: Array<Address>;
    private addressesByUserId : Array<Address>;
    addressesSubject: BehaviorSubject<Array<Address>>;
    addressesByUserIdSubject : BehaviorSubject<Array<Address>>;

    constructor(private _http: HttpClient, private _authService: AuthenticationService){

        this._addressUrl = 'api/v1/addresses';
        this.addresses = [];
        this.addressesByUserId = [];
        this.addressesSubject = new BehaviorSubject(this.addresses);
        this.addressesByUserIdSubject = new BehaviorSubject(this.addressesByUserId);

    }

    fetchAllAddresses() : Observable<Address[]>{
        //this method will be used on admin side. and a whole new page would be opened with all addresses, thus 
        //authentication is required.
        this._token = this._authService.getBearerToken();
        this._http.get<Address[]>(this._addressUrl, {
            headers: new HttpHeaders()
            .set('Authorization', `Bearer ${this._token}`)
        })
        //.catch(this.handleError)
        //subscribing as this._http.get method return observable.
        .subscribe(addresses => {
            this.addresses = addresses;
            this.addressesSubject.next(this.addresses);
        });
        return this.addressesSubject;
    }

    // getAllAddress() : Observable<Address[]>{
    //     return this.addressesSubject;   directly putting a return type in fetchAllAddress.
    //no use of writing an extra method 
    // }

    fetchAllAddressesByUserId() : Observable<Address[]>{
        console.log("fetchallAddresses is called");
        this._http.get<Address[]>(`${this._addressUrl}/byUser`/*what is use of these options?*/,{
            headers: new HttpHeaders()
            .set('Authorization', `Bearer ${this._token}`)
        })
        .subscribe(addresses => {
            console.log(addresses);
            this.addressesByUserId = addresses;
            this.addressesByUserIdSubject.next(this.addressesByUserId);

        });
        return this.addressesByUserIdSubject;
    
    }
    //how to fill userId property of address model?
    addAddress(data : Address) : Observable<Address>{
        return this._http.post<Address>(`${this._addressUrl}/addaddress`, data, {
            headers: new HttpHeaders()
            .set('Authorization', `Bearer ${this._token}`)
        }).do(addedAddress => {
            this.addressesByUserId.push(addedAddress);
            this.addressesByUserIdSubject.next(this.addressesByUserId);
        });
        //.catch(this.handleError);
    }
//on each mat-card of address, there would be a small panel below when we hover on it.
//just like in keep application.
    updateAddress(data : Address) {
        const address = this.addressesByUserId.find(address => address.addressId === data.addressId);
        Object.assign(address, data);
        //shouldnt we push modified data in items? 
        this.addressesByUserIdSubject.next(this.addressesByUserId);

         this._http.put<Address>(`${this._addressUrl}/:${data.addressId}`, data, {
            headers: new HttpHeaders()
            .set('Authorization', `Bearer ${this._token}`)
        })
        //.catch(this.handleError);
    }
    // to be used by admin
    getAddressByAddressId(addressId :string): Address{
        const address = this.addresses.find(address=> address.addressId === addressId);
        return address;
    }
    getAddressByAddressIdOfUser(addressId : string) : Address {
        const address = this.addressesByUserId.find(address => address.addressId === addressId);
        return address;
    }

    deleteAddress(addressId): Observable<Address>{
        const address = this.addressesByUserId.find(address => address.addressId === addressId);
        const index = this.addressesByUserId.findIndex(address => address.addressId === addressId);
        this.addressesByUserId.splice(index, 1);//what is use of splice?
        return this._http.delete<Address>(`${this._addressUrl}/:${addressId}`,{
            headers: new HttpHeaders()
            .set('Authorization', `Bearer ${this._token}`)
        })
        // .catch(this.handleError);

    }
}
