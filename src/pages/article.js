import React, {useEffect, useMemo} from 'react';
import {useHandleAsync} from '../context/auth';
import {useLocation, useParams, useNavigate} from 'react-router-dom';
import NotFoundPage from './not-found';
import * as article from '../services/article';
import {isClientError} from '../services/status';
import Loading from './loading';
import {isValid} from '../services/cache';

function ArticlePage() {
  const {articleId} = useParams();
  const {run, data, isLoading, isError, error, setData} = useHandleAsync();
  const numberArticleId = Number(articleId);
  const location = useLocation();
  const navigate = useNavigate();

  const currentArticle = useMemo(() => {
    return data?.data;
  }, [data]);

  useEffect(() => {
    if (Number.isNaN(numberArticleId)) return;
    const params = new URLSearchParams(location.search);
    const page = params.get('from');
    const numberPage = Number(page);
    const cachedPage = isValid(`articles?page=${numberPage}`);

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

  if (
    Number.isNaN(numberArticleId) ||
    (isError && isClientError(error?.status))
  ) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="p-2xl text-center bg-contrast-900 clip">
        <div className="blur p-xl max-w-md mx-auto my-auto bg-blur">
          <h1 className="text-contrast-50">{currentArticle?.title}</h1>
          <p className="text-contrast-50">
            {currentArticle?.created_at.substr(0, 10)} —{' '}
            {currentArticle?.user_id}
          </p>
        </div>
      </div>
      <div className="container max-w-md pt-xl">
        <p>{currentArticle?.body}</p>
        <button className="link-fx-4 mt-lg" onClick={() => navigate(-1)}>
          Retourner en arrière
        </button>
      </div>
    </>
  );
}

export default ArticlePage;
