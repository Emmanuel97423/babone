import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductVariant } from '../../../../types/interfaces/Product';
import { fetchProductVariant } from '../../../../features/product/productVariantSlice';
import { Dispatch } from 'redux';
import { useGetProductVariantQuery } from '../../../../features/api/apiSlice';

interface Props {
  variantId: string;
  index: number;
}

const ProductVariantComponent: React.FC<Props> = ({ variantId, index }) => {
  console.log('variantId:', variantId);
  const dispatch = useDispatch();
  const {
    data: productVariant,
    error,
    isLoading
  } = useGetProductVariantQuery(variantId);
  //   const productVariantIds = useSelector(selectAllProductVariants);
  console.log('productVariant:', productVariant);

  const productVariantStatus: string = useSelector(
    (state: any) => state.productVariant.status
  );

  const productVariantError: string | undefined = useSelector(
    (state: any) => state.productVariant.error
  );
  //   const productVariants: ProductVariant = useSelector(selectAllProductVariants);
  //   console.log('productVariants:', productVariants);

  //   const product = productVariants[variantId];

  return (
    <>
      <tr key={index} className="hover ">
        <th className=" pl-4 ">{index + 1}</th>
        <td>{productVariant?.name}</td>
        <td>{productVariant?.category}</td>
        <td>{productVariant?.stock}</td>
        <td>{productVariant?.ean}</td>
        <td>
          <button className="btn btn-secondary">Gérer</button>
        </td>
      </tr>
    </>
  );
};

export default ProductVariantComponent;
