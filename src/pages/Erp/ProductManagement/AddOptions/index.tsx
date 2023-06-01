import React, { FormEvent, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Form from '@/components/ui/Form';
import Options from '@/components/ui/Options';
import Button from '@/components/ui/common/Button';

type Input = {
  id: number;
  name: 'optionDetails' | 'optionName' | 'optionType';
  label: string;
  type: string;
  placeholder?: string;
  textInfos?: string;
  textInfosDirection?: string;
  radioValues?: any;
};

type FormData = {
  optionDetails: string;
  optionName: string;
  optionType: string;
};

const AddOptions: React.FC = () => {
  const [options, setOptions] = useState<string[]>([]);
  const inputData: Input[] = [
    {
      id: 1,
      label: 'Nom de l’ensemble d’options',
      name: 'optionDetails',
      type: 'text',
      placeholder: 'Taille de t-shirt',
      textInfos:
        'Nommez cet ensemble d’options. Par exemple, vous pourriez nommer cet ensemble d’options Couleurs ou Tailles de chemises.',
      textInfosDirection: 'bottom'
    },
    {
      id: 2,
      label: 'Nom à afficher',
      name: 'optionName',
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
      name: 'optionType',
      // placeholder: 'Taille',
      textInfos:
        'Choisissez entre afficher les options uniquement en format texte ou à la fois en format texte et en plage de couleurs lors du passage en caisse.',
      textInfosDirection: 'bottom',
      radioValues: ['Texte', 'Couleur et texte']
    }
  ];
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data, e) => {
    e?.stopPropagation();
    console.log({ data });
  };

  const handleAddOption = (option: string) => {
    setOptions([...options, option]);
  };
  const handldeOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('e:', e);
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
        <Form
          className="flex flex-col items-stretch"
          // onSubmit={handleSubmit(onSubmit)}
        >
          {inputData.map((input) => (
            <Input
              {...register(input.name)}
              name={input.name}
              type={input.type}
              label={input.label}
              placeholder={input.placeholder}
              textInfos={input.textInfos}
              textInfosDirection={input.textInfosDirection}
              radioValues={input.radioValues}
              onChange={handldeOnChange}
            />
          ))}
          <Options
            placeholder="Ajouter une option"
            onStateChange={handleAddOption}
          />
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Enregistrer
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AddOptions;
