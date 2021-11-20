import { OfferReducerState, State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getOffer = (state: State): OfferReducerState => state[NameSpace.Offer];
