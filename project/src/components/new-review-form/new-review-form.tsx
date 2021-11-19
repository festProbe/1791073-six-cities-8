import { ChangeEvent, useState, MouseEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { sendReview } from '../../store/api-actions';

type NewReviewProps = {
  id: string;
}

function NewReview({ id }: NewReviewProps): JSX.Element {

  const [comment, setCommentText] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  function handleChangeText(event: ChangeEvent<HTMLTextAreaElement>): void {
    const MIN_REVIEW_SYMBOLS_COUNT = 50;
    const MAX_REVIEW_SYMBOLS_COUNT = 300;

    setCommentText(event.target.value);

    if (event.target.value.length < MIN_REVIEW_SYMBOLS_COUNT) {
      event.target.setCustomValidity(`${MIN_REVIEW_SYMBOLS_COUNT - event.target.value.length} symbols left.`);
      document.querySelector('.reviews__submit')?.setAttribute('disabled', 'disabled');
    } else if (event.target.validity.tooLong) {
      event.target.setCustomValidity(`Delete ${event.target.value.length - MAX_REVIEW_SYMBOLS_COUNT} symbols.`);
      document.querySelector('.reviews__submit')?.setAttribute('disabled', 'disabled');
    } else if (event.target.validity.valueMissing) {
      event.target.setCustomValidity('This field are required.');
    } else {
      event.target.setCustomValidity('');
    }
    event.target.reportValidity();

    if (event.target.value.length < MAX_REVIEW_SYMBOLS_COUNT && event.target.value.length > MIN_REVIEW_SYMBOLS_COUNT) {
      if (Array.from(document.querySelectorAll('.form__rating-input')).some((element) => element.hasAttribute('checked'))) {
        document.querySelector('.reviews__submit')?.removeAttribute('disabled');
      }
    }
  }

  function hanleSetCheckedAttribute(event: MouseEvent): void {
    const inputElements = document.querySelectorAll('.form__rating-input');
    inputElements.forEach((element) => element.removeAttribute('checked'));
    event.currentTarget.setAttribute('checked', '');
    const ratingValue = event.currentTarget.getAttribute('value');

    if (ratingValue !== null) {
      setRating(parseInt(ratingValue, 10));
    }
  }

  function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(sendReview({ id, rating, comment }));
    setCommentText('');
  }

  return (
    <form className="reviews__form form" action="#" method="post" encType="multipart/form-data" autoComplete="off" onSubmit={handleOnSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating"  >
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onClick={hanleSetCheckedAttribute} />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect" >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onClick={hanleSetCheckedAttribute} />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onClick={hanleSetCheckedAttribute} />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onClick={hanleSetCheckedAttribute} />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onClick={hanleSetCheckedAttribute} />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleChangeText}
        required
        minLength={50}
        maxLength={300}
      >
      </textarea >
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form >
  );
}

export default NewReview;
