import React, { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Product,
  Products,
  ProductVariant
} from '../../../types/interfaces/Product';
import { RootState, AppDispatch } from '../../../store/store';
import {
  selectAllProducts,
  fetchProducts
} from '../../../features/product/productSlice';
import ProductVariantComponent from '../../../components/erp/Product/ProductVariantsList';
import Spinner from '../../../components/Spinner';

interface Props {
  product: Product;
  index: number;
  variantId?: string;
}

const ProductListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products: Products = useSelector(selectAllProducts);

  const productStatus: string = useSelector(
    (state: any) => state.products.status
  );
  const error: string | undefined = useSelector(
    (state: any) => state.products.error
  );

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, productStatus]);

  let ProductsList: React.FC<Props> = ({ product, index }) => {
    // const productsListModel = new ProductModel(product);

    return (
      <tr key={index}>
        <th className=" pl-4 ">{index + 1}</th>
        <td>{product.name}</td>
        <td>{product.category}</td>
        <td>{product.stock}</td>
        <td>{product.ean}</td>
        <td>
          <Link
            to={`/erp/products-management/update/${product.id}`}
            className="btn btn-secondary"
          >
            Gérer
          </Link>
        </td>
      </tr>
    );
  };

  ProductsList = React.memo(ProductsList);

  let content;

  if (productStatus === 'loading') {
    content = (
      <tr className="h-screen ">
        <td colSpan={6} className="text-center">
          <Spinner />
        </td>
      </tr>
    );
  } else if (productStatus === 'success') {
    const renderedProducts = products.map((product, index) => (
      <ProductsList key={index} product={product} index={index} />
    ));
    content = <>{renderedProducts}</>;
  } else if (productStatus === 'failed') {
    content = <div>{error?.toString()}</div>;
  }

  return (
    <div>
      <table className=" table table-compact w-full ">
        <thead>
          <tr>
            <th></th>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Stock</th>
            <th>Code bar</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
};
export default ProductListPage;
