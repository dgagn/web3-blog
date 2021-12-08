import {useHandleAsync} from '../context/auth';
import React, {useMemo} from 'react';
import {isClientError, isServerError} from '../services/status';
import FormInput from './form-input';
import SpinnerButton from './spinner-button';

function ConnexionForm({onSubmit}) {
  const {run, isLoading, isError, error} = useHandleAsync();

  function handleSubmit(e) {
    e.preventDefault();
    if (isLoading) return;
    const {email, password} = e.target.elements;
    run(
      onSubmit({
        remember_me: true,
        email: email.value,
        password: password.value,
      }),
    );
  }

  const getErrorMessage = useMemo(() => {
    return isError && error?.status
      ? isClientError(error.status)
        ? `Le compte n'est pas valide`
        : isServerError(error.status)
        ? `Le serveur n'est pas valide`
        : `Une erreur c'est produit`
      : ``;
  }, [error]);

  return (
    <form className="container-lg max-w-sm mt-lg" onSubmit={handleSubmit}>
      {isError && (
        <span className="mb-lg text-error-700 flex justify-center">
          {getErrorMessage}
        </span>
      )}
      <FormInput type="email" id="email">
        Courriel
      </FormInput>
      <FormInput type="password" id="password">
        Mots de passe
      </FormInput>
      <SpinnerButton isLoading={isLoading}>Connexion</SpinnerButton>
    </form>
  );
}

export default ConnexionForm;
