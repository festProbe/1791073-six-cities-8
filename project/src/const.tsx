export enum AppRoute {
  Main = '/',
  SignIn = '/sign-in',
  Favorites = '/favorites',
  Room = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
}

export const LOCATIONS = [
  {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 8,
  },
  {
    latitude: 52.369553943508,
    longitude: 4.85309666406198,
    zoom: 8,
  },
  {
    latitude: 52.3909553943508,
    longitude: 4.929309666406198,
    zoom: 8,
  },
  {
    latitude: 52.3809553943508,
    longitude: 4.939309666406198,
    zoom: 8,
  },
];

export const PINS_URLS = {
  ACTIVE_PIN: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  MAIN_PIN: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
};

export const LIST_CLASSES = {
  MAIN_LIST_CLASS: 'cities__places-list  tabs__content places__list',
  PROPERTY_LIST_CLASS: 'near-places__list places__list',
};

export const CARD_CLASSES = {
  MAIN_CARD_CLASS: 'cities__place-card place-card',
  PROPERTY_CARD_CLASS: 'near-places__card place-card',
  MAIN_CARD_IMAGE_WRAPPER_CLASS: 'cities__image-wrapper place-card__image-wrapper',
  PROPERTY_CARD_IMAGE_WRAPPER_CLASS: 'near-places__image-wrapper place-card__image-wrapper',
};
