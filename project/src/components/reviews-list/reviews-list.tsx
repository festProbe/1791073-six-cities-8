import ReviewItem from '../reviews-item/reviews-item';

function ReviewsList(): JSX.Element {
  return (
    <ul className="reviews__list">
      <ReviewItem />
    </ul>
  );
}

export default ReviewsList;
