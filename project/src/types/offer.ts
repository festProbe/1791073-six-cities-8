type Host = {
  avatarUrl: string,
  id: string,
  isPro: boolean,
  name: string
}

type HostFromServer = {
  'avatar_url': string,
  id: string,
  'is_pro': boolean,
  name: string
}

export type Location = {
  latitude: number,
  longitude: number,
  zoom: number
}

export type City = {
  location: Location,
  name: string
}

export type Offer = {
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: Host,
  id: string,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: Location,
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: string,
}

export type OfferFromServer = {
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: HostFromServer,
  id: string,
  images: string[],
  'is_favorite': boolean,
  'is_premium': boolean,
  location: Location,
  'max_adults': number,
  'preview_image': string,
  price: number,
  rating: number,
  title: string,
  type: string,
}
