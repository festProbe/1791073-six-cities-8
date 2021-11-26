export type User = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string
}

export type UserFromServer = {
  'avatar_url': string,
  id: number,
  'is_pro': boolean,
  name: string
}

export type Comment = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: User,
}

export type CommentFromServer = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: UserFromServer,
}

export type SendCommentType = {
  id: string,
  comment: string,
  rating: number,
}
