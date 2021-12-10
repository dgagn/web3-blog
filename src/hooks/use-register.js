import React, {useCallback, useEffect, useMemo, useState} from 'react';
import useHandleAsync from './use-handle-async';
import {isClientError} from '../services/status';

function validatePasswords(firstPass, secondPass) {
  return firstPass === secondPass;
}

function useRegister(fn) {
  const {run, isLoading, error} = useHandleAsync();

  const [isPassMatch, setIsPassMatch] = useState(true);
  const [isEmailError, setIsEmailError] = useState('');

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      const {
        confirm: {value: confirm},
        password: {value: password},
      } = e.target.elements;

      const isValid = validatePasswords(confirm, password);
      setIsPassMatch(isValid);
      if (!isValid) {
        setIsEmailError('');
        return;
      }
      const {
        email: {value: email},
        name: {value: name},
      } = e.target.elements;

      run(fn({email, name, password}));
    },
    [fn, run],
  );

  const samePassMatchError = useMemo(() => {
    return !isPassMatch
      ? `Le mots de passe n'est pas le même que la confirmation`
      : '';
  }, [isPassMatch]);

  useEffect(() => {
    if (isClientError(error?.status) && error?.data?.errors?.email) {
      setIsEmailError(`Le courriel que vous avez entré existe déjà.`);
    } else {
      setIsEmailError('');
    }
  }, [error]);

  return {
    handleSubmit,
    isEmailError,
    isPassMatch,
    samePassMatchError,
    isLoading,
  };
}

export default useRegister;
