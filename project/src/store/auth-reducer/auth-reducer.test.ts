import { AuthorizationStatus } from '../../const';
//import { makeFakeUserData } from '../../mock/mock';
import { AuthReducerState } from '../../types/state';
import { authReducer } from './auth-reducer';


const initialState: AuthReducerState = {
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

//const mockUserData = makeFakeUserData();

describe('Reducer: authReducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(authReducer(initialState, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });
});
