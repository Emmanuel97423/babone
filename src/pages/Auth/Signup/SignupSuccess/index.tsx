import { Link } from 'react-router-dom';
const SignupSuccess: React.FC = () => {
  return (
    <div className="max-w-[600px] my-0 mx-auto h-screen flex flex-col justify-center items-center text-center">
      <p className="font-semibold">
        Votre compte a été créé avec succès. Veuillez le valider en cliquant sur
        le lien envoyé à votre adresse e-mail.
      </p>
      <Link to="/auth/login" className="font-semibold text-accent">
        Se connecter ?
      </Link>
    </div>
  );
};
export default SignupSuccess;
