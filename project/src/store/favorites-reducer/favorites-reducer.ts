
import { createReducer } from '@reduxjs/toolkit';
import { FavoriteReducerState } from '../../types/state';
import { changeFavoriteStatus, checkFavoritesIsLoading, loadFavorites } from '../action';

const initialState: FavoriteReducerState = {
  offers: [],
  isLoading: false,
};

const favoriteReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFavorites, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(checkFavoritesIsLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(changeFavoriteStatus, (state, action) => {
      const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
      state.offers = [...state.offers.slice(0, index), action.payload, ...state.offers.slice(index + 1)];
    });
});

export { favoriteReducer };
