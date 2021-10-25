import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ToastAndroid } from 'react-native';
import { GoogleSignin, statusCodes, User } from 'react-native-google-signin';
import { api } from '../services/api';
import { getRealm } from '../services/realm';

type contextData = {
  signed: boolean;
  authenticated: boolean;
  loading: boolean;
  loadingSignIn: boolean;
  user: UserStorageType;
  handleSignInPassword: (password: string) => void;
  handleSignInFingerprint: () => void;
  handleSignIn: () => void;
  handleSignOut: () => void;
  savePasswordStorage: (uid: string, passwordMaster: string) => void;
};

type UserStorageType = {
  uid: string;
  email: string;
  name: string;
  givenName?: string;
  familyName?: string;
  photo?: string;
  accessToken: string;
  refreshToken: string;
};

type AuthSchemaType = {
  uid: string;
  passwordMaster: string;
};

type UserResponse = {
  data: {
    message: string;
    accessToken: string;
    isCreated: boolean;
    refreshToken: {
      id: string;
      expiresIn: number;
      userId: number;
    };
    user: {
      uid: string;
      sub: string;
      email: string;
      name: string;
      givenName?: string;
      familyName?: string;
      photo?: string;
      password?: string;
      active?: boolean;
      createdAt?: Date;
      updatedAt?: Date;
    };
  };
};

const AuthContext = createContext<contextData>({} as contextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [signed, setSigned] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  // Informações do usuário do google
  const [googleUser, setGoogleUser] = useState<User>({} as User);

  // Informações do usuário do servidor
  const [userSigned, setUserSigned] = useState<UserStorageType>(
    {} as UserStorageType,
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSignIn, setLoadingSignIn] = useState<boolean>(false);

  const isSignedInGoogle = useCallback(async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      try {
        const userInfo = await GoogleSignin.signInSilently();
        setGoogleUser(userInfo);
      } catch (err: any) {
        if (err.code === statusCodes.SIGN_IN_REQUIRED) {
          // user has not signed in yet
          console.log('GET USER INFO => Usuario ainda não se inscreveu', err);
        } else {
          console.log('GET USER INFO => Outro erro', err);
        }
      }
    } else {
      console.log('nenhum usuário logado');
    }
  }, []);

  const handleSignInPassword = async (password: string) => {
    setLoading(true);
    if (password === 'admin') {
      // setSigned(true);
    }
    setLoading(false);
  };

  const handleSignInFingerprint = async () => {
    // setSigned(true);
  };

  async function saveUserStorage(data: UserResponse) {
    const realm = await getRealm();

    realm.write(() => {
      realm.create('UserSchema', {
        uid: data.data.user.uid,
        email: data.data.user.email,
        name: data.data.user.name,
        givenName: data.data.user.givenName,
        familyName: data.data.user.familyName,
        photo: data.data.user.photo,
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken.id,
      });
    });
  }

  async function savePasswordStorage(uid: string, passwordMaster: string) {
    const realm = await getRealm();

    realm.write(() => {
      realm.create('AuthSchema', {
        uid,
        passwordMaster,
      });
    });
    setSigned(true);
  }

  const handleSignIn = async () => {
    setLoadingSignIn(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      const response = await api.post<UserResponse>('/auth', {
        idToken: userInfo.idToken,
      });

      await saveUserStorage(response.data);
      setGoogleUser(userInfo);
      setUserSigned({
        accessToken: response.data.data.accessToken,
        email: response.data.data.user.email,
        familyName: response.data.data.user.familyName,
        givenName: response.data.data.user.givenName,
        name: response.data.data.user.name,
        photo: response.data.data.user.photo,
        refreshToken: response.data.data.refreshToken.id,
        uid: response.data.data.user.uid,
      });
      setAuthenticated(true);
    } catch (error: any) {
      console.log('Error => ', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastAndroid.show('O login com o Google foi cancelado', 2000);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ToastAndroid.show('O Login com o Google está em progresso', 2000);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ToastAndroid.show('O Play Services não está disponível', 2000);
      } else {
        ToastAndroid.show('Verifique sua conexão com a internet', 2000);
      }
    }
    setLoadingSignIn(false);
  };

  const removeStorage = async () => {
    const realm = await getRealm();
    realm.write(() => {
      realm.deleteAll();
    });
  };

  const handleSignOut = async () => {
    try {
      // Desloga o user no google
      await GoogleSignin.signOut();

      // Falta Deslogar no backend

      // Deleta os dados do dispositivo
      await removeStorage();

      // Remove do estado
      setGoogleUser({} as User); // Remember to remove the user from your app's state as well
      setUserSigned({} as UserStorageType); // Remember to remove the user from your app's state as well
      setSigned(false);
      setAuthenticated(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getUserStorage = async () => {
      setLoading(true);
      const realm = await getRealm();
      const data = realm.objects<UserStorageType>('UserSchema');
      if (data[0]?.accessToken) {
        setUserSigned({
          accessToken: data[0].accessToken,
          email: data[0].email,
          familyName: data[0].familyName,
          givenName: data[0].givenName,
          name: data[0].name,
          photo: data[0].photo,
          refreshToken: data[0].refreshToken,
          uid: data[0].uid,
        });
        setAuthenticated(true);
        getPasswordStorage();
      }
      setLoading(false);
    };

    const getPasswordStorage = async () => {
      const realm = await getRealm();
      const data = realm.objects<AuthSchemaType>('AuthSchema');
      if (data[0]?.passwordMaster) {
        setSigned(true);
      }
    };
    getUserStorage();
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: [
        'https://www.googleapis.com/auth/drive.appdata',
        'https://www.googleapis.com/auth/drive.file',
      ],
      webClientId:
        '437496021539-2cbpojqe52so5vsobi88mhmi8i2qrmch.apps.googleusercontent.com',
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signed,
        authenticated,
        user: userSigned,
        loading,
        loadingSignIn,
        handleSignInPassword,
        handleSignInFingerprint,
        handleSignIn,
        handleSignOut,
        savePasswordStorage,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
};
