 import { Component, OnInit, Inject } from '@angular/core';
import {AddressService} from './../../services/address.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Address} from './../../models/address';

@Component({
  selector: 'app-edit-address-view',
  templateUrl: './edit-address-view.component.html',
  styleUrls: ['./edit-address-view.component.css']
})
export class EditAddressViewComponent implements OnInit {

  address : Address;
  selected : string;
  addressTypes = [
    {value: 'home-0', viewValue: 'Home'},
    {value: 'office-1', viewValue: 'Office'},
    {value: 'other-2', viewValue: 'Other'}
  ];

  constructor(private dialogRef: MatDialogRef<EditAddressViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, private _addressService: AddressService) {}

  ngOnInit() {
    this.address = this._addressService.getAddressByAddressIdOfUser(this.data.addressId);
    console.log(`Before Editing: ${this.address.houseNo}, ${this.address.area}, ${this.address.city}, ${this.address.landmark}, ${this.address.type}`)
    this.selected = this.address.type;
  }
  editAddress(){
    this.address.type = this.selected;
    console.log(`After Editing: ${this.address.houseNo}, ${this.address.area}, ${this.address.city}, ${this.address.landmark}, ${this.address.type}`);
   this._addressService.updateAddress(this.address);
  //  .subscribe(editedNote => {
  //    if (editedNote.groupId) {
  //      this._groupService.updateNoteOfGroup(editedNote.groupId, editedNote);
  //    }
  //    this.dialogRef.close();
  //  }, err => {
  //    console.log(`Error while editing the note: ${err}`);
  //  });
  // Case1 - what if there is no return type and i got an error while executing a function..write a callback function for it..
  }
}
