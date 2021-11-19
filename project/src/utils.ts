import { AppRoute, CARD_CLASSES, LIST_CLASSES } from './const';
import { City } from './types/offer';

export function getUniqueCities(citiesTest: City[]): City[] {
  const newCities = [];
  newCities.push(citiesTest[0]);
  for (let i = 0; i < citiesTest.length; i++) {
    for (let y = citiesTest.length - 1; y >= i; y--) {
      if (citiesTest[i].name !== citiesTest[y].name && !newCities.some((city) => city.name === citiesTest[i].name)) {
        newCities.push(citiesTest[i]);
      }
    }
  }
  return newCities;
}

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
