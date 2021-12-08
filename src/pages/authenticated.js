import { Route, Routes, Navigate } from "react-router-dom";
import ConnexionPage from "../pages/connexion";
import NotFoundPage from "../pages/not-found";
import {useAuth} from "../context/auth";

function AuthenticatedPage() {
  const {logout, user} = useAuth();

  return (
    <div>
      AUTHENTICATED {JSON.stringify(user)}
      <button onClick={() => {
        logout();
      }}>logout</button>
      <AppRoutes />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/articles" element={<ConnexionPage />} />
      <Route path="/article/:articleId" element={<ConnexionPage />} />
      <Route path="/connexion" element={<Navigate to="/" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AuthenticatedPage;
