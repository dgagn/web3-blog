import React from 'react';

/**
 * The pagination.
 *
 * @return {JSX.Element} the pagination component
 * @constructor
 */
function Pagination({
  prevPage,
  navigateFirstPage,
  nextPage,
  navigatePrevPage,
  navigateNextPage,
  navigateLastPage,
}) {
  return (
    <div className="flex justify-center gap-sm pb-lg flex-wrap">
      <button
        className="btn link bg-contrast-100 text-contrast-900"
        disabled={prevPage === null}
        onClick={navigateFirstPage}
      >
        Premier
      </button>
      <button
        className="btn link bg-contrast-100 text-contrast-900"
        disabled={prevPage === null}
        onClick={navigatePrevPage}
      >
        Précédent
      </button>
      <button
        className="btn link bg-contrast-100 text-contrast-900"
        disabled={nextPage === null}
        onClick={navigateNextPage}
      >
        Suivant
      </button>
      <button
        className="btn link bg-contrast-100 text-contrast-900"
        disabled={nextPage === null}
        onClick={navigateLastPage}
      >
        Dernier
      </button>
    </div>
  );
}

export default Pagination;
