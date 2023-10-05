import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";

import { UsersService } from "../users.service";

import { createUserAction, deleteUserAction, loadUsersAction, setUsersAction,
         UserCreatedAction, UserDeletedAction, UserUpdatedAction, updateUserAction } from "./todo-item.actions";

@Injectable()
export class UsersEffects {
    concurrentRequests = 5;

    constructor(
        public service: UsersService,
        public actions$: Actions
    ) { }

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUsersAction),
            mergeMap((action) => {
                return this.service.query(action.search, action.index).pipe(
                    map((response) => {
                        return setUsersAction({ payload: response });
                    })
                );
            }, this.concurrentRequests)
        )
    );

    createUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createUserAction),
            mergeMap((action) => {
                return this.service.create(action.payload).pipe(
                    map((response) => {
                        return UserCreatedAction({ payload: { User: response }});
                    })
                );
            }, this.concurrentRequests)
        )
    );
    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateUserAction),
            mergeMap((action) => {
                return this.service.update(action.changes).pipe(
                    map((response) => {
                        return UserUpdatedAction({ payload: { changes: response } });
                    })
                );
            }, this.concurrentRequests)
        )
    );
    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteUserAction),
            mergeMap((action) => {
                return this.service.delete('Lisa', action.id).pipe(
                    map((response) => {
                        return UserDeletedAction({ payload: { id: action.id } });
                    })
                );
            }, this.concurrentRequests)
        )
    );
}