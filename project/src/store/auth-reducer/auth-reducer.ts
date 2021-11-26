import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { AuthReducerState } from '../../types/state';
import { loadUser, requireAuthorization, requireLogout } from '../action';

export const initialState: AuthReducerState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: {
    avatarUrl: '',
    email: '',
    id: 0,
    isPro: false,
    name: '',
    token: '',
  },
  isDataLoaded: false,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadUser, (state, action) => {
      state.userInfo = action.payload;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = initialState.authorizationStatus;
      state.isDataLoaded = initialState.isDataLoaded;
    });
});

export { authReducer };
