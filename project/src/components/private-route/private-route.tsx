import { connect, ConnectedProps } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
import { AppRoute, AuthorizationStatus } from '../../const';
import { State } from '../../types/state';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
}

const mapStateToProps = ({ authorizationStatus }: State) => ({
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedElementProps = PrivateRouteProps & PropsFromRedux;

function PrivateRoute(props: ConnectedElementProps): JSX.Element {
  const { exact, path, render, authorizationStatus } = props;
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

export { PrivateRoute };
export default connector(PrivateRoute);
