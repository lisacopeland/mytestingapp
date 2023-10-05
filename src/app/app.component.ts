import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthError, selectUserLoggedIn } from './+state/auth.reducers';
import { logOutUserAction } from './+state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'mytestingapp';
  loginStatus = 'Logged Out';
  buttonLabel = 'Log In';
  authErrorMessage = '';

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(logOutUserAction({ payload: {} }));
    this.store.select(selectUserLoggedIn).subscribe((loggedIn) => {
      this.loginStatus = loggedIn ? 'Logged in' : 'Logged out';
      this.buttonLabel = loggedIn ? 'Log out' : 'Log in';
      if (loggedIn) {
        this.router.navigate(['/users']);
      } else {
        this.router.navigate(['/signin']);
      }
    });
    this.store.select(selectAuthError).subscribe((errorMessage) => {
      console.log('got an error ', errorMessage);
      this.authErrorMessage = errorMessage;
      this.router.navigate(['/signin']);
    });
  }

  onChangePassword() {
    this.router.navigate(['/changepassword']);
  }

  onButtonPress() {
    if (this.loginStatus === 'Logged in') {
      this.store.dispatch(logOutUserAction({ payload: {} }));
    } else {
      this.router.navigate(['/signin']);
    }
  }
}
