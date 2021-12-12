import React from 'react';
import FormInput from './form-input';
import SpinnerButton from './spinner-button';
import useConnexion from '../hooks/use-connexion';

/**
 * The connexion form.
 *
 * @return {JSX.Element} the connexion form
 * @constructor
 */
function ConnexionForm({onSubmit}) {
  const {handleSubmit, isError, getErrorMessage, isLoading} =
    useConnexion(onSubmit);

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
