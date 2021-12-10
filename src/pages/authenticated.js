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

function AuthenticatedPage() {
  const {logout, user} = useAuth();
  const links = [
    {
      name: 'Accueil',
      route: '/',
    },
    {
      name: 'Articles',
      route: '/articles',
    },
    {
      name: 'Mes articles',
      route: '/my-articles',
    },
  ];
  return (
    <div>
      <TopBar />
      <Nav links={links} user={user} logout={logout} />
      <AppRoutes />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="articles" element={<ArticlesPage />} />
      <Route path="articles/:articleId" element={<ArticlePage />} />
      <Route path="my-articles" element={<MyArticlesPage />} />
      <Route path="my-articles/create" element={<MyArticlesCreate />} />
      <Route path="my-articles/:articleId" element={<MyArticlePage />} />
      <Route path="connexion" element={<Navigate to="/" />} />
      <Route path="register" element={<Navigate to="/" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AuthenticatedPage;
