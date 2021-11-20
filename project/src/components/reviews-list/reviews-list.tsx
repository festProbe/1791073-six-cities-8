import { Comment } from '../../types/comment';
import ReviewItem from '../reviews-item/reviews-item';

type ReviewListProps = {
  comments: Comment[];
}

function ReviewsList({ comments }: ReviewListProps): JSX.Element {

  const commentsToHTML = comments.map((comment) => <ReviewItem key={`comment_${comment.id}`} comment={comment} />);
  return (
    <ul className="reviews__list">
      {commentsToHTML}
    </ul>
  );
}

export default ReviewsList;
