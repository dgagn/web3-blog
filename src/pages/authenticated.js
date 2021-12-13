import {Route, Routes, Navigate} from 'react-router-dom';
import NotFoundPage from '../pages/not-found';
import {useAuth} from '../context/auth';
import ArticlesPage from './articles';
import ArticlePage from './article';
import MyArticlesPage from './my-articles';
import MyArticlePage from './my-article';
import MyArticlesCreate from './my-articles-create';
import TopBar from '../components/top-bar';
import Nav from '../components/nav';
import Welcome from './welcome';
import authentifiedLinks from '../nav/authentified-links';

/**
 * The authenticated app.
 *
 * @return {JSX.Element} the authenticated app
 * @constructor
 */
function AuthenticatedPage() {
  const {logout, user} = useAuth();

  return (
    <div>
      <TopBar />
      <Nav links={authentifiedLinks} user={user} logout={logout} />
      <AppRoutes user={user} />
    </div>
  );
}

/**
 * The routes available to authenticated users.
 *
 * @param {*} user the user
 * @return {JSX.Element} the authenticated app routes
 * @constructor
 */
function AppRoutes({user}) {
  return (
    <Routes>
      <Route path="articles" element={<ArticlesPage />} />
      <Route path="articles/:articleId" element={<ArticlePage />} />
      <Route path="my-articles" element={<MyArticlesPage />} />
      <Route path="my-articles/create" element={<MyArticlesCreate />} />
      <Route path="my-articles/:articleId" element={<MyArticlePage />} />
      <Route path="connexion" element={<Navigate to="/" />} />
      <Route path="register" element={<Navigate to="/" />} />
      <Route
        path="/"
        element={<Welcome name={user?.name} email={user?.email} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AuthenticatedPage;
