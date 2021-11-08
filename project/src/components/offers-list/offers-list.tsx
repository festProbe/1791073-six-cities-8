import React from 'react';
import { useRouteMatch } from 'react-router';
import { Location, OfferMock } from '../../types/offer';
import { getListClass } from '../../utils';
import Card from '../card/card';

type OffersListProps = {
  offers: OfferMock[];
  selectedPlace: (place: Location) => void;
}

function OffersList({ offers, selectedPlace }: OffersListProps): JSX.Element {

  const match = useRouteMatch();

  const cards = offers.map((place) => (
    <Card
      offer={place}
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
