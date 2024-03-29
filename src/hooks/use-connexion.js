import {useCallback, useMemo} from 'react';
import useHandleAsync from './use-handle-async';
import {isClientError, isServerError} from '../services/status';

/**
 * Uses the connexion hook to make an api call to connect.
 *
 * @param {*} fn the fn to run
 * @return {{isLoading: boolean, handleSubmit: ((function(*): void)|*), isError: boolean, getErrorMessage: (string|string)}}
 */
function useConnexion(fn) {
  const {run, isLoading, isError, error} = useHandleAsync();

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (isLoading) return;
      const {email, password} = e.target.elements;
      run(
        fn({
          remember_me: true,
          email: email.value,
          password: password.value,
        }),
      );
    },
    [fn, isLoading, run],
  );

  const getErrorMessage = useMemo(() => {
    return isError && error?.status
      ? isClientError(error.status)
        ? `Le compte n'est pas valide`
        : isServerError(error.status)
        ? `Le serveur n'est pas valide`
        : `Une erreur c'est produit`
      : ``;
  }, [isError, error]);

  return {
    getErrorMessage,
    handleSubmit,
    isLoading,
    isError,
  };
}

export default useConnexion;
