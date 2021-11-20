import { AuthorizationStatus } from '../const';
import { ActionType } from '../types/action';
import { Comment } from '../types/comment';
import { Location, Offer } from '../types/offer';

export const choosenCity = (city: string | null) => ({
  type: ActionType.ChooseCity,
  payload: city,
} as const);

export const selectCurrentPlace = (location: Location) => ({
  type: ActionType.SelectCurrentPlace,
  payload: location,
} as const);

export const offersFromChosenCity = () => ({
  type: ActionType.OffersFromChosenCity,
} as const);

export const offersBySortType = (sortType: string) => ({
  type: ActionType.OffersBySortType,
  payload: sortType,
} as const);

export const loadOffer = (chosenOffer: Offer) => ({
  type: ActionType.LoadOffer,
  payload: chosenOffer,
} as const);

export const loadNearby = (nearby: Offer[]) => ({
  type: ActionType.LoadNearby,
  payload: nearby,
} as const);

export const loadComments = (comments: Comment[]) => ({
  type: ActionType.LoadComments,
  payload: comments,
} as const);

export const checkIsLoadedOffer = (isLoaded: boolean) => ({
  type: ActionType.CheckIsLoadedOffer,
  payload: isLoaded,
} as const);

export const showLoadOfferError = (errorMessage: string) => ({
  type: ActionType.LoadOfferError,
  payload: errorMessage,
} as const);

export const loadOffers = (allOffers: Offer[]) => ({
  type: ActionType.LoadOffers,
  payload: {
    allOffers,
  },
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);

export const redirectToRoute = (url: string) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);

export const loadFavorites = (offers: Offer[]) => ({
  type: ActionType.LoadFavorites,
  payload: offers,
} as const);

export const checkFavoritesIsLoading = (payload: boolean) => ({
  type: ActionType.CheckFavoritesIsLoading,
  payload,
} as const);
