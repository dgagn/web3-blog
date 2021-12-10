import UnauthenticatedPage from './pages/unauthenticated';
import {useAuth} from './context/auth';
import AuthenticatedPage from './pages/authenticated';
import {globalEmitter} from './emitter';
import BlogPopup from './components/toast';
import Modal from './components/modal';

function App() {
  const {user} = useAuth();

  return (
    <>
      <Modal />
      <BlogPopup />
      {user ? <AuthenticatedPage /> : <UnauthenticatedPage />}
    </>
  );
}

export default App;
