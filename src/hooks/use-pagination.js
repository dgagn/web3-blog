import {useCallback, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';

/**
 * A hook to facilitates the pagination.
 *
 * @param {*} endpoint the endpoint
 * @param {*} data the data
 * @param {*} pageNumber the page number
 * @return {{navigateFirstPage: ((function(): void)|*), total: number, navigateNextPage: ((function(): void)|*), nextPage: *, navigatePrevPage: ((function(): void)|*), prevPage: number, navigateLastPage: ((function(): void)|*), maxPage: number}}
 */
function usePagination(endpoint, data, pageNumber) {
  const navigate = useNavigate();

  const total = useMemo(() => {
    return Number(data?.meta?.total);
  }, [data?.meta?.total]);

  const maxPage = useMemo(() => {
    return Number(data?.meta?.last_page);
  }, [data?.meta?.last_page]);

  const nextPage = useMemo(() => {
    return pageNumber < maxPage ? pageNumber + 1 : null;
  }, [maxPage, pageNumber]);

  const prevPage = useMemo(() => {
    return pageNumber > 1 ? pageNumber - 1 : null;
  }, [pageNumber]);

  const navigateNextPage = useCallback(() => {
    if (nextPage === null) return;
    navigate(`${endpoint}?page=${nextPage}`);
  }, [endpoint, navigate, nextPage]);

  const navigatePrevPage = useCallback(() => {
    if (prevPage === null) return;
    navigate(`${endpoint}?page=${prevPage}`);
  }, [endpoint, navigate, prevPage]);

  const navigateFirstPage = useCallback(() => {
    if (prevPage === null) return;
    navigate(`${endpoint}?page=1`);
  }, [endpoint, navigate, prevPage]);

  const navigateLastPage = useCallback(() => {
    if (nextPage === null) return;
    navigate(`${endpoint}?page=${maxPage}`);
  }, [endpoint, maxPage, navigate, nextPage]);

  return {
    navigateFirstPage,
    navigateLastPage,
    navigateNextPage,
    navigatePrevPage,
    prevPage,
    nextPage,
    total,
    maxPage,
  };
}

export default usePagination;
