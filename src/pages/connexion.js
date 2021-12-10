import React from 'react';
import {useAuth} from '../context/auth';
import Connexion from '../components/connexion';

function ConnexionPage() {
  const {login} = useAuth();
  return <Connexion login={login} />;
}

export default ConnexionPage;
