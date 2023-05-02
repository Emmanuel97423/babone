import { useSelector, useDispatch } from 'react-redux';
import { useGetProductVariantQuery } from '../../../../features/api/apiSlice';
import Spinner from '../../../../components/Spinner';
interface Props {
  variantId: string;
  index: number;
}

const ProductVariantComponent: React.FC<Props> = ({ variantId, index }) => {
  const dispatch = useDispatch();
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
          <th className=" pl-4 ">{index + 1}</th>
          <td>{productVariant?.name}</td>
          <td></td>
          <td>{productVariant?.stock}</td>
          <td>{productVariant?.ean}</td>
          <td>
            <button className="btn btn-secondary">Gérer</button>
          </td>
        </tr>
      </>
    );
  }

  return <>{content}</>;
};

export default ProductVariantComponent;
