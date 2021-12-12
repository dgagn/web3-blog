import React from 'react';
import AuthentifiedUserChecklist from '../components/authentified-user-checklist';
import UnauthentifiedUserChecklist from '../components/unauthentified-user-checklist';
import {useAuth} from '../context/auth';

function Welcome({name = 'mon ami', email = ''}) {
  const {user} = useAuth();

  return (
    <div className="articles container max-w-md">
      <h1 className="mb-xs">Bonjour {name} 👋</h1>
      <p className="mb-lg text-contrast-500">{email}</p>
      {user ? <AuthentifiedUserChecklist /> : <UnauthentifiedUserChecklist />}
    </div>
  );
}

export default Welcome;
