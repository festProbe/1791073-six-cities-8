import { createAPI } from '../api/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from 'redux';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { AuthData } from '../types/auth-data';
import { fetchFavoritesOffers, fetchOfferAction, fetchOffersAction, loginAction, logoutAction, postFavoriteStatus, sendReview } from './api-actions';
import { changeFavoriteStatus, checkIsLoadedOffer, getOffersFromChosenCity, loadComments, loadFavorites, loadNearby, loadOffer, loadOffers, redirectToRoute, requireAuthorization, requireLogout } from './action';
import { makeCommentFromServer, makeOffer, makeOfferFromServer } from '../mock/mock';
import { AdaptCommentToClient, AdaptToClient } from '../utils';
import { OfferFromServer } from '../types/offer';
import { SendCommentType } from '../types/comment';

describe('Async actions', () => {
  const onFakeUnathorized = jest.fn;
  const api = createAPI(onFakeUnathorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should set authorization status AUTH when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);
    expect(store.getActions()).toEqual([]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = { login: 'test@test.ru', password: '123dqwd456' };
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, { token: 'secret' });

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
      redirectToRoute(AppRoute.Main),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-sities-token', 'secret');
  });

  it('should dispatch load offers when GET /hotels', async () => {
    const mockOffers = Array(5).fill(makeOffer());
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    const store = mockStore();
    await store.dispatch(fetchOffersAction());

    expect(store.getActions()).toEqual([
      loadOffers(mockOffers.map((offer) => AdaptToClient(offer))),
      getOffersFromChosenCity(),
    ]);
  });

  it('should dispatch load offer, comments and nearby offers when GET /hotels/:id', async () => {
    const mockOfferFromServer: OfferFromServer = makeOfferFromServer();
    const id = mockOfferFromServer.id;
    const mockComments = new Array(4).fill(makeCommentFromServer());
    const mockNearbyOffers = new Array(3).fill(makeOfferFromServer());

    mockAPI
      .onGet(APIRoute.Offer + id)
      .reply(200, mockOfferFromServer);

    mockAPI
      .onGet(APIRoute.Comments + id)
      .reply(200, mockComments);

    mockAPI
      .onGet(APIRoute.Offer + id + APIRoute.Nearby)
      .reply(200, mockNearbyOffers);

    const store = mockStore();
    await store.dispatch(fetchOfferAction(id));

    expect(store.getActions()).toEqual([
      checkIsLoadedOffer(false),
      loadOffer(AdaptToClient(mockOfferFromServer)),
      loadComments(mockComments.map((comment) => AdaptCommentToClient(comment))),
      loadNearby(mockNearbyOffers.map((nearbyOffer) => AdaptToClient(nearbyOffer))),
      checkIsLoadedOffer(true),
    ]);
  });

  it('should dispatch loadComments when POST /comments/id', async () => {
    const mockOffer = makeOffer();
    const id = mockOffer.id;
    const fakeReview: SendCommentType = { id: id, comment: 'Some text', rating: 4 };
    const mockComments = [makeCommentFromServer()];

    mockAPI
      .onPost(APIRoute.Comments + id, {
        comment: fakeReview.comment,
        rating: fakeReview.rating,
      })
      .reply(200, mockComments);

    const store = mockStore();
    await store.dispatch(sendReview(fakeReview));

    expect(store.getActions()).toEqual([
      loadComments(mockComments.map((comment) => AdaptCommentToClient(comment))),
    ]);
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    expect(store.getActions()).toEqual([requireLogout()]);
    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-sities-token');
  });

  it('should dispatch loadFavorites when GET /favorites', async () => {
    const mockOffers = new Array(3).fill(makeOfferFromServer());

    mockAPI
      .onGet(APIRoute.Favorites)
      .reply(200, mockOffers);

    const store = mockStore();
    await store.dispatch(fetchFavoritesOffers());

    expect(store.getActions()).toEqual([
      loadFavorites(mockOffers.map((offer) => AdaptToClient(offer))),
    ]);
  });

  it('should dispatch changeFavoriteStatus and fetchFavorites when POST /favorites/:id/:favoriteStatus', async () => {
    const mockFavoriteOffer = makeOfferFromServer();
    const id = mockFavoriteOffer.id;
    const favoriteStatus = 0;

    mockAPI
      .onPost(`${APIRoute.Favorites}/${id}/${favoriteStatus}`)
      .reply(200, mockFavoriteOffer);

    const store = mockStore();
    await store.dispatch(postFavoriteStatus(id, favoriteStatus));

    expect(store.getActions()).toEqual([
      changeFavoriteStatus(AdaptToClient(mockFavoriteOffer)),
    ]);
  });
});
