import { Route, Routes } from "react-router-dom";
import ConnexionPage from "../pages/connexion";
import NotFoundPage from "../pages/not-found";
import {useAuth, useHandleAsync} from "../context/auth";
import RegisterPage from "./register";

function UnauthenticatedPage() {
  const {login, register} = useAuth();
  const {run, isLoading} = useHandleAsync();

  function handleLogin() {
    run(
      login({ remember_me: true, email: 'danygagnon@gmail.com', password: 'abc' })
    )
  }

  return (
    <div>
      NOT AUTHENTICATED
      <div>{isLoading ? "loading" : ""}</div>
      <button onClick={handleLogin}>login</button>

      <button onClick={() => {
        register({ email: 'd123@gmail.com', name: 'dany', password: 'abc' })
      }}>
        register
      </button>

      <AppRoutes />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/articles" element={<ConnexionPage />} />
      <Route path="/article/:articleId" element={<ConnexionPage />} />
      <Route path="/connexion" element={<ConnexionPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default UnauthenticatedPage;
