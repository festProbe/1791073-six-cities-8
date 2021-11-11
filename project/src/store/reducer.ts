import { generateOffer } from '../mocks/offer';
import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';

const OFFERS_COUNT = 4;
const DEFAULT_CITY = 'Amsterdam';
const offers = new Array(OFFERS_COUNT).fill('').map((el, index: number) => generateOffer(index));

const initialState = {
  city: DEFAULT_CITY,
  offers: offers.filter((offer) => offer.city.name === DEFAULT_CITY),
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChooseCity:
      return { ...state, city: action.payload };
    case ActionType.OffersFromChosenCity:
      return { ...state, offers: offers.filter((offer) => offer.city.name === state.city) };
    default:
      return state;
  }
};

export { reducer };
