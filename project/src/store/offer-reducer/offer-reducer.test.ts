import { makeComment, makeOffer } from '../../mock/mock';
import { ActionType } from '../../types/action';
import { Comment } from '../../types/comment';
import { Offer } from '../../types/offer';
import { initialState, offerReducer } from './offer-reducer';

const offerMock: Offer = makeOffer();
const commentsMock: Comment[] = new Array(3).fill(makeComment());
const nearbyOffersMock: Offer[] = new Array(3).fill(makeOffer());

describe('Reducer: offerReducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(offerReducer(initialState, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  describe('loadOffer action', () => {
    it('should update offer by a given value', () => {
      const state = initialState;
      const loadOfferAction = {
        type: ActionType.LoadOffer,
        payload: offerMock,
      };
      expect(offerReducer(state, loadOfferAction))
        .toEqual({ ...initialState, offer: offerMock });
    });
  });

  describe('loadComments action', () => {
    it('should update comments by a given value', () => {
      const state = initialState;
      const loadCommentAction = {
        type: ActionType.LoadComments,
        payload: commentsMock,
      };
      expect(offerReducer(state, loadCommentAction))
        .toEqual({ ...initialState, comments: commentsMock });
    });
  });

  describe('loadNearby action', () => {
    it('should update nearbyOffers by a given value', () => {
      const state = initialState;
      const loadNearbyAction = {
        type: ActionType.LoadNearby,
        payload: nearbyOffersMock,
      };
      expect(offerReducer(state, loadNearbyAction))
        .toEqual({ ...initialState, nearbyOffers: nearbyOffersMock });
    });
  });

  describe('changeFavoriteStatus action', () => {
    it('should update offer which has changed favorite status', () => {
      const state = { ...initialState, offer: offerMock };
      const newOffer = { ...offerMock, isFavorite: !offerMock.isFavorite };
      const changeFavoriteStatus = {
        type: ActionType.ChangeFavoriteStatus,
        payload: newOffer,
      };
      expect(offerReducer(state, changeFavoriteStatus))
        .toEqual({ ...initialState, offer: newOffer });
    });
  });

  describe('chackIsLoadedOffer action', () => {
    it('should set loaded status', () => {
      const state = initialState;
      const isLoadedAction = {
        type: ActionType.CheckIsLoadedOffer,
        payload: true,
      };
      expect(offerReducer(state, isLoadedAction))
        .toEqual({ ...initialState, isLoaded: true });
    });
  });
});
