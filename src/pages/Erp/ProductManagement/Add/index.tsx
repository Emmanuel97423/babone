import React, { useState } from 'react';
import Dropdown from '../../../../components/erp/Product/Add/Dropdown';

interface Tab {
  title: string;
  content: JSX.Element | string;
}

const AddProduct: React.FC = () => {
  const Modal: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleClickTab = (
      index: number,
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ): void => {
      setActiveTab(index);
      e.stopPropagation();
    };

    const DetailsTabContent = (): JSX.Element => {
      return (
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            {/* head */}

            <tbody className=" w-full">
              {/* row 1 */}
              <tr className="hover">
                <td>SKU</td>
                <td>
                  <input
                    type="text"
                    placeholder="SKU"
                    className="input input-bordered input-sm w-full max-w-xs"
                  />
                </td>
              </tr>
              {/* row 2 */}
              <tr className="hover">
                <td>EAN CODE</td>
                <td>
                  <input
                    type="text"
                    placeholder="EAN CODE"
                    className="input input-bordered input-sm w-full max-w-xs"
                  />
                </td>
              </tr>
              {/* row 3 */}
              <tr className="hover">
                <td>PRIX (€)</td>
                <td>
                  {' '}
                  <input
                    type="number"
                    placeholder="0.00"
                    min="0"
                    className="appearance-none input input-bordered input-sm w-full  "
                  />
                </td>
              </tr>
              <h2 className="mt-6 text-xl font-bold">Ajouter des images</h2>
              <input
                type="file"
                className=" my-6 file-input file-input-bordered file-input-accent w-96 "
                multiple
              />
              {/* row 3 */}
            </tbody>
          </table>
          <button
            type="submit"
            className="btn btn-primary w-50 mt-6 overflow-hidden"
          >
            Terminé
          </button>
        </div>
      );
    };

    const tabs: Tab[] = [
      {
        title: 'Détails',
        content: <DetailsTabContent />
      },
      {
        title: 'Gérer les stocks',
        content: 'Contenu du tab 2'
      },
      {
        title: 'Attributs personnalisés',
        content: 'Contenu du tab 3'
      }
    ];

    return (
      <>
        {/* The button to open modal */}

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal-3" className="modal-toggle " />
        <div className="modal w-screen">
          <div className="modal-box max-w-2xl absolute top-36 text-center flex flex-col ">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h2 className="text-2xl font-bold py-4">Modifier la variante</h2>
            <div className="w-full flex items-center justify-center">
              {' '}
              <div className="tabs  flex justify-center items-center">
                {tabs.map((tab: Tab, index: number) => (
                  <a
                    className={`tab tab-bordered ${
                      activeTab === index ? 'tab-active' : ''
                    }`}
                    key={index}
                    onClick={(e) => {
                      handleClickTab(index, e);
                    }}
                  >
                    {tab.title}
                  </a>
                ))}
                <div className="tab-content  w-full flex justify-center items-center">
                  {tabs[activeTab].content}
                </div>
              </div>
            </div>
            {/* <h3 className="text-lg font-bold">
              Congratulations random Internet user!
            </h3>
            <p className="py-4">
              You've been selected for a chance to get one year of subscription
              to use Wikipedia for free!
            </p> */}
          </div>
        </div>
      </>
    );
  };
  return (
    <div className=" p-4 flex flex-col justify-center items-center z-40  relative">
      <h1 className="text-3xl font-bold">Créer un produit</h1>
      <div className="form-control  ">
        <h2 className="text-xl py-4 font-bold">Détails</h2>

        <div className="flex">
          <div className="flex flex-col mr-2">
            {' '}
            {/* <label htmlFor="name" className="label ">
              <span className="label-text">Nom</span>
            </label> */}
            <input
              id="name"
              type="text"
              placeholder="Nom"
              className="input input-bordered w-full max-w-xl  hover:input-accent "
            />
            {/* <label className="label">
              <span className="label-text">Catégorie</span>
            </label> */}
            <Dropdown options={[{ value: 'Moulinets', label: 'Moulinets' }]} />
          </div>
          <div className="card w-96 h-10 bg-base-100 shadow-xl image-full">
            <figure>
              <img src="https://placehold.co/600x400" alt="Shoes" />
            </figure>
            <div className="card-body justify-center items-center">
              {/* <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p> */}
              <div className="card-actions ">
                {/* <button className="btn btn-primary">Modifier</button> */}
                <input type="file" className="file-input w-full max-w-xs" />
              </div>
            </div>
          </div>
        </div>
        {/* <label className="label">
          <span className="label-text">Desccription</span>
        </label> */}
        <textarea
          placeholder="Description"
          className="textarea textarea-bordered textarea-lg w-full  hover:input-accent"
        ></textarea>
        <button className=" w-full btn mt-4">Point de vente</button>
        <div>
          <div className="flex py-12 justify-between items-center">
            <h2 className="text-xl font-bold ">Variantes</h2>
            {/* <p className="text-accent font-bold cursor-pointer">
              Modifier les détails de la variante
            </p> */}
            <label
              htmlFor="my-modal-3"
              className="text-accent font-bold cursor-pointer"
            >
              Modifier les détails de la variante
            </label>
          </div>
          <input
            type="text"
            placeholder="REF"
            className="input input-bordered w-full   hover:input-accent "
          />
          <input
            type="text"
            placeholder="EAN CODE"
            className="input input-bordered w-full  my-2 hover:input-accent "
          />
        </div>
        {/* <label className="label">
          <span className="label-text-alt">Requis</span>
        </label> */}
      </div>

      {/* modal */}
      <Modal />
    </div>
  );
};
export default AddProduct;
