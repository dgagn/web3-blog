import React from 'react';
import Article from '../components/article';
import {getArticlesAtPage} from '../services/article';
import {Link} from 'react-router-dom';
import useArticles from '../hooks/use-articles';
import Loading from './loading';
import ErrorPage from './error';
import NotFoundPage from './not-found';
import usePagination from '../hooks/use-pagination';
import Pagination from '../components/pagination';

/**
 * The full list of articles.
 *
 * @return {JSX.Element} the full list of articles.
 * @constructor
 */
function ArticlesPage() {
  const {isSuccess, articles, pageNumber, isError, isLoading, error, data} =
    useArticles(getArticlesAtPage);

  const {
    maxPage,
    total,
    prevPage,
    navigateFirstPage,
    navigateLastPage,
    navigateNextPage,
    navigatePrevPage,
    nextPage,
  } = usePagination('/articles', data, pageNumber);

  if (pageNumber > maxPage) return <NotFoundPage />;
  if (isLoading) return <Loading />;
  else if (isError) return <ErrorPage error={error} />;

  return (
    <div className="articles container max-w-md">
      <p className="text-contrast-600 mb-xl">
        {total} {total > 1 ? 'articles' : 'article'} au totals
      </p>
      {isSuccess
        ? articles.map(article => {
            return (
              <Link
                to={`/articles/${article.getId()}?from=${pageNumber}`}
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
        : null}
      {maxPage > 1 && (
        <Pagination
          navigateFirstPage={navigateFirstPage}
          navigateLastPage={navigateLastPage}
          navigateNextPage={navigateNextPage}
          nextPage={nextPage}
          prevPage={prevPage}
          navigatePrevPage={navigatePrevPage}
        />
      )}
    </div>
  );
}

export default ArticlesPage;
