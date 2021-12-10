import useHandleAsync from '../hooks/use-handle-async';
import FormInput from './form-input';
import SpinnerButton from './spinner-button';
import React from 'react';
import useRegister from '../hooks/use-register';

function RegisterForm({onSubmit}) {
  const {
    handleSubmit,
    isEmailError,
    isPassMatch,
    samePassMatchError,
    isLoading,
  } = useRegister(onSubmit);

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
