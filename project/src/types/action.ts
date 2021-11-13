import { choosenCity, offersFromChosenCity, offersBySortType } from '../store/action';
export enum ActionType {
  ChooseCity = 'offers/chooseSity',
  OffersFromChosenCity = 'offers/rerenderOffersFromChosenCity',
  OffersBySortType = 'offers/rerenderOffersBySortType',
}

export type Actions =
  | ReturnType<typeof choosenCity>
  | ReturnType<typeof offersFromChosenCity>
  | ReturnType<typeof offersBySortType>;
