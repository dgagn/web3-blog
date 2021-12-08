import {useHandleAsync} from '../context/auth';
import FormInput from './form-input';
import SpinnerButton from './spinner-button';
import React, {useEffect, useMemo, useState} from 'react';
import {isClientError} from '../services/status';

function validatePasswords(firstPass, secondPass) {
  return firstPass === secondPass;
}

function RegisterForm({onSubmit}) {
  const {run, isLoading, isError, error} = useHandleAsync();

  const [isPassMatch, setIsPassMatch] = useState(true);
  const [isEmailError, setIsEmailError] = useState('');

  function handleSubmit(e) {
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

    run(onSubmit({email, name, password}));
  }

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

  return (
    <form className="container-lg max-w-sm mt-lg" onSubmit={handleSubmit}>
      <FormInput
        id="email"
        type="email"
        error={isEmailError}
        isError={isEmailError !== ''}
      >
        Courriel
      </FormInput>
      <div className="form__group">
        <FormInput
          className="mb-xs"
          id="password"
          type="password"
          isError={!isPassMatch}
        >
          Mots de passe
        </FormInput>
        <FormInput
          className="mb-xs"
          id="confirm"
          type="password"
          isError={!isPassMatch}
        >
          Confirmer le mots de passe
        </FormInput>
      </div>
      <div className="text-error-700 pb-md">{samePassMatchError}</div>
      <FormInput id="name">Nom</FormInput>
      <SpinnerButton isLoading={isLoading}>S’inscrire</SpinnerButton>
    </form>
  );
}

export default RegisterForm;
