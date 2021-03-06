import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import { AppRoute, AuthorizationStatus } from '../../const';
//import { getAuthorizationStatus } from '../../store/auth-reducer/selectors';
import { State } from '../../types/state';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector(({ AUTH }: State) => AUTH.authorizationStatus);

  const { exact, path, render } = props;
  // eslint-disable-next-line no-console
  console.log(authorizationStatus);
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus === AuthorizationStatus.Auth
          ? render()
          : <Redirect to={AppRoute.SignIn} />
      )}
    />
  );
}

export default PrivateRoute;
