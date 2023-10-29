import { createAction, props } from '@ngrx/store';

import { UserModel } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';

export const fetchUsersListStart = createAction('[Users/fetchUsersListStart]');

export const fetchUsersListPagination = createAction(
  '[Users/fetchUsersListPagination]',
  props<{pageNo: number, pageSize: number}>()
);

export const fetchUsersListPaginationSuccess = createAction(
  '[Users/fetchUsersListPaginationSuccess]',
  props<{response: UserModel[], itemsTotal: number }>()
);

export const fetchUsersListSuccess = createAction(
  '[Users/fetchUsersListSuccess]',
  props<{ response: UserModel[] }>()
);

export const fetchUsersListError = createAction(
  '[Users/fetchUsersListError]',
  props<{ error: HttpErrorResponse }>()
);

export const selectUser = createAction(
  '[Users/selectUser]',
  props<{ userId: number }>()
);

export const addNewUser = createAction(
  '[Users/addNewUser]',
  props<{ NewUserModelData: UserModel }>()
);

export const updateUser = createAction(
  '[Users/updateUser]',
  props<{ updateUserModelData: UserModel }>()
);

export const deleteUser = createAction(
  '[Users/deleteUser]',
  props<{ id: number }>()
);

export const clearUserList = createAction('[Users/ClearUserList]');
