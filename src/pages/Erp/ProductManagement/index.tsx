import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Product, Products } from '../../../types/interfaces/Product';
import { RootState, AppDispatch } from '../../../store/store';

import { ProductModel } from '../../../models/product';

import {
  selectAllProducts,
  fetchProducts
} from '../../../features/product/productSlice';

interface Props {
  product: Product;
  index: number;
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
    const productsListModel = new ProductModel(product);
    console.log('productsListModel:', productsListModel);

    return (
      <tr key={index} className="hover">
        <th className=" pl-4 ">{index + 1}</th>
        <td>{product.name}</td>
        <td>{product.category}</td>
        <td>{product.stock}</td>
        <td>{product.ean}</td>
        <td>
          <button className="btn btn-secondary">Gérer</button>
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
          <progress className=" progress progress-primary w-56"></progress>
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
    <div className="">
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
