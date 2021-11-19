import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { AppRoute } from '../../const';
import { useRouteMatch } from 'react-router';
import { getCardClass, getImageWrapperClass } from '../../utils';
import { ThunkAppDispatch } from '../../types/action';
import { fetchOfferAction } from '../../store/api-actions';
import { connect, ConnectedProps } from 'react-redux';

type CardProps = {
  offer: Offer,
  selectedPlace: () => void,
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  setChosenOffer(id: string) {
    dispatch(fetchOfferAction(id));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectionProps = PropsFromRedux & CardProps;

function Card({ offer, selectedPlace }: ConnectionProps): JSX.Element {

  const match = useRouteMatch();

  const { rating, price, type, title, previewImage, id, isPremium, isFavorite } = offer;

  const onCardClick = () => {
    // eslint-disable-next-line no-console
    console.log('hello');
  };


  const stars = {
    width: rating * 15,
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
        <Link to={AppRoute.Room + id}
          onClick={onCardClick}
        >
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button">
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

export { Card };
export default connector(Card);
