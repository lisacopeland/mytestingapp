import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { changePasswordAction } from '../+state/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    console.log(this.form);
    this.store.dispatch(
      changePasswordAction({
        payload: {
          password: this.form.value.password,
        },
      })
    );
    this.router.navigate(['/users']);
  }
}
