import React from 'react';
import { Location, OfferMock } from '../../types/offer';
import Card from '../card/card';

type OffersListProps = {
  offers: OfferMock[];
  selectedPlace: (location: Location) => void;
}

function OffersList({ offers, selectedPlace }: OffersListProps): JSX.Element {

  const cards = offers.map((place) => (
    <Card
      offer={place}
      selectedPlace={(): void => selectedPlace(place.location)}
      key={place.id}
    />));

  return (
    <div className="cities__places-list places__list tabs__content" >
      {cards}
    </div>
  );
}

export default OffersList;
