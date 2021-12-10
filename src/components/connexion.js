import React from 'react';
import ConnexionForm from './connexion-form';

function Connexion({login}) {
  return (
    <div className="max-w-sm container-2xl connexion">
      <h1 className="connexion__title">Connexion</h1>
      <p className="connexion__subtitle pt-sm">
        Se connecter sur son compte pour le blog
      </p>
      <ConnexionForm onSubmit={login} />
    </div>
  );
}

export default Connexion;
