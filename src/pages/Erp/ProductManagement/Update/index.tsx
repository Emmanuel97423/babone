import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Dropdown from '../../../../components/erp/Product/Add/Dropdown';
import Modal from '../../../../components/erp/Product/Add/Modal';
import ProductVariantComponent from '../../../../components/erp/Product/ProductVariantsList';
import Spinner from '../../../../components/Spinner';

import { useGetProductQuery } from '../../../../features/api/apiSlice';
const UpdateProduct = () => {
  const { id } = useParams<{ id: any }>();
  const { data: product, error, isLoading } = useGetProductQuery(id);

  let content;

  if (isLoading) {
    console.log('isLoading:', isLoading);
    content = (
      <div className="w-full h-full flex justify-center items-center ">
        <Spinner />
      </div>
    );
  } else if (error) {
    console.log('error:', error);
    content = (
      <div>
        <p>Error</p>
      </div>
    );
  } else if (product) {
    content = (
      <div className=" p-4 flex flex-col justify-center items-center z-40  relative">
        <h1 className="text-3xl font-bold">
          Modifier {product?.name ? product.name : 'le produit'}
        </h1>
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
                placeholder={product?.name ? product?.name : 'Nom'}
                className="input input-bordered w-full max-w-xl  hover:input-accent "
              />
              {/* <label className="label">
              <span className="label-text">Catégorie</span>
            </label> */}
              <Dropdown
                options={[{ value: 'Moulinets', label: 'Moulinets' }]}
                placeholder={product?.category}
              />
            </div>
            <div className="card w-96 h-10 bg-base-100 shadow-xl image-full">
              <figure>
                <img src={product?.images[0]} alt="Shoes" className="w-full" />
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
            <div className="flex flex-col py-12 justify-between items-center w-full">
              <div className="flex justify-between items-center w-full py-8">
                <h2 className="text-xl font-bold ">Variantes</h2>
                {/* <p className="text-accent font-bold cursor-pointer">
              Modifier les détails de la variante
            </p> */}
                <label
                  htmlFor="my-modal-3"
                  className="text-accent font-bold cursor-pointer"
                >
                  Modifier les détails du produit de base
                </label>
              </div>
              <div className="w-full">
                <table className=" table table-compact w-full flex">
                  <thead className="w-full">
                    <tr>
                      <th></th>
                      <th>Nom</th>
                      <th></th>
                      <th>Stock</th>
                      <th>Code bar</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    {product
                      ? product.variantIds?.map((variantId, index) => (
                          <ProductVariantComponent
                            key={index}
                            index={index}
                            variantId={variantId}
                          />
                        ))
                      : 'No variants'}
                  </tbody>
                </table>
                <div className="w-full flex justify-between items-center mt-10 px-6 text-base font-semibold">
                  <p className="cursor-pointer ">Ajouter une variante</p>

                  <p className="cursor-pointer">Gérer les stock</p>
                  <p className="cursor-pointer">Modifier le suivi des stocks</p>
                </div>
              </div>
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
            <input
              type="number"
              placeholder="Prix 0.00 €"
              min="0"
              className="appearance-none input input-bordered w-full  "
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
  }

  return <>{content}</>;
};
export default UpdateProduct;
