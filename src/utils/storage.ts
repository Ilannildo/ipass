import { getRealm } from '../services/realm';

export type StorageSchemaType = {
  _id?: number;
  categorie: string;
  name: string;
  login: string;
  password: string;
  date: string;
  time: string;
  force: string;
  color: string;
};

export const getAllPasswords = async () => {
  const realm = await getRealm();
  const data = realm.objects<StorageSchemaType>('StorageSchema');
  return data;
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
