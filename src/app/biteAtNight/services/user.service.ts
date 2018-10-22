import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import { AuthenticationService } from './authentication.service';
import { User, CartObj } from '../models/user';
import {Address} from '../models/address';
import {Order} from '../models/order';

@Injectable()
export class UserService {

    // private _dataStore : {
    //     users : User[]
    // };
  
    private _usersUrl: string;
    private _token;
    private userToUpdate : User;
    private users: Array<User>;
    private userSubject: BehaviorSubject<Array<User>>;
    private userCart : Array<CartObj>;
    private userCartSubject : BehaviorSubject<Array<CartObj>>;

    constructor(private _http: HttpClient, private _authService: AuthenticationService) {
        this._usersUrl = '/api/v1/users';
        this.userToUpdate = null;
        this.users = [];
        this.userSubject = new BehaviorSubject(this.users);
        this.userCart = [];
        this.userCartSubject = new BehaviorSubject(this.userCart);
        
        }
//this method is for admin.
    findAllUser() : Observable<User[]> {
        this._token = this._authService.getBearerToken();
         this._http.get<User[]>(this._usersUrl, { //shouldnt it be this._userUrl +/ to call get all user function?
            headers: new HttpHeaders()
                .set('Authorization', `Bearer ${this._token}`)
        }).subscribe(data => {
            this.users = data;
            console.log('Users ', this.users);
            this.userSubject.next(this.users);
        }, error => console.log(`Error occured while fetching users ${error}`)
        );
        return this.userSubject;
    }
    //directly returning observable of user[] from findAllUser.
//    getUsers(): Observable<User[]> {
//         return this.userSubject;
//     }

// tslint:disable-next-line:eofline
//why are we returning observable in this method?
//    addUser(user : User): Observable<User> {
//     return this._http.post<User>(`${this._usersUrl}/register`, user, {

//     })
   //} already done in authenticationService.
   //signIn and signUp are taken care by authenticationService.
    // userById(id : string): Observable<User> {
    //     this._token = this._authService.getBearerToken();
    //     return this._http.get<User>(`${this._usersUrl}/profile`, {
    //         headers: new HttpHeaders()
    //         .set('Authorization', `Bearer ${this._token}`)
    //     });
        
    // }
    //how above two are different while using?
    getUserProfile() : Observable<User> {
        this._token = this._authService.getBearerToken();
        return this._http.get<User>(`${this._usersUrl}/profile`, {
            headers: new HttpHeaders()
            .set('Authorization', `Bearer ${this._token}`)
        });
        
    }

    
    addAddressToUser(userId: string, address : Address){
         
        //  this.userById(userId).subscribe( user => {
        //     this.userToUpdate = user;
        //  }

        //  );
        // address.userId = userId;
        // this.userToUpdate.addresses.push(Object.assign({}, address));
        
    }

    addOrderToUser(userId: string, order : Order){

    }
}
