
import { createReducer } from '@reduxjs/toolkit';
import { FavoriteReducerState } from '../../types/state';
import { changeFavoriteStatus, loadFavorites } from '../action';

export const initialState: FavoriteReducerState = {
  offers: [],
};

const favoriteReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFavorites, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeFavoriteStatus, (state, action) => {
      const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
      state.offers = [...state.offers.slice(0, index), action.payload, ...state.offers.slice(index + 1)];
    });
});

export { favoriteReducer };
