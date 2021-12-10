import React, {useEffect, useMemo, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import useHandleAsync from './use-handle-async';
import ArticleModel from '../model/article-model';
import {isValid} from '../services/cache';
import * as article from '../services/article';
import {isClientError} from '../services/status';
import NotFoundPage from '../pages/not-found';
import Loading from '../pages/loading';

function useArticle(endpoint) {
  const {articleId} = useParams();
  const {run, data, isLoading, isError, error, setData} = useHandleAsync();
  const numberArticleId = Number(articleId);
  const location = useLocation();

  const [fromPage, setFromPage] = useState(1);
  const currentArticle = useMemo(() => new ArticleModel(data?.data), [data]);

  useEffect(() => {
    if (Number.isNaN(numberArticleId)) return;
    const params = new URLSearchParams(location.search);
    const page = params.get('from');
    const numberPage = Number(page);
    setFromPage(numberPage === 0 ? 1 : numberPage);
    const cachedPage = isValid(`${endpoint}?page=${numberPage}`);

    if (cachedPage?.isValid) {
      const articles = JSON.parse(cachedPage.value)?.data;
      const findCurrent = articles.filter(
        article => article.id === numberArticleId,
      );
      if (findCurrent.length > 0) {
        setData({data: findCurrent[0]});
        return;
      }
    }

    run(article.getArticle(articleId));
  }, [articleId, location.search, run, numberArticleId, setData]);

  return {
    currentArticle,
    isLoading,
    isError:
      Number.isNaN(numberArticleId) ||
      (isError && isClientError(error?.status)),
    fromPage,
  };
}

export default useArticle;
