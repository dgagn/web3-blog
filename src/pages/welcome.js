import React from 'react';
import AuthentifiedUserChecklist from '../components/authentified-user-checklist';
import UnauthentifiedUserChecklist from '../components/unauthentified-user-checklist';

function Welcome({name = 'mon ami', email = ''}) {
  return (
    <div className="articles container max-w-md">
      <h1 className="mb-xs">Bonjour {name} 👋</h1>
      <p className="mb-lg text-contrast-500">{email}</p>
      {name !== 'mon ami' ? (
        <AuthentifiedUserChecklist />
      ) : (
        <UnauthentifiedUserChecklist />
      )}
    </div>
  );
}

export default Welcome;
