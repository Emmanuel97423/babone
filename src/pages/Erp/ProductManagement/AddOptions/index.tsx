import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addOptions,
  selectOptions,
  fetchOptions,
  deleteOptions
} from '@/features/product/options/optionSlice';

import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Form from '@/components/ui/Form';
import Options from '@/components/ui/Options';
import Button from '@/components/ui/common/Button';
import type { AppDispatch, RootState } from '@/store/store';
import type { Option } from '@/types/features/product/OptionsType';
import { MdDeleteForever } from 'react-icons/md';

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

type OptionExpectProps = {
  option: Option;
};

const OptionExpect: React.FC<OptionExpectProps> = ({ option }) => {
  const dispatch: AppDispatch = useDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleUpdate = (e: React.MouseEvent, optionId: string | undefined) => {
    setOpenModal(true);
  };
  const handleDeleteOptions = async (optionId: string | undefined) => {
    try {
      if (optionId) {
        await dispatch(deleteOptions({ optionId: optionId }));
      }
    } catch (error) {
      console.log('error:', error);
    }
  };
  return (
    <>
      <tr
        key={option.id}
        className="hover cursor-pointer"
        onClick={(e) => handleUpdate(e, option.id)}
      >
        <td>{option.details}</td>
        <td>{option.options.join(', ')}</td>
        <td>0</td>
        <td>
          <MdDeleteForever
            size={22}
            className=" cursor-pointer"
            onClick={() => {
              if (option) {
                handleDeleteOptions(option.id);
              }
            }}
          />
        </td>
      </tr>
      <div
        className={`modal ${openModal ? 'modal-open' : ''}   `}
        id="update_option_modal"
      >
        <div className="modal-box">
          <button
            onClick={() => setOpenModal(false)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <h2 className="font-bold text-lg">Modifier l’ensemble d’options</h2>
          <div>
            {/* ts-ignore */}
            <Input
              label="Nom de l'ensemble d'options"
              type="text"
              name="optionName"
              textInfos="Nommez cet ensemble d’options. Par exemple, vous pourriez nommer cet ensemble d’options Couleurs ou Tailles de chemises."
              textInfosDirection="bottom"
              // placeholder="Taille"
              // onChange={handleOptionName}
              value={option.details}
              onChange={function (
                event: React.ChangeEvent<HTMLInputElement>
              ): void {
                throw new Error('Function not implemented.');
              }}
            />
          </div>
          <div className="modal-action">
            <a href="#" className="btn">
              Yay!
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const AddOptions: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [options, setOptions] = useState<string[]>(['XL', 'L']);
  const [optionDetails, setOptionDetails] = useState<string>('');
  const [optionName, setOptionName] = useState<string>('');
  const [optionType, setOptionType] = useState<string>('text');
  const [optionSelected, setOptionSelected] = useState<string>('');

  const optionRedux = useSelector(selectOptions);
  const optionReduxStatus = useSelector(
    (state: RootState) => state.options.loading
  );

  useEffect(() => {
    const storeId = '123456';

    if (optionReduxStatus === 'idle') {
      dispatch(fetchOptions({ storeId: storeId }));
    }
  }, [optionReduxStatus, dispatch]);

  const canSave = [options, optionDetails, optionName, optionType].every(
    Boolean
  );

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

  const handleOnChangeOption = (e: any) => {
    e.stopPropagation();

    setOptionSelected(e.target.value);
    if (e.key === 'Enter') {
      // const option = e.target.value;
      const record = options.find(
        (item) => item.toLowerCase() === optionSelected.toLowerCase()
      );
      setOptionName('');

      if (record) {
        return;
      }

      setOptions([...options, optionSelected]);
    }
  };

  // const handleAddOption = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   // e.stopPropagation();
  //   e.preventDefault();

  //   if (e.key === 'Enter') {
  //     // const option = e.target.value;
  //     const record = options.find(
  //       (item) => item.toLowerCase() === optionSelected.toLowerCase()
  //     );

  //     if (record) {
  //       return;
  //     }

  //     setOptions([...options, optionSelected]);
  //   }
  // };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    // e.stopPropagation();
  };
  const handleClickSubmit = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (canSave) {
      try {
        const resultAction = await dispatch(
          addOptions({
            data: {
              details: optionDetails,
              name: optionName,
              type: optionType,
              options: options,
              storeId: '123456'
            }
          })
        );
        if (addOptions.fulfilled.match(resultAction)) {
          // Here you might want to clear the form inputs
          setOptionDetails('');
          setOptionName('');
          setOptionType('text');
          setOptions([]);
        } else {
          // Handle the case when it is rejected.
          console.log('Rejected:', resultAction.payload);
        }
      } catch (error) {
        console.log('error:', error);
      }
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

  let optionsList;

  if (optionReduxStatus === 'idle') {
    optionsList = <>Loading...</>;
  } else if (optionReduxStatus === 'succeeded') {
    optionsList = (
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Nom de l'ensemble</th>
              <th>Options</th>
              <th>Article</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <>
              {optionRedux.map((option) => (
                <OptionExpect key={option.id} option={option} />
              ))}
            </>
          </tbody>
        </table>
      </div>
    );
  } else if (optionReduxStatus === 'failed') {
    optionsList = <div>Error</div>;
  }
  return (
    <div className="w-full flex flex-col">
      <div className=" flex justify-between p-4">
        <h2>Options</h2>
        <p className="w-1/2">
          Les options vous aident à créer et à organiser les variantes de vos
          articles avec des valeurs pouvant être sélectionnées au moment du
          passage en caisse.
        </p>
        <Modal
          labelButton="Créer un ensemble d'options"
          className="flex flex-col"
        >
          <Form
            className="flex flex-col items-stretch"
            // onSubmit={handleSubmitForm}
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
          </Form>
          <Options
            className="w-full"
            name="options"
            placeholder="Ajouter une option"
            options={options}
            onChange={handleOnChangeOption}
            onKeyDown={handleOnChangeOption}
            value={optionName}
            deleteOption={deleteOption}
          />

          <Button type="submit" onClick={handleClickSubmit}>
            Enregistrer
          </Button>
        </Modal>
      </div>
      <div className="w-full">{optionsList}</div>
    </div>
  );
};

export default AddOptions;
