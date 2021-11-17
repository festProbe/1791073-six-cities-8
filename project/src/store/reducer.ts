import { AuthorizationStatus } from '../const';
import { Actions, ActionType } from '../types/action';
import { Offer } from '../types/offer';
import { State } from '../types/state';

const DEFAULT_CITY = 'Paris';

const initialState = {
  city: DEFAULT_CITY,
  currentPlace: null,
  map: null,
  allOffers: [],
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const sortOffersBySortType = (sortType: string, city: string | null) => {
  const offers: Offer[] = [];
  return offers;
  /*const sortedOffers = offers.filter((offer) => offer.city.name === city);
  switch (sortType) {
    case 'Price: low to high':
      return sortedOffers.sort((a, b) => a.price - b.price);
    case 'Price: high to low':
      return sortedOffers.sort((a, b) => b.price - a.price);
    case 'Top rated first':
      return sortedOffers.sort((a, b) => b.rating - a.rating);
    default:
      return offers.filter((offer) => offer.city.name === city);
  }*/
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChooseCity:
      return { ...state, city: action.payload };
    case ActionType.SelectedCurrentPlace:
      return { ...state, currentPlace: action.payload };
    case ActionType.OffersFromChosenCity:
      return { ...state, offers: state.allOffers.filter((offer) => offer.city.name === state.city) };
    case ActionType.OffersBySortType:
      return { ...state, offers: sortOffersBySortType(action.payload, state.city) };
    case ActionType.LoadOffers: {
      const { allOffers } = action.payload;
      return { ...state, allOffers };
    }
    case ActionType.RequireAuthorization:
      return { ...state, authorizationStatus: action.payload, isDataLoaded: true };
    case ActionType.RequireLogout:
      return { ...state, authorizationStatus: AuthorizationStatus.NoAuth };
    default:
      return state;
  }
};

export { reducer };
