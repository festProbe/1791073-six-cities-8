import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { AppRoute } from '../../const';
import { initialState as authReducerInitialState } from '../../store/auth-reducer/auth-reducer';
import { initialState as favoritesReducerInitialState } from '../../store/favorites-reducer/favorites-reducer';
import userEvent from '@testing-library/user-event';
import Favorites from './favorites';
import { makeOffer } from '../../mock/mock';

const offers = new Array(3).fill(makeOffer());

const mockStore = configureMockStore();
const store = mockStore({ AUTH: authReducerInitialState, FAVORITE: { ...favoritesReducerInitialState, offers: offers } });
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <Route>
        <Favorites />
      </Route>
      <Route path={AppRoute.Main} exact>
        <h1>This is main page</h1>
      </Route>
    </Router>
  </Provider>
);

describe('Component: Favotites', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should redirect to mainPage', () => {
    history.push('/fake');
    render(fakeApp);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('main-page-route'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
