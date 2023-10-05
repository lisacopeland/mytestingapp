import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import {
  loadUsersAction,
  setUsersAction,
  UserCreatedAction,
  setCurrentUserAction,
  UserUpdatedAction,
  UserDeletedAction,
} from './users.actions';
import { User, mapToUser, mapToUsers } from '../users.model';

export interface UsersState {
  Users: User[];
  current: string;
  currentUser: User;
  UsersLoaded: boolean;
}

const initialState: UsersState = {
  current: '',
  currentUser: null,
  Users: [],
  UsersLoaded: false,
};

export const USERS_FEATURE_KEY = 'Users';

export const usersReducer = createReducer(
  initialState,
  on(loadUsersAction, (state, action) => {
    const newState = initialState;
    return newState;
  }),
  on(setUsersAction, (state, action) => {
    console.log('setting Users action!');
    const newState = {
      ...state,
      Users: mapToUsers(action.payload),
      UsersLoaded: true,
    };
    return newState;
  }),
  on(UserCreatedAction, (state, action) => {
    const Users = [...state.Users];
    Users.push(mapToUser(action.payload.User));
    const newState = { ...state, Users: Users };
    return newState;
  }),
  on(setCurrentUserAction, (state, action) => {
    let newState = { ...state };
    const idx = state.Users.findIndex((x) => x.id === action.id);
    if (idx !== -1) {
      const currentUser = mapToUser(state.Users[idx]);
      const Users = [...state.Users];
      Users[idx] = currentUser;
      newState = {
        ...state,
        Users: Users,
        currentUser: currentUser,
        current: action.id,
      };
      return newState;
    } else {
      return newState;
    }
  }),
  on(UserUpdatedAction, (state, action) => {
    const Users = [...state.Users];
    const idx = Users.findIndex((x) => x.id === action.payload.changes.id);
    const newItem = mapToUser(action.payload.changes);
    const updatedUser = new User({
      ...state.Users[idx],
      ...newItem,
    });
    Users.splice(idx, 1, updatedUser);
    const newState = { ...state, Users: Users };
    return newState;
  }),
  on(UserDeletedAction, (state, action) => {
    const Users = [...state.Users];
    const idx = Users.findIndex((x) => x.id === action.payload.id);
    Users.splice(idx, 1);
    const newState = { ...state, Users: Users };
    return newState;
  })
);

export const getUsersState =
  createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const selectAll = createSelector(
  getUsersState,
  (state: UsersState) => state
);

export const selectAllUsers = createSelector(selectAll, (state) =>
  mapToUsers(state.Users)
);

export const selectUsersLoaded = createSelector(
  selectAll,
  (state) => state.UsersLoaded
);

export const selectCurrentUser = createSelector(
  selectAll,
  (state) => state.currentUser
);
