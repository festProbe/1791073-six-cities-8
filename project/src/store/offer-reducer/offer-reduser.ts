import { Actions, ActionType } from '../../types/action';
import { OfferReducerState } from '../../types/state';

const initialState = {
  offer: null,
  nearbyOffers: [],
  comments: [],
  isLoaded: false,
  error: '',
};

const offerReducer = (state: OfferReducerState = initialState, action: Actions): OfferReducerState => {
  switch (action.type) {
    case ActionType.LoadOffer:
      return { ...state, offer: action.payload };
    case ActionType.LoadNearby:
      return { ...state, nearbyOffers: action.payload };
    case ActionType.LoadComments:
      return { ...state, comments: action.payload };
    case ActionType.LoadOfferError:
      return { ...state, error: action.payload };
    case ActionType.CheckIsLoadedOffer:
      return { ...state, isLoaded: action.payload };
    default:
      return state;
  }
};

export { offerReducer };
