import { generateOffer } from '../mocks/offer';
import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';

const OFFERS_COUNT = 4;
const DEFAULT_CITY = 'Paris';
const offers = new Array(OFFERS_COUNT).fill('').map((el, index: number) => generateOffer(index));

const initialState = {
  city: DEFAULT_CITY,
  offers: offers.filter((offer) => offer.city.name === DEFAULT_CITY),
};

const sortOffersBySortType = (sortType: string, city: string | null) => {
  const sortedOffers = offers.filter((offer) => offer.city.name === city);
  switch (sortType) {
    case 'Price: low to high':
      return sortedOffers.sort((a, b) => a.price - b.price);
    case 'Price: high to low':
      return sortedOffers.sort((a, b) => b.price - a.price);
    case 'Top rated first':
      return sortedOffers.sort((a, b) => b.rating - a.rating);
    default:
      return offers.filter((offer) => offer.city.name === city);
  }
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChooseCity:
      return { ...state, city: action.payload };
    case ActionType.OffersFromChosenCity:
      return { ...state, offers: offers.filter((offer) => offer.city.name === state.city) };
    case ActionType.OffersBySortType:
      return { ...state, offers: sortOffersBySortType(action.payload, state.city) };
    default:
      return state;
  }
};

export { reducer };
