import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RouterService } from '../../services/router.service';
import{ AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();
  private _userName: string; //TODO add a userName property in userSchema..

  constructor(private _router: RouterService,
  private _authService: AuthenticationService) {
    this._userName = '';
   }

  ngOnInit() {
    this._userName= this._authService.getUserName();
    //TODO add getUserName method in authentication service.
  }

  showAllItems(){
    this._router.routeToHome();
    //TODO add returnToHomePage method in routerService.
  }

  logout(): void {
    this._authService.logOut();
    this._router.routeToLogin();
    //TODO add both above methods in respective services.
  }

  showCart(){
    this._router.routeToCart();
  }

  showFaqs(){
    this._router.routeToFaqs();
  }

  showMyAccount(){
    this._router.routeToMyAccountPage();
  }


}
