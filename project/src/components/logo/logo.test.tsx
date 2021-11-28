import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Router } from 'react-router';
import { AppRoute } from '../../const';
import Logo from './logo';

const history = createMemoryHistory();

const fakeApp = (
  <Router history={history}>
    <Route>
      <Logo />
    </Route>
    <Route path={AppRoute.Main} exact>
      <h1>This is main page</h1>
    </Route>
  </Router>
);

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
  });

  it('should redirect to mainPage', () => {
    history.push('/fake');
    render(fakeApp);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
