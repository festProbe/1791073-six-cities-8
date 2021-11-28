import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { makeOffer } from '../../mock/mock';
import { initialState as authReducerInitialState } from '../../store/auth-reducer/auth-reducer';
import { initialState as offersReducerInitialState } from '../../store/offers-reducer/offers-reducer';
import OffersList from './offers-list';

const offers = new Array(3).fill(makeOffer());
const selectedPlace = jest.fn();

const mockStore = configureMockStore();
const store = mockStore({ OFFERS: offersReducerInitialState, AUTH: authReducerInitialState });
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <OffersList offers={offers} selectedPlace={selectedPlace} />
    </Router>
  </Provider>
);

describe('Component: OfferList', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByTestId('offer-list')).toBeInTheDocument();
  });
});
