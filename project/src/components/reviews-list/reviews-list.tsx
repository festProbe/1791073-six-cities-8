import { Comment } from '../../types/comment';
import ReviewItem from '../reviews-item/reviews-item';

type ReviewListProps = {
  comments: Comment[];
}

function ReviewsList({ comments }: ReviewListProps): JSX.Element {

  const commentsToHTML = comments.slice(0, 10).map((comment) => <ReviewItem key={`comment_${comment.id}`} comment={comment} />);
  return (
    <ul className="reviews__list" data-testid='reviiew-list'>
      {commentsToHTML}
    </ul>
  );
}

export default ReviewsList;
