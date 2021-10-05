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
  handleSignIn: (password: string) => void;
};

const AuthContext = createContext<contextData>({} as contextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [signed, setSigned] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const loadStorage = useCallback(async () => {
    console.log('Iniciou o contexto');
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleSignIn = async (password: string) => {
    setLoading(true);
    if (password === 'admin') {
      setSigned(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadStorage();
  }, [loadStorage]);

  return (
    <AuthContext.Provider
      value={{
        signed,
        loading,
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
