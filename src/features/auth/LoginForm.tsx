import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '@/features/auth/authSlice';
import type { RootState } from '@/store/store';
const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(
    null
  );
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const loginStatus = useSelector((state: RootState) => state.auth.loading);
  const loginState = useSelector((state: RootState) => state.auth);

  const isValidEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };
  const isValidPassword = (password: string) => {
    return password.length >= 6;
  };

  const hangleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = e.target.value;

    setEmail(value);
  };
  const hangleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = e.target.value;

    setPassword(value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) setEmailError('Email requis');
    if (!password) setPasswordError('Mot de passe requis');
    if (!isValidEmail(email)) {
      setEmailError('Veuillez entrer une adresse email valide.');
      return;
    } else {
      setEmailError(null);
    }
    if (!isValidPassword(password)) {
      setPasswordError('Le mot de passe doit comporter au moins 6 caractères.');
      return;
    } else {
      setPasswordError(null);
    }

    if (email && password) {
      try {
        // @ts-ignore

        await dispatch(login({ email: email, password: password })).unwrap();
        navigate('/');
      } catch (error) {
        // Handle error in signup
        if (loginState.error) {
          setLoginErrorMessage(loginState.error);
          setTimeout(() => {
            setLoginErrorMessage(null);
          }, 5000);
        }
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-control w-[600px] flex flex-col   items-start ">
          <h2 className="mb-8 text-left">Se connecter</h2>
          <div className="flex justify-center gap-2">
            <span>Nouvel utilisateur Babone? </span>
            <Link to="/auth/signup" className="text-accent font-semibold">
              S'inscrire
            </Link>
          </div>
          {loginErrorMessage && (
            <p className="text-red-500">{loginErrorMessage}</p>
          )}

          <div className="w-full">
            <label className="label">
              <span className="label-text">Adresse courriel</span>
            </label>
            <input
              type="email"
              placeholder="Saisissez votre adresse courriel"
              className="input input-bordered w-full py-8"
              value={email}
              onChange={hangleChangeEmail}
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div className="w-full">
            <label className="label">
              <span className="label-text">Mot de passe</span>
            </label>
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              className="input input-bordered w-full py-8"
              value={password}
              onChange={hangleChangePassword}
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <button
            type="submit"
            className={`" btn btn-primary my-9 loading-spinner " ${
              loginStatus === 'pending' ? ' loading' : null
            }`}
          >
            {loginStatus === 'pending' ? null : 'Continuer'}
          </button>
          <Link to="" className="underline font-semibold">
            Réinitialiser le mot de passe
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
