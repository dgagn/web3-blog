import React from 'react';

/**
 * The not found page.
 * @return {JSX.Element} not found page
 * @constructor
 */
function NotFoundPage() {
  return (
    <div className="articles container max-w-md">
      <h1 className="mb-md">404</h1>
      <p>La page que vous rechercher n&apos;existe pas.</p>
    </div>
  );
}

export default NotFoundPage;
