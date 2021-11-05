import MainPage from '../main/main';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import Favorites from '../favorites/favorites';
import SignIn from '../sign-in/sign-in';
import Property from '../property/property';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { OfferMock } from '../../types/offer';

type OffersProps = {
  offers: OfferMock[]
}

function App({ offers }: OffersProps): JSX.Element {

  const favorites: OfferMock[] = offers.filter((offer) => offer.isFavorite);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <MainPage offers={offers} />;
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
          <Property addReview={() => {
            throw new Error('Function \'addReview\' isn\'t implemented.');
          }}
          />
        </Route>
        <Route><NotFoundScreen /></Route>
      </Switch>
    </BrowserRouter >
  );
}

export default App;
