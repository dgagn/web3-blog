import React, {useCallback, useEffect, useState} from 'react';
import {getMyArticlesAtPage} from '../services/article';
import {Link} from 'react-router-dom';
import Article from '../components/article';
import useArticles from '../hooks/use-articles';
import NoArticles from '../components/no-articles';
import Loading from './loading';
import ErrorPage from './error';

function MyArticlesPage() {
  const {isSuccess, articles, pageNumber, error, isError, isLoading} =
    useArticles(getMyArticlesAtPage);

  if (isLoading) return <Loading />;
  else if (isError) return <ErrorPage error={error} />;

  return (
    <div className="articles container max-w-md">
      {isSuccess && articles.length > 0 ? (
        articles.map(article => {
          return (
            <Link
              to={`/my-articles/${article.getId()}?from=${pageNumber}`}
              key={article.getId()}
            >
              <Article
                date={article.getDate()}
                description={article.getShortBody()}
                title={article.getTitle()}
              />
            </Link>
          );
        })
      ) : (
        <NoArticles />
      )}
    </div>
  );
}

export default MyArticlesPage;
