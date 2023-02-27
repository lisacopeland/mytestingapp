import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DogResponse, DogsService } from '../dogs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  dogImgUrl = '';
  constructor(private fb: FormBuilder, private dogsService: DogsService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    console.log(this.loginForm);
    this.logIt();
  }

  logIt() {
    console.log('hi there!');
    this.dogsService.get().subscribe((response: DogResponse) => {
      // Do something with response
      console.log('got a response ', response);
      this.dogImgUrl = response.message;
    });
  }

}
