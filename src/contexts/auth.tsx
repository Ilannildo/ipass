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
        ToastAndroid.show('Login cancelado', 2000);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ToastAndroid.show('Login em progresso', 2000);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ToastAndroid.show('Play Serviços não disponível', 2000);
      } else {
        ToastAndroid.show('Falha ao tentar login', 2000);
      }
    }
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
