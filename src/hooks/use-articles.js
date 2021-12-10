import {useLocation} from 'react-router-dom';
import React, {useEffect, useMemo, useState} from 'react';
import useHandleAsync from './use-handle-async';
import ArticleModel from '../model/article-model';

export function useArticles(runFn) {
  const {data, run, isLoading, isSuccess, isError, error, isIdle} =
    useHandleAsync();
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
  };
}

export default useArticles;
