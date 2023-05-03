import { useState } from 'react';

const ModalAddVariant: React.FC = () => {
  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="my-modal-add-variant"
        className="modal-toggle "
      />
      <div className="modal w-screen ">
        <div className="modal-box max-w-2xl absolute top-24 text-center flex flex-col ">
          <label
            htmlFor="my-modal-add-variant"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-2xl font-bold py-4">Ajouter une variante</h2>
          <div className="w-full  flex items-center justify-center">
            {' '}
            <div className="overflow-x-auto w-full ">
              <table className="table w-full">
                {/* head */}

                <tbody className=" w-full flex flex-col  justify-center items-center  ">
                  <tr className="hover w-full flex justify-between mt-6 ">
                    <td className="basis-1/4">Nom</td>
                    <td className="grow justify-self-end">
                      <input
                        type="text"
                        placeholder="Nom de la variante"
                        className="input input-bordered input-sm w-full "
                      />
                    </td>
                  </tr>
                  {/* row 1 */}
                  <tr className="hover w-full flex justify-between">
                    <td className="basis-1/4">SKU</td>
                    <td className="grow flex justify-self-end">
                      <input
                        type="text"
                        placeholder="SKU"
                        className="input input-bordered input-sm grow "
                      />
                    </td>
                  </tr>
                  {/* row 2 */}
                  <tr className="hover w-full flex justify-between">
                    <td className="basis-1/4">EAN CODE</td>
                    <td className="grow flex justify-self-end">
                      <input
                        type="text"
                        placeholder="EAN CODE"
                        className="input input-bordered input-sm grow "
                      />
                    </td>
                  </tr>
                  {/* row 3 */}
                  <tr className="hover w-full flex justify-between">
                    <td className="basis-1/4">PRIX (€)</td>
                    <td className="grow justify-self-end flex">
                      {' '}
                      <input
                        type="number"
                        placeholder="0.00"
                        min="0"
                        className="appearance-none input input-bordered input-sm grow "
                      />
                    </td>
                  </tr>
                  <div className="w-full flex flex-col justify-center items-center">
                    <h2 className="mt-6 text-xl font-bold">
                      Ajouter des images
                    </h2>
                    <input
                      type="file"
                      className=" my-6 file-input file-input-bordered file-input-accent w-full "
                      multiple
                    />
                  </div>
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

export default ModalAddVariant;
