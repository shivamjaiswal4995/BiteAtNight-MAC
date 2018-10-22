import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAddressViewComponent } from './add-address-view.component';

describe('AddAddressViewComponent', () => {
  let component: AddAddressViewComponent;
  let fixture: ComponentFixture<AddAddressViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAddressViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAddressViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
