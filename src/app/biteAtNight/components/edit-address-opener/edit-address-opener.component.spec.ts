import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddressOpenerComponent } from './edit-address-opener.component';

describe('EditAddressOpenerComponent', () => {
  let component: EditAddressOpenerComponent;
  let fixture: ComponentFixture<EditAddressOpenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddressOpenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddressOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
