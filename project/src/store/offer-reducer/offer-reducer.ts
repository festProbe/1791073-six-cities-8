import { createReducer } from '@reduxjs/toolkit';
import { OfferReducerState } from '../../types/state';
import { changeFavoriteStatus, checkIsLoadedOffer, loadComments, loadNearby, loadOffer } from '../action';

export const initialState: OfferReducerState = {
  offer: null,
  nearbyOffers: [],
  comments: [],
  isLoaded: false,
  error: '',
};

const offerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(loadNearby, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(changeFavoriteStatus, (state, action) => {
      if (action.payload.id === state.offer?.id) {
        state.offer = action.payload;
      }
      const index = state.nearbyOffers.findIndex((offer) => offer.id === action.payload.id);
      if (index === -1) {
        return;
      }
      state.nearbyOffers = [...state.nearbyOffers.slice(0, index), action.payload, ...state.nearbyOffers.slice(index + 1)];
    })
    .addCase(checkIsLoadedOffer, (state, action) => {
      state.isLoaded = action.payload;
    });
});

export { offerReducer };
