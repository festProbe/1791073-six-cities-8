import { City, Location } from './offer';

export type MapMock = {
  city: City,
  locations: Location[],
  selectedPlace: Location | undefined,
}
