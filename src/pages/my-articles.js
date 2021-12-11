import React from 'react';
import {getMyArticlesAtPage} from '../services/article';
import useArticles from '../hooks/use-articles';
import NoArticles from '../components/no-articles';
import Loading from './loading';
import ErrorPage from './error';
import ArticleEdit from '../components/article-edit';
import {Link} from 'react-router-dom';
import NotFoundPage from './not-found';
import usePagination from '../hooks/use-pagination';
import Pagination from '../components/pagination';

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
    data,
  } = useArticles(getMyArticlesAtPage);

  const {
    maxPage,
    total,
    prevPage,
    navigateFirstPage,
    navigateLastPage,
    navigateNextPage,
    navigatePrevPage,
    nextPage,
  } = usePagination('/my-articles', data, pageNumber);

  if (pageNumber > maxPage) return <NotFoundPage />;
  if (isLoading) return <Loading />;
  else if (isError) return <ErrorPage error={error} />;

  return (
    <div className="articles container max-w-md">
      <p className="text-contrast-600 mb-xl">
        {total} {total > 1 ? 'articles' : 'article'} au totals
      </p>
      {articles?.length > 0 && (
        <Link to="/my-articles/create" className="link">
          Créer une article de blog
        </Link>
      )}
      {isSuccess && articles.length > 0 ? (
        articles.map(article => {
          return (
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
          );
        })
      ) : (
        <>{pageNumber <= maxPage && <NoArticles key={Math.random()} />}</>
      )}
      <Pagination
        navigateFirstPage={navigateFirstPage}
        navigateLastPage={navigateLastPage}
        navigateNextPage={navigateNextPage}
        nextPage={nextPage}
        prevPage={prevPage}
        navigatePrevPage={navigatePrevPage}
      />
    </div>
  );
}

export default MyArticlesPage;
