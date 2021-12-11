import UnauthenticatedPage from './pages/unauthenticated';
import {useAuth} from './context/auth';
import AuthenticatedPage from './pages/authenticated';
import BlogPopup from './components/toast';

function App() {
  const {user} = useAuth();

  return (
    <>
      <BlogPopup />
      {user ? <AuthenticatedPage /> : <UnauthenticatedPage />}
    </>
  );
}

export default App;
