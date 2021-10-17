import MainPage from '../main/main';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import Favorites from '../favorites/favorites';
import SignIn from '../sign-in/sign-in';
import Property from '../property/property';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type MainPageProps = {
  placesCount: number,
}

function App({ placesCount }: MainPageProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <MainPage placesCount={placesCount}></MainPage>;
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <Favorites />}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
        <Route path={AppRoute.SignIn} exact>
          <SignIn></SignIn>
        </Route>
        <Route path={AppRoute.Room} exact>
          <Property></Property>
        </Route>
        <Route><NotFoundScreen /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
