import { favoriteReducer, initialState } from './favorites-reducer';
import { makeOffer } from '../../mock/mock';
import { Offer } from '../../types/offer';
import { ActionType } from '../../types/action';

const offersMock: Offer[] = new Array(3).fill(makeOffer());

describe('Reducer: favoriteReducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(favoriteReducer(initialState, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  describe('loadFavorites action', () => {
    it('should update offers by a given value', () => {
      const state = initialState;
      const loadFavoritesAction = {
        type: ActionType.LoadFavorites,
        payload: offersMock,
      };
      expect(favoriteReducer(state, loadFavoritesAction))
        .toEqual({ offers: offersMock });
    });
  });

  describe('changeFavoriteStatus action', () => {
    it('should update state by offer which has changed favorite status', () => {
      const state = { offers: offersMock };
      const newOffer = { ...offersMock[0], isFavorite: !offersMock[0].isFavorite };
      const changeFavoriteStatus = {
        type: ActionType.ChangeFavoriteStatus,
        payload: newOffer,
      };
      expect(favoriteReducer(state, changeFavoriteStatus))
        .toEqual({ offers: [newOffer, ...offersMock.slice(1)] });
    });
  });
});
