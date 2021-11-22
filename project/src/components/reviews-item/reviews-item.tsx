import { Comment } from '../../types/comment';
import dayjs from 'dayjs';

type ReviewItemProps = {
  comment: Comment;
}

function ReviewsItem({ comment }: ReviewItemProps): JSX.Element {
  const { user, rating, date } = comment;
  const { name, avatarUrl, isPro } = user;

  const stars = { width: rating * 20 };
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className={`reviews__avatar-wrapper user__avatar-wrapper ${isPro ? 'property__avatar-wrapper--pro' : ''}`}>
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={stars}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment}
        </p>
        <time className="reviews__time" dateTime={`${date}`}>{dayjs(date).format('MMMM YYYY')}</time>
      </div>
    </li >
  );
}

export default ReviewsItem;
