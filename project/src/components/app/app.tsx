import Main from '../main/main';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import PrivateRoute from '../private-route/private-route';
import Favorites from '../favorites/favorites';
import SignIn from '../sign-in/sign-in';
import Property from '../property/property';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main />;
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <Favorites />}
        >
        </PrivateRoute>
        <Route
          path={AppRoute.SignIn}
          exact
        >
          <SignIn />
        </Route>
        <Route
          path={AppRoute.RoomWithId}
          exact
        >
          <Property />
        </Route>
        <Route><NotFoundScreen /></Route>
      </Switch>
    </BrowserRouter >
  );
}

export default App;
