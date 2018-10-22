import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddressViewComponent } from './edit-address-view.component';

describe('EditAddressViewComponent', () => {
  let component: EditAddressViewComponent;
  let fixture: ComponentFixture<EditAddressViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddressViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddressViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
