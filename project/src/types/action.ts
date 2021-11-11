import { choosenCity, offersFromChosenCity } from '../store/action';
export enum ActionType {
  ChooseCity = 'offers/chooseSity',
  OffersFromChosenCity = 'offers/rerenderOffersFromChosenCity'
}

export type Actions =
  | ReturnType<typeof choosenCity>
  | ReturnType<typeof offersFromChosenCity>;
