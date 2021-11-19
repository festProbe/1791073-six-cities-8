import { Actions, ActionType } from '../../types/action';
import { Offer } from '../../types/offer';
import { OffersReducerState } from '../../types/state';

const DEFAULT_CITY = 'Paris';

const initialState = {
  city: DEFAULT_CITY,
  currentPlace: null,
  allOffers: [],
  offers: [],
};

const sortOffersBySortType = (sortType: string, city: string | null, allOffers: Offer[]) => {
  const sortedOffers = allOffers.filter((offer) => offer.city.name === city);
  switch (sortType) {
    case 'Price: low to high':
      return sortedOffers.sort((a, b) => a.price - b.price);
    case 'Price: high to low':
      return sortedOffers.sort((a, b) => b.price - a.price);
    case 'Top rated first':
      return sortedOffers.sort((a, b) => b.rating - a.rating);
    default:
      return allOffers.filter((offer) => offer.city.name === city);
  }
};

const offersReducer = (state: OffersReducerState = initialState, action: Actions): OffersReducerState => {
  switch (action.type) {
    case ActionType.ChooseCity:
      return { ...state, city: action.payload };
    case ActionType.SelectCurrentPlace:
      return { ...state, currentPlace: action.payload };
    case ActionType.OffersFromChosenCity:
      return { ...state, offers: state.allOffers.filter((offer) => offer.city.name === state.city) };
    case ActionType.OffersBySortType:
      return { ...state, offers: sortOffersBySortType(action.payload, state.city, state.allOffers) };
    case ActionType.LoadOffers: {
      const { allOffers } = action.payload;
      return { ...state, allOffers };
    }
    default:
      return state;
  }
};

export { offersReducer };
