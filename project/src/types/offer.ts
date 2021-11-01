type HostMock = {
  avatarUrl: string,
  id: string,
  isPro: boolean,
  name: string
}

type Location = {
  latitude: number,
  longitude: number,
  zoom: number
}

type City = {
  location: Location,
  name: string
}

export type OfferMock = {
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: HostMock,
  id: string,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: string,
}
