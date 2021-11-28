import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeOffer } from '../../mock/mock';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import Map from './map';

const offers = new Array(3).fill(makeOffer());

const mockStore = configureMockStore();
const store = mockStore({});
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <Map
        offers={offers}
        currentPlace={offers[0].location}
      />
    </Router>
  </Provider>
);

describe('Component: Map', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByTestId(/map/i)).toBeInTheDocument();
  });
});
