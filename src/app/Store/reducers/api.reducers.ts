import { createReducer, on } from '@ngrx/store';

import { UserActions } from '../actions';
import { HttpErrorResponse } from '@angular/common/http';

export interface State {
  isLoading: boolean | undefined;
  error: HttpErrorResponse | undefined;
}

export const initialState: State = {
  isLoading: undefined,
  error: undefined,
};

export const apiReducer = createReducer(
  initialState,

  on(UserActions.fetchUsersListStart, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(UserActions.fetchUsersListSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
    };
  }),

  on(UserActions.fetchUsersListError, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  })
);

export const isLoading = (state: State) => state.isLoading;
export const error = (state: State) => state.error;
