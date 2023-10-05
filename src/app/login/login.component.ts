import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DogResponse, DogsService } from '../dogs.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginAction } from '../+state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  dogImgUrl = '';
  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.loginForm);
    this.login();
  }

  login() {
    this.store.dispatch(
      loginAction({
        payload: {
          email: this.loginForm.value.username,
          password: this.loginForm.value.password,
        },
      })
    );
  }

  logIt() {}
}
