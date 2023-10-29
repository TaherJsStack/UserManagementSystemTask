import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { UserActions } from '../actions';
import { UserModel } from '../../models/user';

export interface State extends EntityState<UserModel> {
  selectedUserId: number | string | any | undefined;
  pageNo: number | string | any | undefined;
  pageSize: number | string | any | undefined;
  totalItems: number | string | any | undefined;
}

export const adapter: EntityAdapter<UserModel> = createEntityAdapter<UserModel>(
  {
    selectId: (x) => x.id,
    sortComparer: false,
  }
);

const initialState: State = adapter.getInitialState({
  selectedUserId: undefined,
  pageNo: undefined,
  pageSize: undefined,
  totalItems: undefined,
});

export const userReducer = createReducer(
  initialState,
  on(UserActions.fetchUsersListSuccess, (state, { response }) => {
    return adapter.setAll(response, state);
  }),
 
  on(UserActions.fetchUsersListPagination, (state, {pageNo, pageSize }) => {
    return {
      ...state,
      pageNo, 
      pageSize
    };
  }),
  on(UserActions.selectUser, (state, { userId }) => {
    return {
      ...state,
      selectedUserId: userId,
    };
  }),
  on(UserActions.addNewUser, (state, { NewUserModelData }) => {
    return adapter.addOne(NewUserModelData, state);
  }),
  on(UserActions.updateUser, (state, { updateUserModelData }) => {
    return adapter.updateOne(
      { id: updateUserModelData.id, changes: updateUserModelData },
      state
    );
  }),
  on(UserActions.deleteUser, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(UserActions.clearUserList, (state) => {
    return adapter.removeAll({ ...state, selectedUserId: null });
  })
);

export const selectedId       = (state: State) => state.selectedUserId;
export const selectedIdPag    = (state: State) => state.entities;
export const selectedpageNo   = (state: State) => state.pageNo;
export const selectedpageSize = (state: State) => state.pageSize;

