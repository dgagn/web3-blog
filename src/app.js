import UnauthenticatedPage from './pages/unauthenticated';
import {useAuth} from './context/auth';
import AuthenticatedPage from './pages/authenticated';
import {emitterRegistration} from './emitter';
import RegistrationPopup from './components/toast';

function App() {
  const {user} = useAuth();

  return (
    <>
      <RegistrationPopup />
      {user ? <AuthenticatedPage /> : <UnauthenticatedPage />}
    </>
  );
}

export default App;
