import { getRealm } from '../services/realm';
import Realm from 'realm';

export type StorageSchemaType = {
  _id?: number;
  categorie: string;
  name: string;
  login: string;
  description: string;
  password: string;
  date: string;
  time: string;
  force: string;
  color: number;
};

export const getAllPasswords = async () => {
  const realm = await getRealm();
  const data = realm.objects<StorageSchemaType>('StorageSchema');
  return data;
};

export const clearStoragePassword = async () => {
  const realm = await getRealm();
  try {
    realm.write(() => {
      realm.delete(realm.objects('StorageSchema'));
      // realm.objects("Cat")
    });
  } catch (error) {
    console.log('Error ao deletar storage password', error);
  }
};

export const savePassword = (data: StorageSchemaType): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    const realm = await getRealm();
    const lastStorage = realm
      .objects<StorageSchemaType>('StorageSchema')
      .sorted('_id', true)[0];
    const highesId = Number(lastStorage === undefined ? 0 : lastStorage._id);
    data._id = highesId === undefined ? 1 : highesId + 1;
    try {
      realm.write(() => {
        realm.create<StorageSchemaType>('StorageSchema', data);
      });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const updatePassword = (data: StorageSchemaType): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    const realm = await getRealm();
    try {
      realm.write(() => {
        realm.create<StorageSchemaType>(
          'StorageSchema',
          data,
          Realm.UpdateMode.Modified,
        );
      });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
