import { ThunkActionResult } from '../types/action';
import { checkIsLoadedOffer, loadComments, loadNearby, loadOffer, loadOffers, getOffersFromChosenCity, redirectToRoute, requireAuthorization, requireLogout, showLoadOfferError, loadUser, loadFavorites, changeFavoriteStatus } from './action';
import { saveToken, dropToken, Token } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { Offer, OfferFromServer } from '../types/offer';
import { AuthData, AuthInfo, AuthInfoFromServer } from '../types/auth-data';
import { Comment, CommentFromServer, SendCommentType } from '../types/comment';

function AdaptToClient(offer: OfferFromServer): Offer {
  return {
    bedrooms: offer.bedrooms,
    city: {
      location: {
        latitude: offer.city.location.latitude,
        longitude: offer.city.location.longitude,
        zoom: offer.city.location.zoom,
      },
      name: offer.city.name,
    },
    description: offer.description,
    goods: offer.goods,
    host: {
      avatarUrl: offer.host['avatar_url'],
      id: offer.host.id,
      isPro: offer.host['is_pro'],
      name: offer.host.name,
    },
    id: offer.id,
    images: offer.images,
    isFavorite: offer['is_favorite'],
    isPremium: offer['is_premium'],
    location: {
      latitude: offer.location.latitude,
      longitude: offer.location.longitude,
      zoom: offer.location.zoom,
    },
    maxAdults: offer['max_adults'],
    previewImage: offer['preview_image'],
    price: offer.price,
    rating: offer.rating,
    title: offer.title,
    type: offer.type,
  };
}

function AdaptCommentToClient(comment: CommentFromServer): Comment {
  return {
    comment: comment.comment,
    date: comment.date,
    id: comment.id,
    rating: comment.rating,
    user: {
      avatarUrl: comment.user['avatar_url'],
      id: comment.user.id,
      isPro: comment.user['is_pro'],
      name: comment.user.name,
    },
  };
}

function AdaptUserInfoToClient(userInfo: AuthInfoFromServer): AuthInfo {
  return {
    avatarUrl: userInfo['avatar_url'],
    email: userInfo.email,
    id: userInfo.id,
    isPro: userInfo['is_pro'],
    name: userInfo.name,
    token: userInfo.token,
  };
}

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
    const { data } = await api.get(APIRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(loadUser(AdaptUserInfoToClient(data)));
    dispatch(fetchFavoritesOffers());
  };

export const sendReview = ({ id, rating, comment }: SendCommentType): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post(APIRoute.Comments + id, { rating, comment });
    const comments: Comment[] = data.map((review: CommentFromServer) => AdaptCommentToClient(review));
    dispatch(loadComments(comments));
  };

export const loginAction = ({ login: email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data: { token } } = await api.post<{ token: Token }>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(checkAuthAction());
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };

export const fetchFavoritesOffers = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.get<OfferFromServer[]>(APIRoute.Favorites);
    dispatch(loadFavorites(data.map((offer) => AdaptToClient(offer))));
  };

export const postFavoriteStatus = (id: string, favoriteStatus: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post<OfferFromServer>(`${APIRoute.Favorites}/${id}/${favoriteStatus}`);
    dispatch(changeFavoriteStatus(AdaptToClient(data)));
  };
