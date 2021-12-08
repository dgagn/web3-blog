import {useAuth} from '../context/auth';
import RegisterForm from '../components/register-form';

function RegisterPage() {
  const {register} = useAuth();
  return (
    <div className="max-w-sm container-2xl connexion">
      <h1 className="connexion__title">S’inscrire</h1>
      <p children="connexion__subtitle pt-sm">S'inscrire sur le blog</p>
      <RegisterForm onSubmit={register} />
    </div>
  );
}

export default RegisterPage;
