import {Route, Routes} from 'react-router-dom';
import ConnexionPage from '../pages/connexion';
import NotFoundPage from '../pages/not-found';
import RegisterPage from './register';
import ArticlesPage from './articles';
import TopBar from '../components/top-bar';
import ArticlePage from './article';

function UnauthenticatedPage() {
  return (
    <>
      <TopBar />
      <AppRoutes />
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="articles" element={<ArticlesPage />} />
      <Route path="articles/:articleId" element={<ArticlePage />} />
      <Route path="connexion" element={<ConnexionPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default UnauthenticatedPage;
