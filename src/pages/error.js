import React from 'react';

function ErrorPage({error}) {
  return (
    <div className="articles container max-w-md">
      <h1 className="mb-md">Erreur</h1>
      <p>
        Une erreur est survenu lors de la requête pour chercher une article.
      </p>
      <p>Si vous avez cette erreur, essayer de rafraichir la page.</p>
      <p>{error && JSON.stringify(error)}</p>
      <p className="mt-sm">- Dany Gagnon</p>
    </div>
  );
}

export default ErrorPage;
