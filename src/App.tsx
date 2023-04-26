import { Link } from 'react-router-dom';
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
  }
];

const App: React.FC = () => {
  const Card: React.FC<ButtonProps> = ({ title, description, icon, link }) => {
    return (
      <div className="shadow-2xl">
        <Link to={link}>
          <button className="btn glass w-64 h-64 flex-auto ">
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>
          </button>
        </Link>
      </div>
    );
  };

  return (
    <div
      id="App"
      className="h-screen  mx-auto flex flex-col justify-center items-center"
    >
      {/* <TopNav /> */}
      <h1 data-testid="title-app" className="uppercase text-4xl translate-y-52">
        Babone project
      </h1>
      <div className="h-screen space-x-12 flex justify-center items-center">
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
