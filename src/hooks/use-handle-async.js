import {useCallback, useReducer, useRef} from 'react';
import useSafeFunction from './use-safe-function';

/**
 * Main function to handle async calls.
 *
 * @param {*} initialState the initial state
 * @return {{isLoading: boolean, isError: boolean, data: *, setData: (function(*): *), setLoading: (function(): *), setError: (function(*): *), isIdle: boolean, run: (function(*): *), error: *, isSuccess: boolean}}
 */
function useHandleAsync(initialState) {
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
  const setLoading = useCallback(
    () => safeSetState({status: 'pending'}),
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
    setLoading,
  };
}

export default useHandleAsync;
