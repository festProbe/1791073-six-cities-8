import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useRouteMatch } from 'react-router';
import { getCardClass, getImageWrapperClass } from '../../utils';
import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postFavoriteStatus } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/auth-reducer/selectors';
import { redirectToRoute } from '../../store/action';

type CardProps = {
  offer: Offer,
  selectedPlace: () => void,
}

function Card({ offer, selectedPlace }: CardProps): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const { rating, price, type, title, previewImage, id, isPremium, isFavorite } = offer;

  const stars = {
    width: rating * 20,
  };

  const favoriteButtonHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      dispatch(redirectToRoute(AppRoute.SignIn));
    }

    dispatch(postFavoriteStatus(id, Number(!isFavorite)));
  };

  return (
    <article className={getCardClass(match.path)}
      onMouseOver={selectedPlace}
    >
      {
        isPremium ?
          <div className="place-card__mark">
            < span > Premium</span >
          </div > : ''
      }
      <div className={getImageWrapperClass(match.path)}>
        <Link to={AppRoute.Main} >
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
            onClick={favoriteButtonHandler}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
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
    </article >
  );
}

export default Card;
