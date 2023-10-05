import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth.reducers';
import { usersReducer, UsersState } from './users.reducer';

interface AppState {
  authState: AuthState;
  userState: UsersState;
}

export const reducers: ActionReducerMap<AppState> = {
  authState: authReducer,
  userState: usersReducer,
};
