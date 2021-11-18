import { ThunkActionResult } from '../types/action';
import { loadOffers, offersFromChosenCity, requireAuthorization, requireLogout } from './action';
import { saveToken, dropToken, Token } from '../services/token';
import { APIRoute, AuthorizationStatus } from '../const';
import { Offer, OfferFromServer } from '../types/offer';
import { AuthData } from '../types/auth-data';

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

export const fetchOfferAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<OfferFromServer[]>(APIRoute.Offers);
    dispatch(loadOffers(data.map((offer) => AdaptToClient(offer))));
    dispatch(offersFromChosenCity());
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      });
  };

export const loginAction = ({ login: email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data: { token } } = await api.post<{ token: Token }>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };


export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
