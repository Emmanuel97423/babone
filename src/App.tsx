import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  checkUpdate,
  installUpdate,
  onUpdaterEvent
} from '@tauri-apps/api/updater';
import { relaunch } from '@tauri-apps/api/process';
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
    const checkForUpdates = async () => {
      console.log('Checking for updates...');
      const unlisten = await onUpdaterEvent(({ error, status }) => {
        // This will log all updater events, including status updates and errors.
        console.log('Updater event', error, status);
      });

      try {
        // const manifestFetch = await fetch(
        //   'https://raw.githubusercontent.com/Emmanuel97423/babone/master/update-manifest.json'
        // );
        // const manifestJson = await manifestFetch.json();
        // console.log('Fetched manifest:', manifestJson);
        const { shouldUpdate, manifest } = await checkUpdate();
        console.log('manifest:', manifest);
        console.log('shouldUpdate:', shouldUpdate);

        if (shouldUpdate) {
          // You could show a dialog asking the user if they want to install the update here.
          console.log(
            `Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
          );

          // Install the update. This will also restart the app on Windows!
          await installUpdate();

          // On macOS and Linux you will need to restart the app manually.
          // You could use this step to display another confirmation dialog.
          // await relaunch();
        }
      } catch (error) {
        console.error(error);
      }

      // you need to call unlisten if your handler goes out of scope, for example if the component is unmounted.
      unlisten();
    };

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
