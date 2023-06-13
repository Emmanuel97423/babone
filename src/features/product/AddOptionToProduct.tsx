import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalUI from '@/components/ui/Modal';
import {
  selectOptions,
  fetchOptions,
  optionsById
} from '@/features/product/options/optionSlice';
import type { AppDispatch, RootState } from '@/store/store';
import type { Option } from '@/types/features/product/OptionsType';

const AddOptionToProduct: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const fetchStatus: string = useSelector(
    (state: RootState) => state.options.loading
  );
  const state = useSelector((state: RootState) => state);

  const optionsList: Option[] = useSelector(selectOptions);
  const [modalOptionsOpen, setModalOptionsOpen] = useState<boolean>(false);
  const [optionsListString, setOptionsListString] = useState<string[]>();
  const [isInputDisabled, setInputDisabled] = useState(true);
  const storeId = '123456';

  const handleSearch: () => void = async () => {
    try {
      await dispatch(fetchOptions({ storeId: storeId }));
    } catch (error) {
      console.log('error:', error);
    }
  };
  const handleOptions: (id: string) => void = async (id) => {
    const optionById = optionsById(state, id);
    if (optionById) {
      setOptionsListString(optionById.options);
    }
  };

  let optionContent;

  if (fetchStatus === 'loading') {
    optionContent = <div>...Loading</div>;
  } else if (fetchStatus === 'succeeded') {
    optionContent = (
      <>
        {optionsList.map((option) => (
          <li key={option.id}>
            <a onClick={() => (option.id ? handleOptions(option.id) : null)}>
              {option.details}
            </a>
          </li>
        ))}
      </>
    );
  } else if (fetchStatus === 'failed') {
    optionContent = <li>Error...</li>;
  }

  // let optionsValues;
  // if (fetchStatus === 'loading') {
  //   optionsValues = <>Loading...</>;
  // } else if (fetchStatus === 'succeeded') {
  //   optionsValues = (
  //     <>
  //       {' '}
  //       {optionsListString?.map((item, index) => (
  //         <input
  //           key={index}
  //           disabled
  //           type="text"
  //           tabIndex={0}
  //           className="input  py-4 rounded-none px-2 cursor-pointer  bg-inherit focus:outline-none"
  //           value={item}
  //         />
  //       ))}
  //     </>
  //   );
  // }

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold ">Options</h2>
      <p className="text-justify">
        Appliquez un groupe d’options personnalisées à un article pour créer des
        variantes. Par exemple, les options de format peuvent créer les
        variantes tel que « petit, moyen et grand ».
      </p>
      <div>
        {/* <button className="btn" onClick={() => setModalOptionsOpen(true)}>
              Ajouter des options
            </button> */}
        <ModalUI
          titleModal="Ajouter des options"
          labelButton="Ajouter des options"
          btnClassName="btn w-full mt-12"
          isOpenModal={modalOptionsOpen}
          setIsModalOpen={setModalOptionsOpen}
        >
          <div className="flex flex-col">
            <div>
              <p>
                Créez des ensembles d’options pour grouper ces dernières. Par
                exemple, un ensemble appelé « Couleur principale » peut contenir
                des options en noir et blanc.
              </p>
            </div>
            <div className="flex  items-center border py-4 px-2 mt-4">
              <label className="font-semibold basis-1/2">
                Nom de l’ensemble d’options :
              </label>
              <div className="dropdown basis-1/2">
                {/* <label tabIndex={0} className="btn m-1 basis-1/2">
                  Click
                </label> */}
                <input
                  tabIndex={0}
                  className=" cursor-pointer  bg-inherit focus:outline-none"
                  placeholder="Rechercher"
                  onClick={handleSearch}
                />
                <ul
                  tabIndex={0}
                  className="dropdown-content  menu p-2 shadow bg-base-100  w-full mt-2"
                >
                  {optionContent}
                </ul>
              </div>
            </div>
            {/* <table className="flex flex-col w-full mt-12">
              <tr className="w-full font-semibold  text-left py-4 px-2">
                Options
              </tr>
              {optionsValues}
            </table> */}
            <table className="table-fixed w-full mt-12">
              <thead>
                <tr>
                  <th className="w-1/2 py-4 px-2 font-semibold text-left">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {optionsListString?.map((item, index) => (
                  <tr key={index} className="bg-inherit">
                    <td className="border ">
                      <input
                        disabled
                        type="text"
                        tabIndex={0}
                        className="w-full input py-4 rounded-none px-2 cursor-pointer bg-inherit focus:outline-none"
                        value={item}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="border ">
                    <input
                      disabled={
                        optionsListString && optionsListString.length > 0
                          ? false
                          : true
                      }
                      type="text"
                      tabIndex={0}
                      className="w-full input py-4 rounded-none px-2 cursor-pointer bg-inherit focus:outline-none"
                      placeholder="Ajouter une option"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <form className="relative flex items-center mt-4 p-4 border-2 ">
            <label className="text-bold basis-1/2">
              Nom de l’ensemble d’options
            </label>
            <div className=" basis-1/2 ">
              <div className="absolute  flex flex-col  px-2 ">
                <input
                  type="text"
                  className=" cursor-pointer  bg-inherit focus:outline-none"
                  placeholder="Rechercher"
                />
                <div className="relative cursor-pointer p-2 bg-inherit">
                  <p>Taille</p>
                </div>
              </div>
            </div>
          </form> */}
        </ModalUI>
      </div>
    </div>
  );
};

export default AddOptionToProduct;
