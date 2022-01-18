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
    description: 'string',
    password: 'string',
    date: 'string',
    time: 'string',
    color: 'int',
    force: 'string',
  },
};
