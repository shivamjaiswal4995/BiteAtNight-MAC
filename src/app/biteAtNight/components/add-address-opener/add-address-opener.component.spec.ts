import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAddressOpenerComponent } from './add-address-opener.component';

describe('AddAddressOpenerComponent', () => {
  let component: AddAddressOpenerComponent;
  let fixture: ComponentFixture<AddAddressOpenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAddressOpenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAddressOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
