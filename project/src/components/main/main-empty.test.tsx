import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { AppRoute } from '../../const';
import { initialState as authReducerAuthState } from '../../store/auth-reducer/auth-reducer';
import MainEmpty from './main-empty';

const mockStore = configureMockStore();
const store = mockStore({ AUTH: authReducerAuthState });
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <Route>
        <MainEmpty />
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
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });
});
