import { createReducer } from '@reduxjs/toolkit';
import { OfferReducerState } from '../../types/state';
import { checkIsLoadedOffer, loadComments, loadNearby, loadOffer, showLoadOfferError } from '../action';

const initialState: OfferReducerState = {
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
    .addCase(showLoadOfferError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(checkIsLoadedOffer, (state, action) => {
      state.isLoaded = action.payload;
    });
});

export { offerReducer };
