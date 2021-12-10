import {useAuth} from '../context/auth';
import Register from '../components/register';

function RegisterPage() {
  const {register} = useAuth();
  return <Register register={register} />;
}

export default RegisterPage;
