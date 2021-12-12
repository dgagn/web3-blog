import {useLocation} from 'react-router-dom';
import {useEffect, useMemo, useState} from 'react';
import useHandleAsync from './use-handle-async';
import ArticleModel from '../model/article-model';

/**
 * Uses the articles endpoint with a custom run fn.
 *
 * @param {*} runFn a custom run function
 * @return {{isLoading: boolean, pageNumber: unknown, isError: boolean, data: *, setData: (function(*): *), setLoading: (function(): *), run: (function(*): *), error: *, articles: *, isSuccess: boolean}}
 */
export function useArticles(runFn) {
  const {
    data,
    run,
    isLoading,
    isSuccess,
    isError,
    error,
    isIdle,
    setData,
    setLoading,
  } = useHandleAsync();
  const location = useLocation();
  const [pageNumber, setPageNumber] = useState(undefined);

  const articles = useMemo(() => {
    return data?.data.map(article => new ArticleModel(article));
  }, [data]);

  useEffect(() => {
    if (!pageNumber) return;
    run(runFn(pageNumber));
  }, [pageNumber, run, runFn]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const numberPage = Number(page);
    const validPageNumber =
      numberPage <= 0 || Number.isNaN(numberPage) ? 1 : numberPage;
    setPageNumber(validPageNumber);
  }, [location.search]);

  return {
    isSuccess,
    articles,
    pageNumber,
    isError,
    error,
    isLoading: isLoading || isIdle,
    run,
    setData,
    setLoading,
    data,
  };
}

export default useArticles;
