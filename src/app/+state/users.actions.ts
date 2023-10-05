import { createAction, props } from '@ngrx/store';
import { User } from '../users.model';

// TODO: Implement an error popup

export const loadUsersAction = createAction(
  'Users: Load All',
  props<{ search: Partial<User>; index: string }>()
);
export const setUsersAction = createAction(
  'Users: Set All',
  props<{ payload: User[] }>()
);
export const setCurrentUserAction = createAction(
  'Users: Set Current',
  props<{ id: string }>()
);
export const createUserAction = createAction(
  'Users: Create',
  props<{ payload: User }>()
);
export const UserCreatedAction = createAction(
  'Users: Created',
  props<{ payload: { User: User } }>()
);
export const updateUserAction = createAction(
  'Users: Update',
  props<{ changes: User }>()
);
export const UserUpdatedAction = createAction(
  'Users: Updated',
  props<{ payload: { changes: Partial<User> } }>()
);
export const deleteUserAction = createAction(
  'Users: Delete',
  props<{ id: string }>()
);
export const UserDeletedAction = createAction(
  'Users: Deleted',
  props<{ payload: { id: string } }>()
);
