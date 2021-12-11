import React from 'react';

function Pagination({
  prevPage,
  navigateFirstPage,
  nextPage,
  navigatePrevPage,
  navigateNextPage,
  navigateLastPage,
}) {
  return (
    <div className="flex justify-center gap-x-lg pb-lg">
      <button
        className="btn link bg-contrast-100 text-contrast-900"
        disabled={prevPage === null}
        onClick={navigateFirstPage}
      >
        First
      </button>
      <button
        className="btn link bg-contrast-100 text-contrast-900"
        disabled={prevPage === null}
        onClick={navigatePrevPage}
      >
        Prev
      </button>
      <button
        className="btn link bg-contrast-100 text-contrast-900"
        disabled={nextPage === null}
        onClick={navigateNextPage}
      >
        Next
      </button>
      <button
        className="btn link bg-contrast-100 text-contrast-900"
        disabled={nextPage === null}
        onClick={navigateLastPage}
      >
        Last
      </button>
    </div>
  );
}

export default Pagination;
