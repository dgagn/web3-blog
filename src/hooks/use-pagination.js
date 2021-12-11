import {useCallback, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';

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
  }, [navigate, nextPage]);

  const navigatePrevPage = useCallback(() => {
    if (prevPage === null) return;
    navigate(`${endpoint}?page=${prevPage}`);
  }, [navigate, prevPage]);

  const navigateFirstPage = useCallback(() => {
    if (prevPage === null) return;
    navigate(`${endpoint}?page=1`);
  }, [endpoint, navigate, prevPage]);

  const navigateLastPage = useCallback(() => {
    if (nextPage === null) return;
    navigate(`${endpoint}?page=${maxPage}`);
  }, [maxPage, navigate, nextPage]);

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
