import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { generateOffer } from './mocks/offer';

const OFFERS_COUNT = 4;

const offers = new Array(OFFERS_COUNT).fill('').map((el, index: number) => generateOffer(index));
const neighbourhoodPlaces = offers.slice(0, 3);

ReactDOM.render(
  <React.StrictMode>
    <App offers={offers} neighbourhoodPlaces={neighbourhoodPlaces} />
  </React.StrictMode>,
  document.getElementById('root'));
