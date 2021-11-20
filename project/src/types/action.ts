import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';
import {
  AxiosInstance
} from 'axios';
import { State } from './state';

import {
  choosenCity,
  selectCurrentPlace,
  offersFromChosenCity,
  offersBySortType,
  loadOffers,
  loadOffer,
  loadNearby,
  loadFavorites,
  checkIsLoadedOffer,
  checkFavoritesIsLoading,
  showLoadOfferError,
  loadComments,
  requireAuthorization,
  requireLogout,
  redirectToRoute
} from '../store/action';

export enum ActionType {
  ChooseCity = 'offers/chooseSity',
  SelectCurrentPlace = 'map/changeCurrentPlace',
  OffersFromChosenCity = 'offers/rerenderOffersFromChosenCity',
  OffersBySortType = 'offers/rerenderOffersBySortType',
  LoadOffers = 'offers/loadOffers',
  LoadOffer = 'property/loadOffer',
  LoadNearby = 'property/loadNearby',
  CheckIsLoadedOffer = 'property/isLoadingOffer',
  CheckFavoritesIsLoading = 'favorites/checkIsFavoritesLoading',
  LoadOfferError = 'property/loadOfferError',
  LoadComments = 'property/comments',
  LoadFavorites = 'favorites/loadFavorites',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'offers/redirectToRoute'
}

export type Actions =
  | ReturnType<typeof choosenCity>
  | ReturnType<typeof selectCurrentPlace>
  | ReturnType<typeof offersFromChosenCity>
  | ReturnType<typeof offersBySortType>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof loadOffer>
  | ReturnType<typeof loadNearby>
  | ReturnType<typeof loadComments>
  | ReturnType<typeof loadFavorites>
  | ReturnType<typeof checkIsLoadedOffer>
  | ReturnType<typeof checkFavoritesIsLoading>
  | ReturnType<typeof showLoadOfferError>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>;


export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
