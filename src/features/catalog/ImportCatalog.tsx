import { useState } from 'react';
import ModalUI from '@/components/ui/Modal';

type importCatalogProps = {};

const ImportCatalogue: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <ModalUI
      titleModal="Créer un ensemble d’options"
      isOpenModal={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      labelButton="Créer un ensemble d'options"
      className="flex flex-col"
    >
      <h2>Choisissez une méthode d’importation</h2>
    </ModalUI>
  );
};

export default ImportCatalogue;
