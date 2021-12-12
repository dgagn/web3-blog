import React from 'react';
import {Link} from 'react-router-dom';

/**
 * The unauthentified user's checklist.
 *
 * @return {JSX.Element} the unauthentified user's checklist
 * @constructor
 */
function UnauthentifiedUserChecklist() {
  return (
    <>
      <p>Comme utilisateur non authentifier, vous pouvez:</p>
      <ul className="list mt-md">
        <li>
          Voir toutes les{' '}
          <Link className="link" to="/articles">
            articles
          </Link>
        </li>
        <li>
          Vous{' '}
          <Link className="link" to="/register">
            inscrire
          </Link>
        </li>
        <li>
          Vous authentifier (
          <Link className="link" to="/connexion">
            connexion
          </Link>
          )
        </li>
      </ul>
    </>
  );
}

export default UnauthentifiedUserChecklist;
