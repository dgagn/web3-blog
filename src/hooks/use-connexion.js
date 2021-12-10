import React, {useCallback, useMemo} from 'react';
import useHandleAsync from './use-handle-async';
import {isClientError, isServerError} from '../services/status';

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
