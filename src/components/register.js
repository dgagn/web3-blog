import React from 'react';
import RegisterForm from './register-form';

function Register({register}) {
  return (
    <div className="max-w-sm container-2xl connexion">
      <h1 className="connexion__title">S&apos;inscrire</h1>
      <p className="connexion__subtitle pt-sm">S&apos;inscrire sur le blog</p>
      <RegisterForm onSubmit={register} />
    </div>
  );
}

export default Register;
