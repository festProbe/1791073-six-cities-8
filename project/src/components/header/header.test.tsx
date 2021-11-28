import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { AppRoute } from '../../const';
import { initialState as authReducerInitialState } from '../../store/auth-reducer/auth-reducer';
import Header from './header';

const mockStore = configureMockStore();
const store = mockStore({ AUTH: authReducerInitialState });
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <Route>
        <Header />
      </Route>
      <Route path={AppRoute.SignIn} exact>
        <h1>This is sign in page</h1>
      </Route>
    </Router>
  </Provider>
);

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should redirect to sign in', () => {
    history.push('/fake');
    render(fakeApp);

    expect(screen.queryByText(/This is sign in page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('sign-in-page'));
    expect(screen.queryByText(/This is sign in page/i)).toBeInTheDocument();
  });
});
