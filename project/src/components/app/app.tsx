import Main from '../main/main';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import Favorites from '../favorites/favorites';
import SignIn from '../sign-in/sign-in';
import Property from '../property/property';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { State } from '../../types/state';
import { Dispatch } from 'redux';
import { choosenCity, offersFromChosenCity } from '../../store/action';
import { Actions } from '../../types/action';
import { connect, ConnectedProps } from 'react-redux';
import LoadingScreen from '../loading-screen/loading-screen';
import { useState } from 'react';
import { Offer } from '../../types/offer';

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

const mapStateToProps = ({ authorizationStatus, isDataLoaded }: State) => ({
  authorizationStatus,
  isDataLoaded,
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
  const [offer, setOffer] = useState<Offer | null>(null);

  const { authorizationStatus, isDataLoaded } = props;
  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main setOffer={setOffer} />;
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <Favorites />}
          authorizationStatus={AuthorizationStatus.Auth}
        >
        </PrivateRoute>
        <Route path={AppRoute.SignIn} exact>
          <SignIn />
        </Route>
        <Route path={AppRoute.Room} exact>
          <Property
            offer={offer}
            setOffer={setOffer}
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
