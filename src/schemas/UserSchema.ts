import { ObjectSchema } from 'realm';
export const UserSchema: ObjectSchema = {
  name: 'UserSchema',
  primaryKey: 'uid',
  properties: {
    uid: {
      type: 'string',
      indexed: true,
    },
    email: 'string',
    name: 'string',
    givenName: 'string',
    familyName: 'string',
    photo: 'string',
    accessToken: 'string',
    refreshToken: 'string',
  },
};
