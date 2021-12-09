import React, {useEffect} from 'react';
import {useHandleAsync} from '../context/auth';
import {useParams} from 'react-router-dom';
import NotFoundPage from './not-found';
import * as article from '../services/article';
import {isClientError} from '../services/status';
import Loading from './loading';

function ArticlePage() {
  const {articleId} = useParams();
  const {run, data, isLoading, isError, error} = useHandleAsync();

  const shouldValid = Number(articleId);

  useEffect(() => {
    if (Number.isNaN(shouldValid)) return;
    run(article.getArticle(articleId));
  }, [articleId]);

  if (Number.isNaN(shouldValid) || (isError && isClientError(error?.status))) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      Article {articleId}
      {JSON.stringify(data)}
    </>
  );
}

export default ArticlePage;
