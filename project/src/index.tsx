import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createAPI } from './api/api';
import App from './components/app/app';
import { requireAuthorization } from './store/action';
import { fetchOffersAction, checkAuthAction } from './store/api-actions';
import { AuthorizationStatus } from './const';
import { redirect } from './store/middlewares/redirect';
import { rootReducer } from './store/root-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
