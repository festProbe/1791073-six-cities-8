import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState as authReducerInitialState } from '../../store/auth-reducer/auth-reducer';
import { initialState as offersReducerInitialState } from '../../store/offers-reducer/offers-reducer';
import { makeOffer } from '../../mock/mock';
import Main from './main';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

const offers = new Array(3).fill(makeOffer());

const mockStore = configureMockStore();
const store = mockStore({ AUTH: authReducerInitialState, OFFERS: { ...offersReducerInitialState, offers: offers } });
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <Main />
    </Router>
  </Provider>
);

describe('Component: Main', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
  });
});
