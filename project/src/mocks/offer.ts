import { nanoid } from 'nanoid';
import { LOCATIONS } from '../const';
import { OfferMock } from '../types/offer';

export const generateOffer = (index: number): OfferMock => {

  function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }

  return {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    host: {
      avatarUrl: 'img/1.png',
      id: nanoid(),
      isPro: true,
      name: 'Angelina',
    },
    id: nanoid(),
    images: ['apartment-01.jpg', 'apartment-02.jpg, apartment-03.jpg'],
    isFavorite: Boolean(getRandomInt(0, 2)),
    isPremium: Boolean(getRandomInt(0, 2)),
    location: LOCATIONS[index],
    maxAdults: getRandomInt(1, 4),
    previewImage: 'img/apartment-03.jpg',
    price: getRandomInt(100, 10000),
    rating: getRandomInt(10, 100),
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
  };
};
