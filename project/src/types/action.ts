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
  offersFromChosenCity,
  mapFromChosenCity,
  offersBySortType,
  loadOffers,
  requireAuthorization,
  requireLogout,
  selectedCurrentPlace
} from '../store/action';

export enum ActionType {
  ChooseCity = 'offers/chooseSity',
  SelectedCurrentPlace = 'map/changeCurrentPlace',
  OffersFromChosenCity = 'offers/rerenderOffersFromChosenCity',
  OffersBySortType = 'offers/rerenderOffersBySortType',
  LoadOffers = 'offers/loadOffers',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  MapFromChosenCity = 'map/rerenderMapFromChosenCity',
}

export type Actions =
  | ReturnType<typeof choosenCity>
  | ReturnType<typeof selectedCurrentPlace>
  | ReturnType<typeof offersFromChosenCity>
  | ReturnType<typeof mapFromChosenCity>
  | ReturnType<typeof offersBySortType>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
