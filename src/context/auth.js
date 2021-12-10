import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import * as auth from '../services/auth';
import Loading from '../pages/loading';
import useHandleAsync from '../hooks/use-handle-async';
import {globalEmitter} from '../emitter';

const AuthContext = createContext(undefined);
AuthContext.displayName = 'AuthContext';

function AuthProvider({children}) {
  const {
    data: user,
    setData,
    isLoading,
    isIdle,
    isError,
    error,
    run,
  } = useHandleAsync();

  useEffect(() => {
    const userPromise = auth.getUser();
    run(userPromise);
  }, [run]);

  const login = useCallback(
    credentials => auth.login(credentials).then(user => setData(user)),
    [setData],
  );
  const register = useCallback(
    credentials =>
      auth.register(credentials).then(() => {
        login(credentials).then(() => {
          globalEmitter.emit('registered', credentials);
        });
      }),
    [login],
  );

  const logout = useCallback(() => {
    auth.logout();
    setData(null);
  }, [setData]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      register,
    }),
    [login, user, logout, register],
  );

  if (isLoading || isIdle) {
    return <Loading />;
  }

  if (isError) {
    if (error?.status === 401) {
      logout();
    }
    return <>Erreur...</>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('useAuth must be used inside the AuthProvider');
  return context;
}

export {AuthProvider, useAuth};
