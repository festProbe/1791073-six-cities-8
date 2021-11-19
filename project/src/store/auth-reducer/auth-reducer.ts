import { ActionType, Actions } from '../../types/action';
import { AuthReducerState } from '../../types/state';
import { AuthorizationStatus } from '../../const';

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const authReducer = (state: AuthReducerState = initialState, action: Actions): AuthReducerState => {
  switch (action.type) {
    case ActionType.RequireAuthorization:
      return { ...state, authorizationStatus: action.payload, isDataLoaded: true };
    case ActionType.RequireLogout:
      return initialState;
    default:
      return state;
  }
};

export { authReducer };
