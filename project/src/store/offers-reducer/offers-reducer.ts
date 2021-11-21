import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { OffersReducerState } from '../../types/state';
import { changeFavoriteStatus, chooseCity, getOffersBySortType, getOffersFromChosenCity, getSelectedPlace, loadOffers } from '../action';

const DEFAULT_CITY = 'Paris';

const initialState: OffersReducerState = {
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

const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(chooseCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getSelectedPlace, (state, action) => {
      state.currentPlace = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.allOffers = action.payload;
    })
    .addCase(getOffersFromChosenCity, (state) => {
      state.offers = state.allOffers.filter((offer) => offer.city.name === state.city);
    })
    .addCase(getOffersBySortType, (state, action) => {
      state.offers = sortOffersBySortType(action.payload, state.city, state.allOffers);
    })
    .addCase(changeFavoriteStatus, (state, action) => {
      const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
      state.offers = [...state.offers.slice(0, index), action.payload, ...state.offers.slice(index + 1)];
    });
});

export { offersReducer };
