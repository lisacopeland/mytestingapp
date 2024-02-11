import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  changePasswordAction,
  loginAction,
  logOutUserAction,
  setAuthErrorAction,
  setPassword,
  setUserAction,
  signupUserAction,
  userSignedupAction,
} from './auth.actions';

export const defaultPassword = 'test123';
export const AUTH_FEATURE_KEY = 'auth';
export interface AuthState {
  email: string;
  authError: string;
  userLoggedIn: boolean;
  currentPassword: string;
}

const initialState: AuthState = {
  email: null,
  authError: null,
  userLoggedIn: false,
  currentPassword: defaultPassword,
};

export const authReducer = createReducer(
  initialState,
  on(loginAction, (state, action) => {
    const newState = initialState;
    return newState;
  }),

  on(setUserAction, (state, action) => {
    const newState = {
      ...state,
      email: action.payload.email,
      authError: null,
      userLoggedIn: true,
    };
    return newState;
  }),
  on(setPassword, (state, action) => {
    const newState = { ...state, currentPassword: action.payload.password };
    return newState;
  }),
  on(setAuthErrorAction, (state, action) => {
    const newState = { ...state, authError: action.payload.error };
    return newState;
  }),
  on(signupUserAction, (state, action) => {
    const newState = initialState;
    return newState;
  }),
  on(userSignedupAction, (state, action) => {
    const newState = {
      ...state,
      email: action.payload.email,
      userLoggedIn: true,
    };
    return newState;
  }),
  on(logOutUserAction, (state, action) => {
    const newState = { ...state, email: null, userLoggedIn: false };
    return newState;
  })
);

export const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectAll = createSelector(
  getAuthState,
  (state: AuthState) => state
);

export const selectUserLoggedIn = createSelector(
  selectAll,
  (state) => state.userLoggedIn
);

export const selectUserPassword = createSelector(
  selectAll,
  (state) => state.currentPassword
);

export const selectUserEmail = createSelector(
  selectAll,
  (state) => state.email
);

export const selectAuthError = createSelector(
  selectAll,
  (state) => state.authError
);
