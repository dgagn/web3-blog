import React from 'react';
import {Link} from 'react-router-dom';

function AuthentifiedUserChecklist() {
  return (
    <>
      <p>Comme utilisateur authentifier, vous pouvez:</p>
      <ul className="list mt-md">
        <li>
          Voir toutes les{' '}
          <Link className="link" to="/my-articles">
            articles
          </Link>
        </li>
        <li>
          Voir vos{' '}
          <Link className="link" to="/my-articles">
            articles
          </Link>
        </li>
        <li>Créer une articles</li>
        <li>Modifier une de vos article</li>
        <li>Supprimer une de vos article</li>
      </ul>
    </>
  );
}

export default AuthentifiedUserChecklist;
