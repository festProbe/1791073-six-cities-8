import { datatype, internet, name } from 'faker';
import { AuthInfo } from '../types/auth-data';

export const makeFakeUserData = (): AuthInfo => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.uuid(),
});
