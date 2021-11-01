import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { generateOffer } from './mocks/offer';

const OFFERS_COUNT = 4;

const offers = new Array(OFFERS_COUNT).fill('').map(generateOffer);

ReactDOM.render(
  <React.StrictMode>
    <App offers={offers} />
  </React.StrictMode>,
  document.getElementById('root'));
