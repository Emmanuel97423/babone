import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Dropdown from '@/components/erp/Product/Add/Dropdown';
import ProductVariantList from '@/components/erp/List/ProductVariantsList';
import Spinner from '@/components/ui/common/Spinner';
import ModalVariant from '@/components/erp/modal/ModalAddVariant';
import ModalBaseVariant from '@/components/erp/modal/ModalUpdateBaseVariant';
import ModalUpdateStock from '@/components/erp/modal/ModalUpdateStock';
import { useGetProductQuery } from '@/features/api/apiSlice';
import type { Product } from '@/types/interfaces/Product';

const UpdateProduct: React.FC = () => {
  const { id } = useParams<{ id: any }>();
  const { data: product, error, isLoading } = useGetProductQuery(id);

  let content;

  if (isLoading) {
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
                // @ts-ignore
                placeholder={product?.category}
              />
            </div>
            <div className="card w-96 h-10 bg-base-100 shadow-xl image-full">
              <figure>
                <img
                  // @ts-ignore
                  src={product?.images[0]}
                  alt="Shoes"
                  className="w-full"
                />
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
                      <th>Prix</th>
                      <th>Stock</th>
                      <th>Code bar</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    {product
                      ? product.variantIds?.map((variantId, index) => (
                          <ProductVariantList
                            key={index}
                            index={index}
                            // @ts-ignore
                            variantId={variantId}
                          />
                        ))
                      : 'No variants'}
                  </tbody>
                </table>
                <div className="w-full flex justify-between items-center mt-10 px-6 text-base font-semibold">
                  <label
                    className="cursor-pointer"
                    htmlFor="my-modal-add-variant"
                  >
                    Ajouter une variante
                  </label>
                  <label
                    className="cursor-pointer"
                    htmlFor="modal-update-stock"
                  >
                    Gérer les stocks
                  </label>
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
        <ModalBaseVariant />
        <ModalVariant />
        <ModalUpdateStock
          id={product.id}
          storeId={''}
          sku={''}
          name={''}
          // @ts-ignore
          category={''}
          description={''}
          price={0}
          images={[]}
          variantIds={product.variantIds}
        />
      </div>
    );
  }

  return <>{content}</>;
};
export default UpdateProduct;
