import UnauthenticatedPage from './pages/unauthenticated';
import {useAuth} from './context/auth';
import AuthenticatedPage from './pages/authenticated';

function App() {
  const {user} = useAuth();
  return <>{user ? <AuthenticatedPage /> : <UnauthenticatedPage />}</>;
}

export default App;
