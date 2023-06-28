import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { checkForUpdates } from '@/utils/checkForUpdateTauri';
import './App.css';
// import TopNav from './components/header/TopNav';

interface ButtonProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

const data = [
  {
    id: 1,
    title: 'GESTION COMMERCIALE',
    description:
      'Gérer vos ventes, produits, clients, commandes, ecriture comptable...',
    icon: 'fas fa-shopping-cart',
    link: '/erp'
  },
  {
    id: 2,
    title: 'E-COMMERCE',
    description: 'Gérer vos ventes en ligne, produits, clients...',
    icon: 'fas fa-shopping-cart',
    link: '/'
  },
  {
    id: 3,
    title: 'CAISSE ENREGISTREUSE',
    description: 'Gérer vos réglements clients, fournisseurs...',
    icon: 'fas fa-shopping-cart',
    link: '/'
  }
];

const App: React.FC = () => {
  useEffect(() => {
    checkForUpdates();
  }, []);
  const Card: React.FC<ButtonProps> = ({ title, description, icon, link }) => {
    return (
      <div className="shadow-2xl">
        <Link to={link}>
          <button className="btn glass w-64 h-64 flex-auto ">
            <h2 className="card-title">{title}</h2>
            <p className="tracking-wide leading-6">{description}</p>
          </button>
        </Link>
      </div>
    );
  };

  return (
    <div
      id="App"
      className="h-screen  mx-auto flex flex-col justify-center items-center tracking-widest"
    >
      {/* <TopNav /> */}
      <h1 data-testid="title-app" className="uppercase text-4xl pb-32 ">
        Babone project
      </h1>
      <div className=" space-x-12 pt-0 flex justify-center items-center ">
        {data.map((data) => (
          <Card
            key={data.id}
            title={data.title}
            description={data.description}
            icon={data.icon}
            link={data.link}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
