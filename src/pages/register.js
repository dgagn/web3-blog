import {useAuth} from '../context/auth';
import RegisterForm from '../components/register-form';
import React from 'react';

/**
 * The register page.
 * @return {JSX.Element} the register page
 * @constructor
 */
function RegisterPage() {
  const {register} = useAuth();
  return (
    <div className="max-w-sm container-2xl connexion">
      <h1 className="connexion__title">S&apos;inscrire</h1>
      <p className="connexion__subtitle pt-sm">S&apos;inscrire sur le blog</p>
      <RegisterForm onSubmit={register} />
    </div>
  );
}

export default RegisterPage;
