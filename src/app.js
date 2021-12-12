import UnauthenticatedPage from './pages/unauthenticated';
import {useAuth} from './context/auth';
import AuthenticatedPage from './pages/authenticated';
import BlogPopup from './components/toast';

/**
 * Returns the main app component.
 *
 * @return {JSX.Element} the main app component
 */
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
