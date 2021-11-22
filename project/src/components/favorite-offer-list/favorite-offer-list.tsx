import { Link } from 'react-router-dom';
import { AppRoute, CITIES } from '../../const';
import FavoriteOfferItem from '../../favorite-offer-item/favorite-offer-item';
import { Offer } from '../../types/offer';

type FavoriteOfferListProps = {
  offers: Offer[];
}

function FavoriteOfferList({ offers }: FavoriteOfferListProps): JSX.Element {
  const getFavoriteOffersBySity = (city: string) => {
    const offersBySity = offers.filter((offer) => offer.city.name === city);
    return offersBySity;
  };

  const favoritesByCities = CITIES.map((city) => getFavoriteOffersBySity(city));

  const favoritesListElements = favoritesByCities.map((favoritesList) => {
    if (favoritesList.length > 0) {
      return (
        <li className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>{favoritesList[0].city.name}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {favoritesList.map((favoriteItem) => <FavoriteOfferItem key={favoriteItem.id} offer={favoriteItem} />)}
          </div>
        </li>
      );
    }
    else {
      return '';
    }
  });

  return (
    <ul className="favorites__list">
      {favoritesListElements}
    </ul>
  );
}

export default FavoriteOfferList;
