import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { AppRoute } from '../../const';
import { initialState as authReducerAuthState } from '../../store/auth-reducer/auth-reducer';
import NotFoundScreen from './not-found-screen';

const mockStore = configureMockStore();
const store = mockStore({ AUTH: authReducerAuthState });
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <Route>
        <NotFoundScreen />
      </Route>
      <Route path={AppRoute.Main} exact>
        <h1>This is main page</h1>
      </Route>
    </Router>
  </Provider>
);

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByText(/404 Page is not found/i)).toBeInTheDocument();
  });

  it('should redirect to mainPage', () => {
    history.push('/fake');
    render(fakeApp);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('main-page-route'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
