import { EditAddressViewComponent } from '../edit-address-view/edit-address-view.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-edit-address-opener',
  templateUrl: './edit-address-opener.component.html',
  styleUrls: ['./edit-address-opener.component.css']
})
export class EditAddressOpenerComponent implements OnInit {

  constructor(private dialog: MatDialog, private activatedRoute: ActivatedRoute, private _routerService: RouterService) {
    const addressId = this.activatedRoute.snapshot.paramMap.get('addressId');
    this.dialog.open(EditAddressViewComponent, {
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
