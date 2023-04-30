import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createServer, Model, Factory } from 'miragejs';
import { faker } from '@faker-js/faker';
import { Products } from '../../../types/interfaces/Product';

const ProductListPage: React.FC = () => {
  const [productsState, setProducts] = useState<Products>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  console.log('products:', productsState);

  const productsList: JSX.Element[] = Array.isArray(productsState)
    ? productsState.map((product: any, index: number) => {
        return (
          <tr key={index} className="hover">
            <th className=" pl-4 ">{index}</th>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.stock}</td>
            <td>{product.ean}</td>
            <td>
              <button className="btn btn-secondary">Gérer</button>
            </td>
          </tr>
        );
      })
    : [];

  return (
    <>
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
          <tbody>
            {productsState ? (
              productsList
            ) : (
              <tr className="h-screen ">
                <td colSpan={6} className="text-center">
                  <progress className=" progress progress-primary w-56"></progress>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ProductListPage;
