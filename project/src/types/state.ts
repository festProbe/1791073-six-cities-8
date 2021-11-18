import { AuthorizationStatus } from '../const';
import { Location, Offer } from './offer';
import leaflet from 'leaflet';

export type State = {
  city: string | null;
  currentPlace: Location | null;
  map: leaflet.Map | null,
  allOffers: Offer[];
  offers: Offer[];
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
}
