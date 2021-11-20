
import { ActionType, Actions } from '../../types/action';
import { FavoriteReducerState } from '../../types/state';

const initialState: FavoriteReducerState = {
  offers: [],
  isLoading: false,
};

const favoriteReducer = (state: FavoriteReducerState = initialState, action: Actions): FavoriteReducerState => {
  switch (action.type) {
    case ActionType.LoadFavorites:
      return { ...state, offers: action.payload };
    case ActionType.CheckFavoritesIsLoading:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export { favoriteReducer };
