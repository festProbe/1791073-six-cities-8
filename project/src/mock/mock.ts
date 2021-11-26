import { datatype, internet, name, address, commerce, image } from 'faker';
import { AuthInfo } from '../types/auth-data';
import { Comment, CommentFromServer, User, UserFromServer } from '../types/comment';
import { Location, Offer, OfferFromServer } from '../types/offer';

export const makeUserData = (): AuthInfo => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.uuid(),
});

export const makeCommentUserData = (): User => ({
  avatarUrl: internet.avatar(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: name.firstName(),
});

export const makeCommentUserDataFromServer = (): UserFromServer => ({
  'avatar_url': internet.avatar(),
  id: datatype.number(),
  'is_pro': datatype.boolean(),
  name: name.firstName(),
});

export const makeOffer = (): Offer => ({
  bedrooms: datatype.number(),
  city: {
    location: {
      latitude: datatype.float(),
      longitude: datatype.float(),
      zoom: datatype.number(),
    },
    name: address.cityName(),
  },
  description: commerce.productDescription(),
  goods: new Array(3).fill(commerce.product()),
  host: {
    avatarUrl: internet.avatar(),
    id: datatype.string(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
  id: datatype.string(),
  images: new Array(3).fill(image.dataUri()),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: datatype.float(),
    longitude: datatype.float(),
    zoom: datatype.number(),
  },
  maxAdults: datatype.number(),
  previewImage: image.imageUrl(),
  price: datatype.number(),
  rating: datatype.number(),
  title: commerce.productName(),
  type: datatype.string(),
});

export const makeOfferFromServer = (): OfferFromServer => ({
  bedrooms: datatype.number(),
  city: {
    location: {
      latitude: datatype.float(),
      longitude: datatype.float(),
      zoom: datatype.number(),
    },
    name: address.cityName(),
  },
  description: commerce.productDescription(),
  goods: new Array(3).fill(commerce.product()),
  host: {
    'avatar_url': internet.avatar(),
    id: datatype.string(),
    'is_pro': datatype.boolean(),
    name: name.firstName(),
  },
  id: datatype.string(),
  images: new Array(3).fill(image.dataUri()),
  'is_favorite': datatype.boolean(),
  'is_premium': datatype.boolean(),
  location: {
    latitude: datatype.float(),
    longitude: datatype.float(),
    zoom: datatype.number(),
  },
  'max_adults': datatype.number(),
  'preview_image': image.imageUrl(),
  price: datatype.number(),
  rating: datatype.number(),
  title: commerce.productName(),
  type: datatype.string(),
});

export const makeComment = (): Comment => ({
  comment: datatype.string(),
  date: `${datatype.datetime()}`,
  id: datatype.number(),
  rating: datatype.number(),
  user: makeCommentUserData(),
});

export const makeCommentFromServer = (): CommentFromServer => ({
  comment: datatype.string(),
  date: `${datatype.datetime()}`,
  id: datatype.number(),
  rating: datatype.number(),
  user: makeCommentUserDataFromServer(),
});

export const makeFakeCity = (): string => address.cityName();

export const makeFakeLocation = (): Location => ({
  latitude: datatype.float(),
  longitude: datatype.float(),
  zoom: datatype.number(),
});
