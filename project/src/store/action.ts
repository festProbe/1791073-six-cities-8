import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { ActionType } from '../types/action';
import { AuthInfo } from '../types/auth-data';
import { Comment } from '../types/comment';
import { Location, Offer } from '../types/offer';

// Actions for OffersReducer
export const chooseCity = createAction<string | null>(ActionType.ChooseCity);
export const getSelectedPlace = createAction<Location>(ActionType.SelectCurrentPlace);
export const getOffersFromChosenCity = createAction(ActionType.OffersFromChosenCity);
export const getOffersBySortType = createAction<string>(ActionType.OffersBySortType);
export const loadOffers = createAction<Offer[]>(ActionType.LoadOffers);

// Actions for OfferReducer
export const loadOffer = createAction<Offer | null>(ActionType.LoadOffer);
export const loadNearby = createAction<Offer[]>(ActionType.LoadNearby);
export const loadComments = createAction<Comment[]>(ActionType.LoadComments);
export const checkIsLoadedOffer = createAction<boolean>(ActionType.CheckIsLoadedOffer);
export const showLoadOfferError = createAction<string>(ActionType.LoadOfferError);

// Actions for AuthReducer
export const requireAuthorization = createAction<AuthorizationStatus>(ActionType.RequireAuthorization);
export const requireLogout = createAction(ActionType.RequireLogout);
export const loadUser = createAction<AuthInfo>(ActionType.LoadUserInfo);

// Actions for FavoritesReducer
export const loadFavorites = createAction<Offer[]>(ActionType.LoadFavorites);
export const checkFavoritesIsLoading = createAction<boolean>(ActionType.CheckFavoritesIsLoading);
export const changeFavoriteStatus = createAction<Offer>(ActionType.ChangeFavoriteStatus);
// OtherActions
export const redirectToRoute = createAction<string>(ActionType.RedirectToRoute);
