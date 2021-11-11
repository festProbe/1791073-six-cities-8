import { ActionType } from '../types/action';

export const choosenCity = (city: string | null) => ({
  type: ActionType.ChooseCity,
  payload: city,
} as const);

export const offersFromChosenCity = () => ({
  type: ActionType.OffersFromChosenCity,
} as const);
