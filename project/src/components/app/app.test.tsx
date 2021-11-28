import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import App from './app';
import { initialState as offersReducerInitialState } from '../../store/offers-reducer/offers-reducer';
import { initialState as authReducerInitialState } from '../../store/auth-reducer/auth-reducer';

const mockStore = configureMockStore();

const store = mockStore({
  OFFERS: offersReducerInitialState,
  AUTH: { ...authReducerInitialState, authorizationStatus: AuthorizationStatus.Auth, isDataLoaded: true },
});

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store} >
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });

  it('should render "AuthScreen" when user navigate to "/sign-in"', () => {
    const loginStore = mockStore({ AUTH: { ...authReducerInitialState, authorizationStatus: AuthorizationStatus.NoAuth, isDataLoaded: true } });
    const fakeLogin = (
      <Provider store={loginStore} >
        <Router history={history}>
          <App />
        </Router>
      </Provider >
    );
    history.push(AppRoute.SignIn);
    render(fakeLogin);

    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to unknown link', () => {
    history.push('/unknown');
    render(fakeApp);

    expect(screen.getByText('404 Page is not found')).toBeInTheDocument();
    expect(screen.getByText('We could not find page available at this address.')).toBeInTheDocument();
  });
});
