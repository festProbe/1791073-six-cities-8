import React from 'react';
import { useRouteMatch } from 'react-router';
import { Location, Offer } from '../../types/offer';
import { getListClass } from '../../utils';
import Card from '../card/card';

type OffersListProps = {
  offers: Offer[];
  selectedPlace: (place: Location) => void;
  setOffer: (offer: Offer) => void;
}

function OffersList({ offers, selectedPlace, setOffer }: OffersListProps): JSX.Element {

  const match = useRouteMatch();

  const cards = offers.map((place) => (
    <Card
      offer={place}
      setOffer={(): void => setOffer(place)}
      selectedPlace={(): void => selectedPlace(place.location)}
      key={place.id}
    />));

  return (
    <div
      className={getListClass(match.path)}
    >
      {cards}
    </div>
  );
}

export default OffersList;
