import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {getMyArticlesAtPage} from '../services/article';
import useArticles from '../hooks/use-articles';
import NoArticles from '../components/no-articles';
import Loading from './loading';
import ErrorPage from './error';
import ArticleEdit from '../components/article-edit';
import {globalEmitter} from '../emitter';
import {Link} from 'react-router-dom';

function MyArticlesPage() {
  const {
    isSuccess,
    articles,
    error,
    isError,
    isLoading,
    pageNumber,
    setData,
    setLoading,
  } = useArticles(getMyArticlesAtPage);
  const forceUpdate = useReducer(() => ({}))[1];

  if (isLoading) return <Loading />;
  else if (isError) return <ErrorPage error={error} />;

  return (
    <div className="articles container max-w-md">
      {articles?.length > 0 && (
        <Link to="/my-articles/create" className="link">
          Créer une article de blog
        </Link>
      )}
      {isSuccess && articles.length > 0 ? (
        articles.map(article => {
          return (
            <>
              <ArticleEdit
                className="mt-xl"
                id={article.getId()}
                key={(article.getId() + 1) * Math.random()}
                date={article.getDate()}
                description={article.getBody()}
                title={article.getTitle()}
                page={pageNumber}
                setData={setData}
                setLoading={setLoading}
              />
            </>
          );
        })
      ) : (
        <NoArticles />
      )}
    </div>
  );
}

export default MyArticlesPage;
