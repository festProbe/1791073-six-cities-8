import { combineReducers } from 'redux';
import { offersReducer } from './offers-reducer/offers-reducer';
import { authReducer } from './auth-reducer/auth-reducer';
import { offerReducer } from './offer-reducer/offer-reduser';
import { favoriteReducer } from './favorites-reducer/favorites-reducer';

export enum NameSpace {
  Offers = 'OFFERS',
  Auth = 'AUTH',
  Offer = 'OFFER',
  Favorite = 'FAVORITE',
}

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersReducer,
  [NameSpace.Auth]: authReducer,
  [NameSpace.Offer]: offerReducer,
  [NameSpace.Favorite]: favoriteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
