import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ToastAndroid } from 'react-native';
import { GoogleSignin, statusCodes, User } from 'react-native-google-signin';

type contextData = {
  signed: boolean;
  loading: boolean;
  loadingSignIn: boolean;
  user: User;
  handleSignInPassword: (password: string) => void;
  handleSignInFingerprint: () => void;
  handleSignIn: () => void;
  handleSignOut: () => void;
};

const AuthContext = createContext<contextData>({} as contextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [signed, setSigned] = useState<boolean>(false);
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSignIn, setLoadingSignIn] = useState<boolean>(false);

  const loadStorage = useCallback(async () => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
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

  const handleSignIn = async () => {
    setLoadingSignIn(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User signed =>', userInfo);
      setSigned(true);
      setUser(userInfo);
    } catch (error: any) {
      console.log('Error => ', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastAndroid.show('O login foi cancelado', 2000);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ToastAndroid.show('O Login está em progresso', 2000);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ToastAndroid.show('O Play Services não está disponível', 2000);
      } else {
        ToastAndroid.show('Ocorreu um erro ao efetuar o login', 2000);
      }
    }
    setLoadingSignIn(false);
  };

  const handleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser({} as User); // Remember to remove the user from your app's state as well
      setSigned(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadStorage();
  }, [loadStorage]);

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
        user,
        loading,
        loadingSignIn,
        handleSignInPassword,
        handleSignInFingerprint,
        handleSignIn,
        handleSignOut,
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
