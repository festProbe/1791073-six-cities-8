import { ThunkActionResult } from '../types/action';
import { saveToken, dropToken, Token } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { OfferFromServer } from '../types/offer';
import { AuthData } from '../types/auth-data';
import { Comment, CommentFromServer, SendCommentType } from '../types/comment';
import { toast } from 'react-toastify';
import { AdaptToClient, AdaptCommentToClient, AdaptUserInfoToClient } from '../utils';
import {
  checkIsLoadedOffer,
  loadComments,
  loadNearby,
  loadOffer,
  loadOffers,
  getOffersFromChosenCity,
  redirectToRoute,
  requireAuthorization,
  requireLogout,
  showLoadOfferError,
  loadUser,
  loadFavorites,
  changeFavoriteStatus
} from './action';
import {
  NO_AUTH_MESSAGE,
  AUTH_FAIL_MESSAGE,
  AUTH_SUCCESS_MESSAGE,
  SEND_REVIEW_SUCCESS_MESSAGE,
  SEND_REVIEW_FAIL_MESSAGE,
  LOAD_FAVORITE_FAIL_MESSAGE,
  FAVORITE_ADD_SUCCESS_MESSAGE,
  FAVORITE_REMOVE_SUCCESS_MESSAGE,
  FAVORITE_CHANGE_STATUS_FAIL_MESSAGE
} from '../const';

export const fetchOfferAction = (id: string): ThunkActionResult =>

  async (dispatch, _getState, api): Promise<void> => {
    dispatch(checkIsLoadedOffer(false));
    try {
      const offer = await api.get<OfferFromServer>(APIRoute.Offer + id);
      dispatch(loadOffer(AdaptToClient(offer.data)));
      const comments = await api.get<CommentFromServer[]>(APIRoute.Comments + id);
      dispatch(loadComments(comments.data.map((comment) => AdaptCommentToClient(comment))));
      const nearby = await api.get<OfferFromServer[]>(APIRoute.Offer + id + APIRoute.Nearby);
      dispatch(loadNearby(nearby.data.map((nearbyOffer) => AdaptToClient(nearbyOffer))));
    }
    catch {
      dispatch(showLoadOfferError('Не удалось загузить данные о предложении!'));
    }
    dispatch(checkIsLoadedOffer(true));
  };


export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<OfferFromServer[]>(APIRoute.Offers);
    dispatch(loadOffers(data.map((offer) => AdaptToClient(offer))));
    dispatch(getOffersFromChosenCity());
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(loadUser(AdaptUserInfoToClient(data)));
      dispatch(fetchFavoritesOffers());
    }
    catch {
      toast.info(NO_AUTH_MESSAGE);
    }
  };

export const sendReview = ({ id, rating, comment }: SendCommentType): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.post(APIRoute.Comments + id, { rating, comment });
      const comments: Comment[] = data.map((review: CommentFromServer) => AdaptCommentToClient(review));
      dispatch(loadComments(comments));
      toast.success(SEND_REVIEW_SUCCESS_MESSAGE);
    }
    catch {
      toast.error(SEND_REVIEW_FAIL_MESSAGE);
    }
  };

export const loginAction = ({ login: email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data: { token } } = await api.post<{ token: Token }>(APIRoute.Login, { email, password });
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
      dispatch(checkAuthAction());
      toast.success(AUTH_SUCCESS_MESSAGE);
    }
    catch {
      toast.error(AUTH_FAIL_MESSAGE);
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };

export const fetchFavoritesOffers = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<OfferFromServer[]>(APIRoute.Favorites);
      dispatch(loadFavorites(data.map((offer) => AdaptToClient(offer))));
    }
    catch {
      toast.error(LOAD_FAVORITE_FAIL_MESSAGE);
    }
  };

export const postFavoriteStatus = (id: string, favoriteStatus: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.post<OfferFromServer>(`${APIRoute.Favorites}/${id}/${favoriteStatus}`);
      dispatch(changeFavoriteStatus(AdaptToClient(data)));
      dispatch(fetchFavoritesOffers());
      favoriteStatus === 1 ? toast.success(FAVORITE_ADD_SUCCESS_MESSAGE) : toast.success(FAVORITE_REMOVE_SUCCESS_MESSAGE);
    }
    catch {
      toast.error(FAVORITE_CHANGE_STATUS_FAIL_MESSAGE);
    }
  };
