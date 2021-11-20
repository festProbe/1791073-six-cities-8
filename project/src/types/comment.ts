type User = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string
}

type UserFromServer = {
  'avatar_url': string,
  id: number,
  'is_pro': boolean,
  name: string
}

export type Comment = {
  comment: string,
  date: Date,
  id: number,
  rating: number,
  user: User,
}

export type CommentFromServer = {
  comment: string,
  date: Date,
  id: number,
  rating: number,
  user: UserFromServer,
}

export type SendCommentType = {
  id: string,
  comment: string,
  rating: number,
}
