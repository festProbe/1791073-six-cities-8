import { AuthorizationStatus } from '../const';
import { RootState } from '../store/root-reducer';
import { Comment } from './comment';
import { Location, Offer } from './offer';

export type OfferReducerState = {
  offer: Offer | null;
  nearbyOffers: Offer[];
  comments: Comment[];
  isLoaded: boolean;
  error: string;
}

export type OffersReducerState = {
  city: string | null;
  currentPlace: Location | null;
  allOffers: Offer[];
  offers: Offer[];
}

export type AuthReducerState = {
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
}

export type FavoriteReducerState = {
  offers: Offer[],
  isLoading: boolean,
}

export type State = RootState;
