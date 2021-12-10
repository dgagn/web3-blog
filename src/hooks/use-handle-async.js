import {useCallback, useReducer, useRef} from 'react';
import useSafeFunction from './use-safe-function';

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

export default useHandleAsync;
