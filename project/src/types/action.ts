import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';
import {
  AxiosInstance
} from 'axios';
import { State } from './state';
import { Action } from 'redux';

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
  ChangeFavoriteStatus = 'favorites/changeFavoriteStatus',
  LoadOfferError = 'property/loadOfferError',
  LoadComments = 'property/comments',
  LoadFavorites = 'favorites/loadFavorites',
  LoadUserInfo = 'user/loadUserInfo',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'offers/redirectToRoute'
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
