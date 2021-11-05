import { OfferMock, Location } from '../../types/offer';
import OffersList from '../offers-list/offers-list';
import Logo from '../logo/logo';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { MouseEventHandler, useState } from 'react';
import Map from '../map/map';
import { getUniqueCities } from '../../utils';


type MainPageProps = {
  offers: OfferMock[];
}

function Main({ offers }: MainPageProps): JSX.Element {

  const cities = getUniqueCities(offers.map((offer) => offer.city));
  const locations = offers.map((offer) => offer.location);

  const [selectedPlace, setSelectedPlace] = useState<Location | undefined>(undefined);

  // eslint-disable-next-line no-console
  console.log(selectedPlace);

  function onCardHover(cardLocation: Location): void {
    const currentPlace = locations.find((location) => location.latitude === cardLocation.latitude && location.longitude === cardLocation.longitude);
    setSelectedPlace(currentPlace);
  }


  const handleFilterClick: MouseEventHandler = (evt) => {
    document.querySelectorAll('.places__option').forEach((option) => option.classList.remove('places__option--active'));
    evt.currentTarget.classList.add('places__option--active');
  };

  const handleSortByButtonClick: MouseEventHandler = (evt) => {
    if (evt.currentTarget.classList.contains('places__options--opened')) {
      evt.currentTarget.classList.remove('places__options--opened');
    } else {
      evt.currentTarget.classList.add('places__options--opened');
      document.addEventListener('click', () => {
        document.querySelector('.places__options')?.classList.remove('places__options--opened');
      });
    }
  };

  return (
    <>
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Logo />
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="/">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={AppRoute.SignIn}>
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <ul className="locations__list tabs__list">
                <li className="locations__item">
                  <a className="locations__item-link tabs__item" href="/">
                    <span>Paris</span>
                  </a>
                </li>
                <li className="locations__item">
                  <a className="locations__item-link tabs__item" href="/">
                    <span>Cologne</span>
                  </a>
                </li>
                <li className="locations__item">
                  <a className="locations__item-link tabs__item" href="/">
                    <span>Brussels</span>
                  </a>
                </li>
                <li className="locations__item">
                  <a className="locations__item-link tabs__item tabs__item--active" href="/">
                    <span>Amsterdam</span>
                  </a>
                </li>
                <li className="locations__item">
                  <a className="locations__item-link tabs__item" href="/">
                    <span>Hamburg</span>
                  </a>
                </li>
                <li className="locations__item">
                  <a className="locations__item-link tabs__item" href="/">
                    <span>Dusseldorf</span>
                  </a>
                </li>
              </ul>
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in Amsterdam</b>
                <form className="places__sorting" action="/" method="get">
                  <span className="places__sorting-caption">Sort by </span>
                  <span className="places__sorting-type" tabIndex={0} onClick={handleSortByButtonClick}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="/icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom">
                    <li className="places__option places__option--active" onClick={handleFilterClick} tabIndex={0}>Popular</li>
                    <li className="places__option" onClick={handleFilterClick} tabIndex={0}>Price: low to high</li>
                    <li className="places__option" onClick={handleFilterClick} tabIndex={0}>Price: high to low</li>
                    <li className="places__option" onClick={handleFilterClick} tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <OffersList offers={offers} selectedPlace={onCardHover} />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map cities={cities} locations={locations} selectedPlace={selectedPlace}></Map>
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
