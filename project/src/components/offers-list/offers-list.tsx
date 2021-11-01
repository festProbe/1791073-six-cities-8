import { useState } from 'react';
import { OfferMock } from '../../types/offer';
import Card from '../card/card';

type OffersListProps = {
  offers: OfferMock[];
}

function OffersList({ offers }: OffersListProps): JSX.Element {

  const [placeId, setActive] = useState(offers[0].id);

  //Пока не знаю куда деть placeId, поэтому просто засуну в консоль. Я так понимаю, позже он будет передаваться объекту карты
  //для отрисовки местоположения.

  // eslint-disable-next-line no-console
  console.log(placeId);

  const cards = offers.map((place) => <Card offer={place} setPlaceId={(): void => setActive(place.id)} key={place.id}></Card>);

  return (
    <div className="cities__places-list places__list tabs__content" >
      {cards}
    </div>
  );
}

export default OffersList;
