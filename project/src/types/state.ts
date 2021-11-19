import { AuthorizationStatus } from '../const';
import { Location, Offer } from './offer';

export type State = {
  city: string | null;
  currentPlace: Location | null;
  allOffers: Offer[];
  offers: Offer[];
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
}
