import React, { useMemo, useCallback, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addNewsOptions } from '@/features/product/optionSlice';

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
  radioValues?: radioValue[];
};

type radioValue = {
  name: string;
  value: string;
};

const AddOptions: React.FC = () => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState<string[]>(['XL', 'L']);
  const [optionDetails, setOptionDetails] = useState<string>('');
  const [optionName, setOptionName] = useState<string>('');
  const [optionType, setOptionType] = useState<string>('text');
  const [optionSelected, setOptionSelected] = useState<string>('');
  const [formErrorMessage, setFormErrorMessage] = useState<string>('');

  const canSave = [options, optionDetails, optionName, optionType].every(
    Boolean
  );

  // const inputData: Input[] = [
  //   {
  //     id: 1,
  //     label: 'Nom de l’ensemble d’options',
  //     name: 'optionDetails',
  //     type: 'text',
  //     placeholder: 'Taille de t-shirt',
  //     textInfos:
  //       'Nommez cet ensemble d’options. Par exemple, vous pourriez nommer cet ensemble d’options Couleurs ou Tailles de chemises.',
  //     textInfosDirection: 'bottom'
  //   },
  //   {
  //     id: 2,
  //     label: 'Nom à afficher',
  //     name: 'optionName',
  //     type: 'text',
  //     placeholder: 'Taille',
  //     textInfos:
  //       'Choisissez un nom à afficher pour cet ensemble d’options lors du paiement.',
  //     textInfosDirection: 'right'
  //   },
  //   {
  //     id: 3,
  //     label: "Type d'ensemble d’options",
  //     type: 'radio',
  //     name: 'optionType',
  //     // placeholder: 'Taille',
  //     textInfos:
  //       'Choisissez entre afficher les options uniquement en format texte ou à la fois en format texte et en plage de couleurs lors du passage en caisse.',
  //     textInfosDirection: 'bottom',
  //     radioValues: ['Texte', 'Couleur et texte']
  //   }
  // ];

  // const {
  //   register,
  //   control,
  //   handleSubmit,
  //   watch,
  //   formState: { errors }
  // } = useForm<FormData>({
  //   defaultValues: {
  //     option: [
  //       {
  //         optionDetails: 'Taille de t-shirt',
  //         optionName: 'Taille',
  //         optionType: 'Taille type',
  //         optionValue: [
  //           { name: 'couleur', value: 'XL' },
  //           { name: 'couleur', value: 'XLL' },
  //           { name: 'couleur', value: 'XS' },
  //           { name: 'couleur', value: 'S' }
  //         ]
  //       }
  //     ]
  //   },

  //   mode: 'onBlur'
  // });

  // const { fields, append, remove } = useFieldArray({
  //   name: 'option',
  //   control
  // });
  // const watchFieldArray = watch('option');
  // const controlledOptions = fields.map((field, index) => {
  //   return {
  //     ...field,
  //     ...watchFieldArray[index]
  //   };
  // });

  // const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
  //   console.log({ data });
  // };

  const handleOptionDetails = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();

      setOptionDetails(e.target.value);
    },
    [optionDetails]
  );
  const handleOptionName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    setOptionName(e.target.value);
  };
  const handleOptionType = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    setOptionType(e.target.value);
  };

  const handleOnChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    console.log('e:', e);

    setOptionSelected(e.target.value);
    console.log('optionSelected:', optionSelected);
  };

  const handleAddOption = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    console.log('e:', e);

    if (e.key === 'Enter') {
      // const option = e.target.value;
      const record = options.find(
        (item) => item.toLowerCase() === optionSelected.toLowerCase()
      );

      if (record) {
        return;
      }

      setOptions([...options, optionSelected]);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    // e.stopPropagation();
  };
  const handleClickSubmit = async (e: React.MouseEvent<HTMLInputElement>) => {
    if (canSave) {
      const storeId = '34762349';
      const optionsRequest = {
        detail: optionDetails,
        name: optionName,
        type: optionType,
        options: options
      };

      try {
        const response = dispatch(
          addNewsOptions({ optionsRequest, storeId })
        ).unwrap();
        console.log('response:', response);
      } catch (error) {
        console.log('error:', error);
      }
    } else {
    }
  };
  const deleteOption = (option: string) => {
    let array = options;
    array = array.filter((item) => item.toLowerCase() !== option);
    setOptions((options) => options.filter((item) => item !== option));
  };

  const InputOptionDetails = useMemo(() => {
    return (
      <Input
        label="Nom de l’ensemble d’options"
        type="text"
        name="optionDetails"
        textInfos="Nommez cet ensemble d'options. Par exemple, vous pourriez nommer cet ensemble d’options Couleurs ou Tailles de chemises."
        textInfosDirection="bottom"
        placeholder="Taille de t-shirt"
        onChange={handleOptionDetails}
        value={optionDetails}
      />
    );
  }, [optionDetails]);

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
          onSubmit={handleSubmitForm}
        >
          {InputOptionDetails}

          <Input
            label="Nom à afficher"
            type="text"
            name="optionName"
            textInfos="Choisissez un nom à afficher pour cet ensemble d’options lors du paiement."
            textInfosDirection="bottom"
            placeholder="Taille"
            onChange={handleOptionName}
            value={optionName}
          />
          <Input
            label="Type d'ensemble d’options"
            type="radio"
            name="optionType"
            textInfos="Choisissez entre afficher les options uniquement en format texte ou à la fois en format texte et en plage de couleurs lors du passage en caisse."
            textInfosDirection="bottom"
            // @ts-ignore
            radioValues={['Texte', 'Couleur et texte']}
            onChange={handleOptionType}
            value={optionType}
          />
          <Options
            name="options"
            placeholder="Ajouter une option"
            options={options}
            onChange={handleOnChangeOption}
            onKeyDown={handleAddOption}
            value={optionName}
            deleteOption={deleteOption}
          />

          <Button type="submit" onClick={handleClickSubmit}>
            Enregistrer
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AddOptions;
