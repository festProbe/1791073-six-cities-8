import { Location } from '../../types/offer';
import OffersList from '../offers-list/offers-list';
import { Link } from 'react-router-dom';
import { MouseEventHandler } from 'react';
import Map from '../map/map';
import { useDispatch, useSelector } from 'react-redux';
import { chooseCity, getOffersFromChosenCity, getSelectedPlace } from '../../store/action';
import SortOptions from '../sort-options/sort-options';
import Header from '../header/header';
import { getCurrentCity, getCurrentPlaceLocation, getOffers } from '../../store/offers-reducer/selectors';

function Main(): JSX.Element {

  const offers = useSelector(getOffers);
  const city = useSelector(getCurrentCity);
  const currentPlace = useSelector(getCurrentPlaceLocation);
  const dispatch = useDispatch();


  const onCardHover = (cardLocation: Location): void => {
    dispatch(getSelectedPlace(cardLocation));
  };

  const handleSitiesClick: MouseEventHandler = (evt): void => {
    const citiesLinks = document.querySelectorAll('.locations__item-link');
    evt.preventDefault();
    citiesLinks.forEach((link) => {
      link.classList.remove('tabs__item--active');
    });
    evt.currentTarget.classList.add('tabs__item--active');
    dispatch(chooseCity(evt.currentTarget.textContent));
    dispatch(getOffersFromChosenCity());
  };

  return (
    <>
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <div className="page page--gray page--main">
        <Header />

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <ul className="locations__list tabs__list">
                <li className="locations__item">
                  <Link className="locations__item-link tabs__item tabs__item--active" to="/" onClick={handleSitiesClick}>
                    <span>Paris</span>
                  </Link>
                </li>
                <li className="locations__item">
                  <Link className="locations__item-link tabs__item" to="/" onClick={handleSitiesClick}>
                    <span>Cologne</span>
                  </Link>
                </li>
                <li className="locations__item">
                  <Link className="locations__item-link tabs__item" to="/" onClick={handleSitiesClick}>
                    <span>Brussels</span>
                  </Link>
                </li>
                <li className="locations__item">
                  <Link className="locations__item-link tabs__item" to="/" onClick={handleSitiesClick}>
                    <span>Amsterdam</span>
                  </Link>
                </li>
                <li className="locations__item">
                  <Link className="locations__item-link tabs__item" to="/" onClick={handleSitiesClick}>
                    <span>Hamburg</span>
                  </Link>
                </li>
                <li className="locations__item">
                  <Link className="locations__item-link tabs__item" to="/" onClick={handleSitiesClick}>
                    <span>Dusseldorf</span>
                  </Link>
                </li>
              </ul>
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length !== 0 ? `${offers.length} places to stay in ${city}` : 'No places to stay available'}</b>
                {offers.length !== 0
                  ?
                  <SortOptions />
                  : ''}
                {offers.length === 0 ? '' : <OffersList offers={offers} selectedPlace={onCardHover} />}
              </section>
              <div className="cities__right-section">
                <section className="cities__map map" style={offers.length !== 0 ? { backgroundImage: 'none' } : {}}>
                  {offers.length !== 0 ? <Map offers={offers} currentPlace={currentPlace} /> : ''}
                </section>
              </div>
            </div>
          </div>
        </main>
      </div >
    </>
  );
}

export default Main;
