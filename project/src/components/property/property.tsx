import Map from '../map/map';
import NewReview from '../new-review-form/new-review-form';
import OffersList from '../offers-list/offers-list';
import ReviewsList from '../reviews-list/reviews-list';
import { Location } from '../../types/offer';
import Header from '../header/header';
import { useParams } from 'react-router';
import LoadingScreen from '../loading-screen/loading-screen';
import { AuthorizationStatus } from '../../const';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOfferAction } from '../../store/api-actions';
import { getSelectedPlace } from '../../store/action';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { getOffer } from '../../store/offer-reducer/selectors';
import { getAuthorizationStatus } from '../../store/auth-reducer/selectors';
import { getCurrentPlaceLocation } from '../../store/offers-reducer/selectors';

function Property(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const { offer, comments, nearbyOffers, isLoaded } = useSelector(getOffer);
  const currentPlace = useSelector(getCurrentPlaceLocation);

  useEffect(() => {
    dispatch(fetchOfferAction(id));
  }, [dispatch, id]);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  if (!offer) {
    return <NotFoundScreen />;
  }

  const {
    title,
    images,
    isPremium,
    isFavorite,
    rating,
    maxAdults,
    bedrooms,
    type,
    price,
    goods,
    host,
    description,
  } = offer;

  const { avatarUrl, isPro, name } = host;

  const stars = {
    width: rating * 30,
  };
  const offerImages = images.map((image) => (
    <div key={image + offer.id} className="property__image-wrapper">
      <img className="property__image" src={image} alt="Studio" />
    </div>
  ));

  const offerGoods = goods.map((good) => (
    <li key={`${good} + ${offer.id}`} className="property__inside-item">
      {good}
    </li>
  ));
  function onCardHover(location: Location) {
    dispatch(getSelectedPlace(location));
  }

  return (
    <>
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <div className="page">
        <Header />

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {offerImages}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {isPremium ?
                  <div className="property__mark">
                    <span>Premium</span>
                  </div> : ''}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {title}
                  </h1>
                  <button className={`property__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button">
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={stars}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {offerGoods}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={`property__avatar-wrapper ${isPro ? 'property__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                      <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {name}
                    </span>
                    {isPro ?
                      <span className="property__user-status">
                        Pro
                      </span> : ''}
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                  <ReviewsList comments={comments} />
                  {authorizationStatus === AuthorizationStatus.Auth ? <NewReview id={id} /> : ''}
                </section>
              </div>
            </div>
            <section className="property__map map" style={nearbyOffers.length !== 0 ? { backgroundImage: 'none' } : {}}>
              <Map offers={nearbyOffers} currentPlace={currentPlace} />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <OffersList offers={nearbyOffers} selectedPlace={onCardHover} />
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default Property;
