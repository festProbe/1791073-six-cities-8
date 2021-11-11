import Main from '../main/main';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import Favorites from '../favorites/favorites';
import SignIn from '../sign-in/sign-in';
import Property from '../property/property';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { OfferMock } from '../../types/offer';
import { State } from '../../types/state';
import { Dispatch } from 'redux';
import { choosenCity, offersFromChosenCity } from '../../store/action';
import { Actions } from '../../types/action';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = ({ city, offers }: State) => ({
  city,
  offers,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  rerenderOffersFromChosenCity(city: string | null) {
    dispatch(choosenCity(city));
    dispatch(offersFromChosenCity());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux): JSX.Element {
  const { city, offers, rerenderOffersFromChosenCity } = props;
  const favorites: OfferMock[] = offers.filter((offer) => offer.isFavorite);
  const neighbourhoodPlaces: OfferMock[] = offers.slice(0, 3);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main
            city={city}
            offers={offers}
            chooseCity={rerenderOffersFromChosenCity}
          />;
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <Favorites favorites={favorites} />}
          authorizationStatus={AuthorizationStatus.Auth}
        >
        </PrivateRoute>
        <Route path={AppRoute.SignIn} exact>
          <SignIn />
        </Route>
        <Route path={AppRoute.Room} exact>
          <Property
            neighbourhoodPlaces={neighbourhoodPlaces}
            addReview={() => {
              throw new Error('Function \'addReview\' isn\'t implemented.');
            }}
          />
        </Route>
        <Route><NotFoundScreen /></Route>
      </Switch>
    </BrowserRouter >
  );
}

export { App };
export default connector(App);
