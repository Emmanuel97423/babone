import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
  return (
    <>
      <form>
        <div className="form-control w-[600px] flex flex-col   items-start ">
          <h2 className="mb-8 text-left">Se connecter</h2>
          <div className="flex justify-center gap-2">
            <span>Nouvel utilisateur Babone? </span>
            <Link to="/auth/signup" className="text-accent font-semibold">
              S'inscrire
            </Link>
          </div>

          <div className="w-full">
            <label className="label">
              <span className="label-text">Adresse courriel</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full py-8"
            />
          </div>
          <div className="w-full">
            <label className="label">
              <span className="label-text">Mot de passe</span>
            </label>
            <input
              type="password"
              placeholder="Mot de passe"
              className="input input-bordered w-full py-8"
            />
          </div>
          <button className=" btn btn-primary my-9">Se connecter</button>
          <Link to="" className="underline font-semibold">
            Réinitialiser le mot de passe
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
