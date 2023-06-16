import { useState } from 'react';
import ModalUI from '@/components/ui/Modal';
import { HiArrowLeft } from 'react-icons/hi';

type importCatalogProps = {
  isOpenModal: boolean;
  setIsModalOpen: (open: boolean) => void;
};

const ImportCatalogue: React.FC<importCatalogProps> = ({
  isOpenModal,
  setIsModalOpen
}) => {
  const [modalPage, setModalPage] = useState<number>(1);

  let content;

  if (modalPage == 1) {
    content = (
      <>
        <h2 className="text-center mt-0">
          Choisissez une méthode d’importation
        </h2>
        <div className="flex flex-col">
          <div className="form-control w-96">
            <label className="flex label cursor-pointer">
              <div className="mr-4">
                {' '}
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-red-500 "
                  checked
                />
              </div>

              <div className="flex items-center text-left ">
                <span className="basis-1/3">
                  Modifier le catalogue d’articles
                </span>
                <span className="label-text ">
                  Modifiez les articles existants et ajoutez-en de nouveaux. Les
                  articles existants seront révisés, mais ne seront pas
                  supprimés.
                </span>
              </div>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-blue-500"
                checked
              />
              <span>Remplacer le catalogue d’articles</span>
              <span className="label-text">
                Écrasez les articles existants. Ceux-ci seront alors tous
                supprimés et remplacés.
              </span>
            </label>
          </div>
        </div>
      </>
    );
  } else if (modalPage == 2) {
    content = (
      <>
        <div className="flex items-center mb-12">
          <HiArrowLeft size={24} />
          <h2 className="text-center my-0 ml-8">
            Choisissez une méthode d’importation
          </h2>
        </div>
        <div>
          <p>
            Téléchargez le fichier de votre catalogue pour classer vos articles
            et ajouter ou modifier les informations correspondantes. Nous
            recommandons d’ajouter tous les ensembles de modificateurs, toutes
            les taxes et toutes les catégories avant de procéder à l’importation
            des articles.
          </p>
          <div>
            <h2>Déposez votre fichier ici</h2>
            <span>
              ou{' '}
              <span className="text-underline">
                sélectionnez-le depuis votre ordinateurAucun fichier choisi
              </span>
            </span>
          </div>
          <input></input>
        </div>
      </>
    );
  }
  return (
    <>
      <ModalUI
        isOpenModal={isOpenModal}
        setIsModalOpen={() => setIsModalOpen}
        className="flex flex-col w-36"
        labelModal="Modifier le catalogue d’articles"
      >
        {content}
        <div className="flex justify-end">
          <button
            className={`${modalPage != 1 ? 'hidden' : 'btn btn-primary'}`}
            onClick={() => setModalPage(2)}
          >
            Suivant
          </button>
        </div>
      </ModalUI>
    </>
  );
};

export default ImportCatalogue;
