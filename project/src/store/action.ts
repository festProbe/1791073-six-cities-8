import { ActionType } from '../types/action';

export const choosenCity = (city: string | null) => ({
  type: ActionType.ChooseCity,
  payload: city,
} as const);

export const offersFromChosenCity = () => ({
  type: ActionType.OffersFromChosenCity,
} as const);

export const offersBySortType = (sortType: string) => ({
  type: ActionType.OffersBySortType,
  payload: sortType,
} as const);
