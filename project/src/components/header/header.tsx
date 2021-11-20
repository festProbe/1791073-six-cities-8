import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus, getUserInfo } from '../../store/auth-reducer/selectors';
import Logo from '../logo/logo';

function Header(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userInfo = useSelector(getUserInfo);
  const { email } = userInfo;
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            {
              authorizationStatus === AuthorizationStatus.Auth ?
                <ul className="header__nav-list">

                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{email}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link
                      onClick={(evt) => {
                        evt.preventDefault();

                        dispatch(logoutAction());
                      }}
                      className="header__nav-link"
                      to={AppRoute.Main}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </ul> :
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.SignIn}>
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                </ul>
            }
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
