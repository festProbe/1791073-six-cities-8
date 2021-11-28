import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { postFavoriteStatus } from '../../store/api-actions';
import { Offer } from '../../types/offer';

type FavoriteOfferItemProps = {
  offer: Offer;
}

function FavoriteOfferItem({ offer }: FavoriteOfferItemProps): JSX.Element {
  const { id, previewImage, title, price, isFavorite, rating, type } = offer;
  const dispatch = useDispatch();

  const stars = { width: rating * 20 };

  const favoriteButtonHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(postFavoriteStatus(id, Number(!isFavorite)));
  };

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={AppRoute.Room + id} data-testid='card-info-page'>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt={title} />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
            onClick={favoriteButtonHandler}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={stars}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.Room + id}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default FavoriteOfferItem;
