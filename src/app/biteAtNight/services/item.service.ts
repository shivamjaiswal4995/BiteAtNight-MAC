import { AuthenticationService } from './authentication.service';
import { Item } from '../models/item';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import { itemByCategoryObject } from '../components/category-view/category-view.component';

export interface itemsByCategoryObject {
    _id : {
        category : string;
      }
      items : Array<Item>;
}
@Injectable()
export class ItemsService {
    private _itemsUrl: string;
    private _token: string;
    private items: Array<Item>;
    private itemsByCategory: Array<itemsByCategoryObject>;
    itemsByCategorySubject: BehaviorSubject<Array<itemsByCategoryObject>>;
    itemsSubject: BehaviorSubject<Array<Item>>;

    constructor(private _http: HttpClient, private _authService: AuthenticationService){

        this._itemsUrl = 'api/v1/items';
        this.items = [];
        this.itemsByCategory = [];
        this.itemsSubject = new BehaviorSubject(this.items);
        this.itemsByCategorySubject = new BehaviorSubject(this.itemsByCategory);
        this.fetchAllItemsByCategory();
//single method would be called on clientt side, while when we call it on admin side
//all items would be displayedand below each item, two buttons will be available - delete and edit items.
//thus fetchAllitems() will always be called.
//in same page, at bottom of page addItem button will be there.
    }

    fetchAllItemsByCategory(){
        this._token = this._authService.getBearerToken();
        this._http.get<itemsByCategoryObject[]>(`${this._itemsUrl}/byCategory`, {
            headers: new HttpHeaders()
            .set('Authorization', `Bearer ${this._token}`)
        })
        //.catch(this.handleError)
        //subscribing as this._http.get method return observable.
        .subscribe(objects => {
            console.log(objects);
            this.itemsByCategory = objects;
            this.itemsByCategorySubject.next(this.itemsByCategory);
        });
    }

    getItemsByCatgory() : Observable<itemsByCategoryObject[]>{
        return this.itemsByCategorySubject;
    }

    addItem(data : Item) : Observable<Item>{
        return this._http.post<Item>(this._itemsUrl, data, {
            headers: new HttpHeaders()
            .set('Authorization', `Bearer ${this._token}`)
        }).do(addedItem => {
            this.items.push(addedItem);
            this.itemsSubject.next(this.items);
        })
        //.catch(this.handleError);
    }

    updateItem(data : Item) : Observable<Item>{
        const item = this.items.find(item => item.itemId === data.itemId);
        Object.assign(item, data);
        //shouldnt we push modified data in items? 
        this.itemsSubject.next(this.items);

        return this._http.put<Item>(`${this._itemsUrl}/${data.itemId}`, data, {
            headers: new HttpHeaders()
            .set('Authorization', `Bearer ${this._token}`)
        })
        //.catch(this.handleError);
    }

    deleteItem(itemId): Observable<Item>{
        const item = this.items.find(item => item.itemId === itemId);
        const index = this.items.findIndex(item => item.itemId === itemId);
        this.items.splice(index, 1);//what is use of splice?
        return this._http.delete<Item>(`${this._itemsUrl}/${itemId}`,{
            headers: new HttpHeaders()
            .set('Authorization', `Bearer ${this._token}`)
        })
        // .catch(this.handleError);

    }
}
