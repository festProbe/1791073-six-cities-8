import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const AMSTERDAM_PLACES_COUNT = 5;

ReactDOM.render(
  <React.StrictMode>
    <App placesCount={AMSTERDAM_PLACES_COUNT} />
  </React.StrictMode>,
  document.getElementById('root'));
