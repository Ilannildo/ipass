import React, { createContext, useContext, useEffect, useState } from 'react';
import Realm, { Results } from 'realm';
import { getRealm } from '../services/realm';

type Props = {
  storage: Results<StorageSchemaType>;
  loading: boolean;
  savePassword: (data: StorageSchemaType) => Promise<boolean>;
  updatePassword: (data: StorageSchemaType) => Promise<boolean>;
};

type StorageSchemaType = {
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

export const StorageContext = createContext<Props>({} as Props);

export const StorageProvider: React.FC = ({ children }) => {
  const [storage, setStorage] = useState<Results<StorageSchemaType>>([] as any);
  const [loading, setLoading] = useState(false);

  const getStorage = async () => {
    setLoading(true);
    const realm = await getRealm();
    const data = realm
      .objects<StorageSchemaType>('StorageSchema')
      .sorted('date', true);
    // setStorageFiltered(data);
    setStorage(data);
    try {
      console.log('Buscou novamente');
      data.addListener(() => {
        // setStorageFiltered(data);
        setStorage(data);
      });
    } catch (error) {
      console.log('Erro ao buscar storage');
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      data.removeAllListeners();
      realm.close();
    };
  };

  useEffect(() => {
    getStorage();
    // clearStoragePassword();
  }, []);

  console.log('Tamanho do storage =>', storage.length);

  const savePassword = (data: StorageSchemaType): Promise<boolean> => {
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
        console.log('Tamanho do storage =>', storage.length);
        if (!lastStorage) {
          console.log('Primeira senha a ser salva');
          await getStorage();
        }
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const clearStoragePassword = async () => {
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

  const updatePassword = (data: StorageSchemaType): Promise<boolean> => {
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
        // await getStorage();
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <StorageContext.Provider
      value={{ storage, loading, savePassword, updatePassword }}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = () => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorage must be used within an AuthProvider.');
  }
  return context;
};
