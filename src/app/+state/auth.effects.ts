import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import { mergeMap, map, withLatestFrom, switchMap } from 'rxjs';
import {
  changePasswordAction,
  checkLoginState,
  confirmSignupUserAction,
  loadInitialPassword,
  loginAction,
  logOutUserAction,
  setAuthErrorAction,
  setPassword,
  setUserAction,
  signedupConfirmedAction,
  signupUserAction,
  userSignedupAction,
} from './auth.actions';
import { defaultPassword, selectUserPassword } from './auth.reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  concurrentRequests = 5;

  constructor(
    public service: AuthService,
    public actions$: Actions,
    private store: Store
  ) {}

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      withLatestFrom(this.store.select(selectUserPassword)),
      switchMap(([action, password]) => {
        return this.service
          .signIn(action.payload.email, action.payload.password)
          .pipe(
            map((response) => {
              console.log('response from query : ', response);
              if (response === password) {
                return setUserAction({
                  payload: { email: action.payload.email },
                });
              } else {
                return setAuthErrorAction({
                  payload: { error: 'incorrect password' },
                });
              }
            })
          );
      })
    )
  );

  loadInitialPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadInitialPassword),
      mergeMap((action) => {
        return this.service.getPassword().pipe(
          map((response) => {
            const newPassword =
              response === null || response === '' ? defaultPassword : response;
            return setPassword({
              payload: {
                password: newPassword,
              },
            });
          })
        );
      }, this.concurrentRequests)
    )
  );

  setCurrentPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changePasswordAction),
      mergeMap((action) => {
        return this.service.changePassword(action.payload.password).pipe(
          map((response) => {
            return setPassword({
              payload: {
                password: response,
              },
            });
          })
        );
      }, this.concurrentRequests)
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupUserAction),
      mergeMap((action) => {
        return this.service
          .signUp(action.payload.email, action.payload.password)
          .pipe(
            map((response) => {
              console.log('response from query : ', response);
              if (response) {
                return userSignedupAction({
                  payload: { email: action.payload.email },
                });
              } else {
                return setAuthErrorAction({ payload: { error: 'error' } });
              }
            })
          );
      }, this.concurrentRequests)
    )
  );

  confirmSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(confirmSignupUserAction),
      mergeMap((action) => {
        return this.service
          .confirmSignUp(action.payload.email, action.payload.confirmationCode)
          .pipe(
            map((response) => {
              console.log('response from query : ', response);
              if (response) {
                return signedupConfirmedAction({
                  payload: { email: action.payload.email },
                });
              } else {
                return setAuthErrorAction({ payload: { error: 'error' } });
              }
            })
          );
      }, this.concurrentRequests)
    )
  );
}
