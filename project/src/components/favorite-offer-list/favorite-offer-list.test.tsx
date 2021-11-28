import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { AppRoute } from '../../const';
import { makeOffer } from '../../mock/mock';
import FavoriteOfferList from './favorite-offer-list';

const favoriteOffers = new Array(3).fill(makeOffer());

const mockStore = configureMockStore();
const store = mockStore({});
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <Route>
        <FavoriteOfferList offers={favoriteOffers} />
      </Route>
      <Route path={AppRoute.Main} exact>
        <h1>This is main page</h1>
      </Route>
    </Router>
  </Provider>
);

describe('Component: Favotites-list', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByText(favoriteOffers[0].city.name)).toBeInTheDocument();
  });

  it('should redirect to main', () => {
    history.push('/fake');
    render(fakeApp);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('main-page'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });

});
