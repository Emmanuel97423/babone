import type { Product } from '../../../../types/interfaces/Product';
import { useGetProductVariantQuery } from '../../../../features/api/apiSlice';
import Spinner from '../../../../components/Spinner';

interface Props {
  variantId: string;
  index: number;
}

const ProductVariantList: React.FC<Props> = ({ variantId, index }) => {
  const {
    data: productVariant,
    error,
    isLoading
  } = useGetProductVariantQuery(variantId);

  let content;

  if (isLoading) {
    content = (
      <tr className="h-full ">
        <td colSpan={6} className="text-center">
          <Spinner />
        </td>
      </tr>
    );
  } else if (error) {
    content = (
      <div>
        <p>Error</p>
      </div>
    );
  } else if (productVariant) {
    content = (
      <>
        <tr key={index} className="hover ">
          <th className=" pl-4 "></th>
          <td>{productVariant?.name}</td>

          <td>{productVariant?.stock}</td>
          <td>
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Selectionner un motif
              </option>
              <option>Inventaire reçu</option>
              <option>Recomptage des stocks</option>
              <option>Dommage</option>
              <option>Vol</option>
              <option>Perte</option>
              <option>Réaprovisionner un article retourné</option>
            </select>
          </td>
          <td>
            <input
              type="number"
              min="0"
              placeholder="0"
              className="input input-bordered w-16 appearance-none"
            />
          </td>
          <td>
            <input
              type="number"
              min="0"
              placeholder="0"
              className="input input-bordered w-16 "
            />
          </td>
        </tr>
      </>
    );
  }

  return <>{content}</>;
};

const ModalUpdateStock: React.FC<Product> = ({ id, variantIds }) => {
  return (
    <>
      <input type="checkbox" id="modal-update-stock" className="modal-toggle" />
      <div className="modal w-screen">
        <div className="modal-box  max-w-5xl absolute top-24 text-center flex flex-col ">
          <h2 className="text-8xl font-semibold justify-self-start">
            Gérer les stocks
          </h2>
          <label
            htmlFor="modal-update-stock"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Alternative</th>
                  <th>Stock disponible</th>
                  <th>Motif</th>
                  <th>Ajustement</th>
                  <th>Nouveau</th>
                </tr>
              </thead>
              <tbody>
                {variantIds?.map((variantId, index) => (
                  <ProductVariantList
                    key={index}
                    index={index}
                    variantId={variantId}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalUpdateStock;
