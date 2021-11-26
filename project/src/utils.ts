import { AppRoute, CARD_CLASSES, LIST_CLASSES } from './const';
import { AuthInfo, AuthInfoFromServer } from './types/auth-data';
import { CommentFromServer, Comment } from './types/comment';
import { Offer, OfferFromServer } from './types/offer';

export function getListClass(pathname: string): string {
  switch (pathname) {
    case AppRoute.Main:
      return LIST_CLASSES.MAIN_LIST_CLASS;
    case AppRoute.RoomWithId:
      return LIST_CLASSES.PROPERTY_LIST_CLASS;
    default:
      return '';
  }
}

export function getCardClass(pathname: string): string {
  switch (pathname) {
    case AppRoute.Main:
      return CARD_CLASSES.MAIN_CARD_CLASS;
    case AppRoute.RoomWithId:
      return CARD_CLASSES.PROPERTY_CARD_CLASS;
    default:
      return '';
  }
}

export function getImageWrapperClass(pathname: string): string {
  switch (pathname) {
    case AppRoute.Main:
      return CARD_CLASSES.MAIN_CARD_IMAGE_WRAPPER_CLASS;
    case AppRoute.RoomWithId:
      return CARD_CLASSES.PROPERTY_CARD_IMAGE_WRAPPER_CLASS;
    default:
      return '';
  }
}

export function AdaptToClient(offer: OfferFromServer): Offer {
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

export function AdaptCommentToClient(comment: CommentFromServer): Comment {
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

export function AdaptUserInfoToClient(userInfo: AuthInfoFromServer): AuthInfo {
  return {
    avatarUrl: userInfo['avatar_url'],
    email: userInfo.email,
    id: userInfo.id,
    isPro: userInfo['is_pro'],
    name: userInfo.name,
    token: userInfo.token,
  };
}
