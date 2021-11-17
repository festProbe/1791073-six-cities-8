import { AuthorizationStatus } from '../const';
import { ActionType } from '../types/action';
import { Location, Offer } from '../types/offer';
import leaflet from 'leaflet';

export const choosenCity = (city: string | null) => ({
  type: ActionType.ChooseCity,
  payload: city,
} as const);

export const selectedCurrentPlace = (location: Location) => ({
  type: ActionType.SelectedCurrentPlace,
  payload: location,
} as const);

export const mapFromChosenCity = (map: leaflet.Map) => ({
  type: ActionType.MapFromChosenCity,
  payload: map,
} as const);

export const offersFromChosenCity = () => ({
  type: ActionType.OffersFromChosenCity,
} as const);

export const offersBySortType = (sortType: string) => ({
  type: ActionType.OffersBySortType,
  payload: sortType,
} as const);

export const loadOffers = (allOffers: Offer[]) => ({
  type: ActionType.LoadOffers,
  payload: {
    allOffers,
  },
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);
