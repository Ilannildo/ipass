import { ObjectSchema } from 'realm';
export const StorageSchema: ObjectSchema = {
  name: 'StorageSchema',
  primaryKey: '_id',
  properties: {
    _id: {
      type: 'int',
      indexed: true,
    },
    categorie: 'string',
    name: 'string',
    login: 'string',
    password: 'string',
    date: 'string',
    time: 'string',
    color: 'string',
    force: 'string',
  },
};
