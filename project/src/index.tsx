import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createAPI } from './api/api';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app/app';
import { reducer } from './store/reducer';
import { requireAuthorization } from './store/action';
import { fetchOfferAction, checkAuthAction } from './store/api-actions';
import { ThunkAppDispatch } from './types/action';
import { AuthorizationStatus } from './const';
import { redirect } from './store/middlewares/redirect';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOfferAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
