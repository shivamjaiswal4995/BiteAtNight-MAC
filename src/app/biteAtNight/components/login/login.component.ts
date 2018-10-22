import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterService } from '../../services/router.service';
import { User } from '../../models/user';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from '../../services/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private _authService: AuthenticationService,
    private _routerService: RouterService,
    private _toastrService: ToastrService) { }

  user: User;
  userNameError = new FormControl('', [Validators.required]);
  passwordError = new FormControl('', [Validators.required]);
  userEmailError = new FormControl('', [Validators.required]);
  contactNoError = new FormControl('',[Validators.required]);
  //10 digit contactNo should be present.
  //TODO in placeholder a message should be displayed"10 digit contactNo."..
  //TODO unique contactNo. and unique emailId should be there... otherwise a errormessage should be displayed
  // like "ContactNo. already registered or emailId already registered"..

  ngOnInit() {
    this.user = new User();
    console.log("login component");
  }

  signIn() {
    // console.log(this.user);
    if (this.user.userEmail && this.user.password) {
      const userObj = {
        userEmail: this.user.userEmail,
        password: this.user.password
      };
        //when user sign in, a permanent message of referral code should be displayed in bottom.
                //it should be the expansion panel in bottom, once expanded whole description of referal
                // should be there.

      this._authService.authenticateUser(userObj).subscribe (
        userDetails => {
          if (userDetails) {
            this._authService.saveUserDetails(userDetails);
            this._routerService.routeToHome();
          }
        }
        //this err would be returned by server while using signIn function.
      , err => {
        console.log('Error while signing in: ', err)
        this._toastrService.error(err.error.message);
      }
    );
    } else {
      console.log('Invalid username or password');
    }
  }

  signUp() {
    if (this.user.userName && this.user.userEmail && this.user.password && this.user.contactNo) {
      const userObj = {
        userName: this.user.userName,
        userEmail: this.user.userEmail,
        password: this.user.password,
        contact: this.user.contactNo
      };

      // this._authService.findUserByEmail(userObj.userEmail).subscribe(

      // );
      // this._authService.findUserByContactNo(userObj.contactNo).subscribe(
        
      // );
      this._authService.registerUser(userObj).subscribe(
            userDetails => {
              if (userDetails) {
                // const title = 'Signed up successfully!';
                // const message = 'Have a delicious Meal!';
          //when user sign in, a permanent message of referral code should be displayed in bottom.
            //it should be the expansion panel in bottom, once expanded whole description of referal
                // should be there.
               // this._toastrService.success(message, title);
                this._authService.saveUserDetails(userDetails);
                this._routerService.routeToHome();
              }
        }, err => console.log('Error while registering user: ', err)
      );
    } else {
      console.log('Please provide all the details!');
    }
  }

  getErrorMessageForUsername() {
    return this.userNameError.hasError('required') ? 'You must enter a valid username' : '';
  }

  getErrorMessageForUserEmail() {
    return this.userEmailError.hasError('required') ? 'You must enter a valid EmailId' : '';
  }

  getErrorMessageForPassword() {
    return this.passwordError.hasError('required') ? 'You must enter a valid password' : '';
  }

  getErrorMessageForContactNo(){
    return this.contactNoError.hasError('required') ? 'You must enter a valid contactNo' : '';
  }
// tslint:disable-next-line:eofline
}
