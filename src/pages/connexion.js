import React, {useEffect, useMemo} from 'react';
import {useAuth, useHandleAsync} from '../context/auth';
import ConnexionForm from '../components/connexion-form';

function ConnexionPage() {
  const {login} = useAuth();
  return (
    <div className="max-w-sm container-2xl connexion">
      <h1 className="connexion__title">Connexion</h1>
      <p children="connexion__subtitle pt-sm">
        Se connecter sur son compte pour le blog
      </p>
      <ConnexionForm onSubmit={login} />
    </div>
  );
}

export default ConnexionPage;
