import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type contextData = {
  signed: boolean;
  loading: boolean;
  handleSignInPassword: (password: string) => void;
  handleSignInFingerprint: () => void;
  handleSignIn: () => void;
};

type UserProps = {
  name: string;
  email: string;
};

// scopes: [
//   'https://www.googleapis.com/auth/drive',
//   'https://www.googleapis.com/auth/drive.file',
//   'https://www.googleapis.com/auth/drive.appdata',
//   'https://www.googleapis.com/auth/drive.metadata',
//   'https://www.googleapis.com/auth/drive.readonly',
//   'https://www.googleapis.com/auth/drive.metadata.readonly',
//   'https://www.googleapis.com/auth/drive.apps.readonly',
//   'https://www.googleapis.com/auth/drive.photos.readonly',
// ],

const AuthContext = createContext<contextData>({} as contextData);

export const AuthProvider: React.FC = ({ children }) => {
  // const [signed, setSigned] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);
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

  const handleSignIn = async () => {};

  useEffect(() => {
    loadStorage();
  }, [loadStorage]);

  return (
    <AuthContext.Provider
      value={{
        signed: !user,
        loading,
        handleSignInPassword,
        handleSignInFingerprint,
        handleSignIn,
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
