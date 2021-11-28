import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { AppRoute } from '../../const';
import FavoritesEmpty from './favorites-empty';
import { initialState as authReducerAuthState } from '../../store/auth-reducer/auth-reducer';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const store = mockStore({ AUTH: authReducerAuthState });
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <Route>
        <FavoritesEmpty />
      </Route>
      <Route path={AppRoute.Main} exact>
        <h1>This is main page</h1>
      </Route>
    </Router>
  </Provider>
);

describe('Component: Favotites-empty', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });

  it('should redirect to mainPage', () => {
    history.push('/fake');
    render(fakeApp);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('main-page'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
