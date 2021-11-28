import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { makeOffer } from '../../mock/mock';
import { initialState as authReducerInitialState } from '../../store/auth-reducer/auth-reducer';
import { initialState as offerReducerInitialState } from '../../store/offer-reducer/offer-reducer';
import Card from './card';

const offer = makeOffer();
const selectedPlace = jest.fn();

const mockStore = configureMockStore();
const store = mockStore({ OFFER: offerReducerInitialState, AUTH: authReducerInitialState });
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <Card
        offer={offer}
        selectedPlace={selectedPlace}
      />
    </Router>
  </Provider>
);

describe('Component: Card', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByAltText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(offer.type)).toBeInTheDocument();
  });

  it('should redirect to property url when clicked to link', () => {
    history.push('/fake');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.Room + offer.id} exact>
              <h1>This is card info</h1>
            </Route>
            <Route>
              <Card offer={offer}
                selectedPlace={selectedPlace}
              />
            </Route>
          </Switch>
        </Router>
      </Provider >);

    expect(screen.queryByText(/This is card info/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('card-info-page'));
    expect(screen.queryByText(/This is card info/i)).toBeInTheDocument();
  });

  it('onChange should called when user hover on card', () => {
    render(fakeApp);

    userEvent.hover(screen.getByTestId('card-hover'));
    expect(selectedPlace).toBeCalled();
  });
});
