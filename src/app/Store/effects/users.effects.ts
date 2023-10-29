import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersState, userEntities } from '../reducers';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';

import { UserActions } from '../actions';
import { UsersService } from 'src/app/service/user/users.service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { UserModel } from 'src/app/models/user';

@Injectable()
export class UsersEffects {
  constructor(
    private usersService: UsersService,
    private action$: Actions,
    private store: Store<UsersState>
  ) {}

  fetchUserList$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(UserActions.fetchUsersListStart),
        withLatestFrom(this.store.select(userEntities)),

        exhaustMap(([action, data]) => {

          return this.usersService.getList()
          .pipe(
            map((userList: UserModel[]) => {
              let response = userList.map((item, index) => {
                return {
                  ...item,
                  name:          `name ${index}`,
                  email:         `email@email${index}.com`,
                  password:      'string',
                  role:          1,
                  permeation:    [1],
                  phone:         Number('01155721425'),
                  activestate:   true,
                  governorate:   `governorate ${index}`,
                  city:          `city ${index}`,
                  area:          `area ${index}`,
                  floorNo:       `floorNo ${index}`,
                  streetNo:      `streetNo ${index}`,
                  buildingNo:    `buildingNo ${index}`,
                  apartmentNo:   `apartmentNo ${index}`,
                  createdAt:     `${Date.now()}`,
                  updatedAt:     `${Date.now()}`,
                }
              });
              return UserActions.fetchUsersListSuccess({ response });
            }),

            catchError((error) => {
              return of(UserActions.fetchUsersListError({ error }));
            })
          );
        })
      ),
    { dispatch: true }
  );

}
