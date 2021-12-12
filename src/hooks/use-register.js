import {useCallback, useEffect, useMemo, useState} from 'react';
import useHandleAsync from './use-handle-async';
import {isClientError} from '../services/status';

/**
 * Validates the passwords.
 *
 * @param {string} firstPass the first password
 * @param {string} secondPass the second password
 * @return {boolean} true if passwords match.
 */
function validatePasswords(firstPass, secondPass) {
  return firstPass === secondPass;
}

/**
 * Uses the register component.
 *
 * @param {*} fn the fn to run on register
 * @return {{isLoading: boolean, handleSubmit: ((function(*): void)|*), isEmailError: string, samePassMatchError: (string), isPassMatch: boolean, isSuccess: boolean}}
 */
function useRegister(fn) {
  const {run, isLoading, error, isSuccess} = useHandleAsync();

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
    isSuccess,
  };
}

export default useRegister;
