import React, {useCallback, useEffect, useState} from 'react';
import {getMyArticlesAtPage} from '../services/article';
import {Link} from 'react-router-dom';
import Article from '../components/article';
import useArticles from '../hooks/use-articles';
import NoArticles from '../components/no-articles';
import Loading from './loading';
import ErrorPage from './error';
import ArticleEdit from '../components/article-edit';

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
            <ArticleEdit
              key={article.getId()}
              date={article.getDate()}
              description={article.getShortBody()}
              title={article.getTitle()}
            />
          );
        })
      ) : (
        <NoArticles />
      )}
    </div>
  );
}

export default MyArticlesPage;
