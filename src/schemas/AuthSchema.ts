import { ObjectSchema } from 'realm';
export const AuthSchema: ObjectSchema = {
  name: 'AuthSchema',
  primaryKey: 'uid',
  properties: {
    uid: {
      type: 'string',
      indexed: true,
    },
    passwordMaster: 'string',
  },
};
