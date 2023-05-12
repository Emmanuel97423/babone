import { useState } from 'react';
import Modal from '@/components/organisms/Modal';
import Input from '@/components/atoms/Input';
import Form from '@/components/organisms/Form';
import Options from '@/components/molecules/Options';

const AddOptions: React.FC = () => {
  const [options, setOptions] = useState<string[]>([]);
  const inputData: any = [
    {
      id: 1,
      label: 'Nom de l’ensemble d’options',
      type: 'text',
      placeholder: 'Taille de t-shirt',
      textInfos:
        'Nommez cet ensemble d’options. Par exemple, vous pourriez nommer cet ensemble d’options Couleurs ou Tailles de chemises.',
      textInfosDirection: 'bottom'
    },
    {
      id: 2,
      label: 'Nom à afficher',
      type: 'text',
      placeholder: 'Taille',
      textInfos:
        'Choisissez un nom à afficher pour cet ensemble d’options lors du paiement.',
      textInfosDirection: 'right'
    },
    {
      id: 3,
      label: "Type d'ensemble d’options",
      type: 'radio',
      // placeholder: 'Taille',
      textInfos:
        'Choisissez entre afficher les options uniquement en format texte ou à la fois en format texte et en plage de couleurs lors du passage en caisse.',
      textInfosDirection: 'bottom',
      radioValues: ['Texte', 'Couleur et texte']
    }
  ];
  const handleAddOption = (option: string) => {
    setOptions([...options, option]);
  };
  return (
    <div className="flex justify-between items-center p-4">
      <div className="w-1/2">
        <h2>Options</h2>
        <p>
          Les options vous aident à créer et à organiser les variantes de vos
          articles avec des valeurs pouvant être sélectionnées au moment du
          passage en caisse.
        </p>
      </div>
      <Modal labelButton="Créer un ensemble d'options">
        <Form className="flex flex-col">
          {inputData.map((input: any) => (
            <Input
              type={input.type}
              label={input.label}
              placeholder={input.placeholder}
              textInfos={input.textInfos}
              textInfosDirection={input.textInfosDirection}
              radioValues={input.radioValues}
            />
          ))}
          <Options
            placeholder="Ajouter une option"
            onStateChange={handleAddOption}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default AddOptions;
