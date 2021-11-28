import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { AppRoute } from '../../const';
import { initialState } from '../../store/auth-reducer/auth-reducer';
import SignIn from './sign-in';

const mockStore = configureMockStore();
const store = mockStore({ AUTH: initialState });
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <Route>
        <SignIn />
      </Route>
      <Route path={AppRoute.Main} exact>
        <h1>This is main page</h1>
      </Route>
    </Router>
  </Provider>
);

describe('Component: SugnIn', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
  });

  it('should redirect to mainPage', () => {
    history.push('/fake');
    render(fakeApp);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('Go to main'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
