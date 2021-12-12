import React from 'react';
import {Link} from 'react-router-dom';

/**
 * When theirs no article.
 *
 * @return {JSX.Element} when theirs no article
 * @constructor
 */
function NoArticles() {
  return (
    <>
      <h1 className="mb-md">Pas d&apos;article</h1>
      <p>
        Vous n&apos;avez pas d&apos;article à vous. Voulez-vous en{' '}
        <Link className="link" to="/my-articles/create">
          créer une
        </Link>
        ?
      </p>
    </>
  );
}

export default NoArticles;
