import { makeFakeCity, makeFakeLocation, makeOffer } from '../../mock/mock';
import { ActionType } from '../../types/action';
import { Offer } from '../../types/offer';
import { initialState, offersReducer, sortOffersBySortType } from './offers-reducer';

const cityMock = makeFakeCity();
const currentLocationMock = makeFakeLocation();
const offersMock: Offer[] = new Array(3).fill(makeOffer());
const state = initialState;
const TOP_RATED_SORT_TYPE = 'Top rated first';

describe('Reducer: offersReducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(offersReducer(initialState, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  describe('chooseCity action', () => {
    it('should change offers by chosen city', () => {
      const changeCityAction = {
        type: ActionType.ChooseCity,
        payload: cityMock,
      };
      expect(offersReducer(state, changeCityAction))
        .toEqual({ ...initialState, city: cityMock });
    });
  });

  describe('getSelectedPlace action', () => {
    it('should change currentPlace by chosen offer', () => {
      const changeSelectedPlace = {
        type: ActionType.SelectCurrentPlace,
        payload: currentLocationMock,
      };
      expect(offersReducer(state, changeSelectedPlace))
        .toEqual({ ...initialState, currentPlace: currentLocationMock });
    });
  });

  describe('loadOffers action', () => {
    it('should update offers by a given value', () => {
      const loadOffersAction = {
        type: ActionType.LoadOffers,
        payload: offersMock,
      };
      expect(offersReducer(state, loadOffersAction))
        .toEqual({ ...initialState, allOffers: offersMock });
    });
  });

  describe('getOffersByChosenCity action', () => {
    it('should filter offers by chosen city', () => {
      state.allOffers = offersMock;
      const getOffersByChosenCityAction = {
        type: ActionType.OffersFromChosenCity,
        payload: initialState.city,
      };
      expect(offersReducer(state, getOffersByChosenCityAction))
        .toEqual({ ...initialState, offers: state.allOffers.filter((offer) => offer.city.name === initialState.city) });
    });
  });

  describe('getOffersBySortType', () => {
    it('should sort offers by sort type', () => {
      state.allOffers = offersMock;
      const sortOffersBySortTypeAction = {
        type: ActionType.OffersBySortType,
        payload: TOP_RATED_SORT_TYPE,
      };
      expect(offersReducer(state, sortOffersBySortTypeAction))
        .toEqual({ ...initialState, offers: sortOffersBySortType(TOP_RATED_SORT_TYPE, state.city, state.allOffers) });
    });

    it('should return default offers if sort type is unknown', () => {
      state.allOffers = offersMock;
      const sortOffersBySortTypeAction = {
        type: ActionType.OffersBySortType,
        payload: 'UNKNOWN_SORT_TYPE',
      };
      expect(offersReducer(state, sortOffersBySortTypeAction))
        .toEqual({ ...initialState, offers: state.offers });
    });
  });

  describe('changeFavoriteStatus action', () => {
    it('should update state by offer which has changed favorite status', () => {
      state.offers = offersMock;
      const newOffer = { ...offersMock[0], isFavorite: !offersMock[0].isFavorite };
      const changeFavoriteStatus = {
        type: ActionType.ChangeFavoriteStatus,
        payload: newOffer,
      };
      expect(offersReducer(state, changeFavoriteStatus))
        .toEqual({ ...initialState, offers: [newOffer, ...offersMock.slice(1)] });
    });
  });
});
