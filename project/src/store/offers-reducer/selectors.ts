import { Location, Offer } from '../../types/offer';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getCurrentPlaceLocation = (state: State): Location | null => state[NameSpace.Offers].currentPlace;
export const getCurrentCity = (state: State): string | null => state[NameSpace.Offers].city;
export const getOffers = (state: State): Offer[] => state[NameSpace.Offers].offers;
