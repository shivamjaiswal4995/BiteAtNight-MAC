import { AddAddressViewComponent } from '../add-address-view/add-address-view.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../../services/router.service';


@Component({
  selector: 'app-add-address-opener',
  templateUrl: './add-address-opener.component.html',
  styleUrls: ['./add-address-opener.component.css']
})

export class AddAddressOpenerComponent implements OnInit {

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute, private _routerService: RouterService) {
    const addressId = this.activatedRoute.snapshot.paramMap.get('addressId');
    this.dialog.open(AddAddressViewComponent, {
      data: {
        addressId: addressId
      }
    }).afterClosed().subscribe(result => {
      this._routerService.routeBack();
    });
  }

  ngOnInit() {
  }

}
