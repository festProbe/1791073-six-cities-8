import { AuthorizationStatus } from '../../const';
import { AuthInfo } from '../../types/auth-data';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.Auth].authorizationStatus;
export const getIsDataLoaded = (state: State): boolean => state[NameSpace.Auth].isDataLoaded;
export const getUserInfo = (state: State): AuthInfo => state[NameSpace.Auth].userInfo;
