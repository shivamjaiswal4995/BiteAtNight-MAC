import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { MaterialModule } from './../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AddressService } from './services/address.service';
import {ItemsService} from './services/item.service';
import { OfferService }from './services/offer.service';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { CategoryViewComponent } from './components/category-view/category-view.component';
import { UserService } from './services/user.service';
import { ToastrService } from './services/toastr.service';
import{ BiteAtNightComponent } from './biteAtNight.component';
import { OfferComponent } from './components/offer/offer.component';
import { PreviousOrderComponent } from './components/previous-order/previous-order.component';
import { AddressComponent } from './components/address/address.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import {FaqComponent} from './components/faq/faq.component';
import {CartComponent} from './components/cart/cart.component';
import { OrderService } from './services/order.service';
import {HomeComponent} from './components/home/home.component';
import {ItemViewComponent} from './components/item-view/item-view.component';
import {CartService} from './services/cart.service';
import { EditAddressOpenerComponent } from './components/edit-address-opener/edit-address-opener.component';
import { EditAddressViewComponent } from './components/edit-address-view/edit-address-view.component';
import { AddAddressOpenerComponent } from './components/add-address-opener/add-address-opener.component';
import { AddAddressViewComponent } from './components/add-address-view/add-address-view.component';

const routes: Routes  = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: BiteAtNightComponent,
     children: [
         {
             path: '', redirectTo: 'categoriesview', pathMatch: 'full'
           },
        {
         path: 'categoriesview', component: CategoryViewComponent
       },
         {
           path: 'myaccount', component: MyAccountComponent,
           children: [
            {
              path: 'previousorders' , component : PreviousOrderComponent
            },
            {
              path : 'offers' , component : OfferComponent
            },
            // {
            //   path : 'payment' , component : PaymentComponet
            // }
            {
              path : 'addresses', component : AddressComponent
            }
           ]
         },
         {
           path : 'cart' , component : CartComponent
         },

       { 
         path: 'faq', component: FaqComponent
         },
         {
           path: 'address/:addressId/edit', component : EditAddressOpenerComponent,
           outlet: 'addressEditOutlet'

         }
         
     ]
  },
  { path: '', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    CommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [

    BiteAtNightComponent,
    HomeComponent,
    ToolBarComponent,
    LoginComponent,
    OfferComponent,
    PreviousOrderComponent,
    AddressComponent,
    CartComponent,
    FaqComponent,
    MyAccountComponent,
    CategoryViewComponent,
    ItemViewComponent,
    EditAddressOpenerComponent,
    EditAddressViewComponent,
    AddAddressOpenerComponent,
    AddAddressViewComponent
  ],
 
  providers: [
    AddressService,
    AuthenticationService,
    RouterService,
    OfferService,
    OrderService,
    UserService,
    ToastrService,
    ItemsService,
    CartService
  ]
})
export class biteAtNightModule {
  ngOnInit(){
    console.log("biteatnightmodule");
  }
 }
