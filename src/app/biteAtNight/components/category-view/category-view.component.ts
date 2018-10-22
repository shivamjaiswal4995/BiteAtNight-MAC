import { Component, OnInit, Injectable } from '@angular/core';
import { ItemsService } from '../../services/item.service';
import {Item} from '../../models/item';

export interface itemByCategoryObject {
  _id : {
    category : string;
  }
  items : Array<Item>;
}
@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {
  
  itemsByCategory : Array<itemByCategoryObject>;

  constructor(private _itemsService : ItemsService) { }

  ngOnInit() {
    this._itemsService.getItemsByCatgory().subscribe(
      data => {
        this.itemsByCategory = data;
  },
  err => {
    console.log("Error while fetching items by category from database");
  }
  );

}
}