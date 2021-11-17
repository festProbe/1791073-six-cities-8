import { City, Location } from './offer';

export type Map = {
  city: City,
  locations: Location[],
  selectedPlace: Location | undefined,
}
