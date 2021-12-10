import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import * as auth from '../services/auth';
import Loading from '../pages/loading';

const AuthContext = createContext(undefined);
AuthContext.displayName = 'AuthContext';

function useSafeFunction(dispatch) {
  const mounted = useRef(false);
  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch],
  );
}

export function useHandleAsync(initialState) {
  const ref = useRef({
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  });
  const [{status, data, error}, setState] = useReducer(
    (prev, next) => ({...prev, ...next}),
    ref.current,
  );
  const safeSetState = useSafeFunction(setState);
  const setData = useCallback(
    data => safeSetState({data, status: 'resolved'}),
    [safeSetState],
  );
  const setError = useCallback(
    error => safeSetState({error, status: 'rejected'}),
    [safeSetState],
  );

  const run = useCallback(
    promise => {
      if (!promise || !promise.then)
        throw new Error('useHandleAsync did not receive a promise');
      safeSetState({status: 'pending'});
      return promise.then(
        data => {
          setData(data);
          return data;
        },
        error => {
          setError(error);
          return Promise.reject(error);
        },
      );
    },
    [safeSetState, setData, setError],
  );

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',
    setData,
    setError,
    data,
    run,
    error,
  };
}

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
    credentials => auth.register(credentials).then(user => setData(user)),
    [setData],
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
