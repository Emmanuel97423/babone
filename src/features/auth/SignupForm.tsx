import { useState, useffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup } from '@/features/auth/authSlice';
import { Link } from 'react-router-dom';
import type { RootState, AppDispatch } from '@/store/store';
import { Root } from 'postcss';
const SignupForm: React.FC = () => {
  const dispatch = useDispatch();
  const signupStatus = useSelector((state: RootState) => state.auth.loading);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const isValidEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };
  const isValidPassword = (password: string) => {
    return password.length >= 6;
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = e.target.value;
    setEmail(value);
    if (!isValidEmail(value)) {
      setEmailError('Veuillez entrer une adresse email valide.');
    } else {
      setEmailError(null);
    }
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = e.target.value;
    setPassword(value);
    if (!isValidPassword(value)) {
      setPasswordError('Le mot de passe doit comporter au moins 6 caractères.');
    } else {
      setPasswordError(null);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('e:', e);
    e.preventDefault();
    try {
      const signupResult = await dispatch<AppDispatch>(
        signup({ email: email, password: password })
      );
      console.log('signupResult:', signupResult);
    } catch (error) {
      console.log('error:', error);
    }
  };
  let content;
  if (isSubmit) {
    content = (
      <>
        <h1>Votre compte a été créé</h1>
      </>
    );
  } else {
    content = (
      <>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-start gap-4   form-control w-[600px]">
            <h2 className="m-0 text-4xl">
              Procédons à la création de votre compte.
            </h2>
            {/* <p>
            S’inscrire à Babone, c’est rapide et gratuit. Pas d’engagement, pas
            de contrat longue durée.
          </p> */}

            <input
              type="email"
              value={email}
              placeholder="Saisissez votre adresse courriel"
              className="input input-bordered w-full py-8"
              onChange={handleChangeEmail}
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
            {/* <input
              type="email"
              placeholder="Confirmez votre adresse courriel"
              className="input input-bordered w-full  py-8"
            /> */}
            <input
              type="password"
              placeholder="Créez un mot de passe"
              className="input input-bordered w-full py-8"
              onChange={handleChangePassword}
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
            <button className=" w-full btn btn-primary" type="submit">
              Continuer
            </button>
            <div className="flex gap-2">
              <p>Vous avez déjà un compte Babone?</p>
              <Link to="/auth/login" className="font-semibold text-accent">
                Connectez-vous.
              </Link>
            </div>
          </div>
        </form>
      </>
    );
  }
  return <>{content}</>;
};

export default SignupForm;
