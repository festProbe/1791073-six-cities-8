import { AuthorizationStatus } from '../../const';
import { ActionType } from '../../types/action';
import { makeUserData } from '../../mock/mock';
import { authReducer, initialState } from './auth-reducer';

const mockUserData = makeUserData();

describe('Reducer: authReducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(authReducer(initialState, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  describe('Authorizations action', () => {
    it('shoud update authorization status to AUTH', () => {
      const state = initialState;
      const requireAuthorizationAction = {
        type: ActionType.RequireAuthorization,
        payload: AuthorizationStatus.Auth,
      };
      expect(authReducer(state, requireAuthorizationAction))
        .toEqual({ userInfo: initialState.userInfo, isDataLoaded: true, authorizationStatus: AuthorizationStatus.Auth });
    });

    it('shoud update authorization status to NO_AUTH', () => {
      const state = initialState;
      const requireAuthorizationAction = {
        type: ActionType.RequireAuthorization,
        payload: AuthorizationStatus.NoAuth,
      };
      expect(authReducer(state, requireAuthorizationAction))
        .toEqual({ userInfo: initialState.userInfo, authorizationStatus: AuthorizationStatus.NoAuth, isDataLoaded: true });
    });
  });

  describe('Load user info action', () => {
    it('should change userInfo by a given value', () => {
      const state = initialState;
      const loadUserAction = {
        type: ActionType.LoadUserInfo,
        payload: mockUserData,
      };
      expect(authReducer(state, loadUserAction))
        .toEqual({ authorizationStatus: initialState.authorizationStatus, isDataLoaded: initialState.isDataLoaded, userInfo: mockUserData });
    });
  });

  describe('Logout action', () => {
    it('should update authorization status from AUTH to initialState data if userData is epmty', () => {
      const state = { authorizationStatus: AuthorizationStatus.Auth, isDataLoaded: true, userInfo: initialState.userInfo };
      const requireLogoutAction = {
        type: ActionType.RequireLogout,
      };
      expect(authReducer(state, requireLogoutAction))
        .toEqual(initialState);
    });
    it('should update authorization status from NO_AUTH to initialState data if userData is epmty', () => {
      const state = { authorizationStatus: AuthorizationStatus.NoAuth, isDataLoaded: true, userInfo: initialState.userInfo };
      const requireLogoutAction = {
        type: ActionType.RequireLogout,
      };
      expect(authReducer(state, requireLogoutAction))
        .toEqual(initialState);
    });
    it('should update authorization status from AUTH to initialState data if userData is no empty', () => {
      const state = { authorizationStatus: AuthorizationStatus.Auth, isDataLoaded: true, userInfo: mockUserData };
      const requireLogoutAction = {
        type: ActionType.RequireLogout,
      };
      expect(authReducer(state, requireLogoutAction))
        .toEqual({ authorizationStatus: initialState.authorizationStatus, isDataLoaded: initialState.isDataLoaded, userInfo: mockUserData });
    });
    it('should update authorization status from NO_AUTH to initialState data if userData is no empty', () => {
      const state = { authorizationStatus: AuthorizationStatus.NoAuth, isDataLoaded: true, userInfo: mockUserData };
      const requireLogoutAction = {
        type: ActionType.RequireLogout,
      };
      expect(authReducer(state, requireLogoutAction))
        .toEqual({ authorizationStatus: initialState.authorizationStatus, isDataLoaded: initialState.isDataLoaded, userInfo: mockUserData });
    });
  });
});
