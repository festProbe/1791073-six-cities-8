export type AuthData = {
  login: string;
  password: string;
};

export type AuthInfoFromServer = {
  'avatar_url': string,
  email: string,
  id: number
  'is_pro': boolean,
  name: string,
  token: string,
}

export type AuthInfo = {
  avatarUrl: string,
  email: string,
  id: number
  isPro: boolean,
  name: string,
  token: string,
}
