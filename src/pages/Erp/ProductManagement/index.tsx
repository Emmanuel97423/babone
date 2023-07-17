import React, { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Product, Products, ProductVariant } from '@/types/interfaces/Product';
import { RootState, AppDispatch } from '@/store/store';
import {
  selectAllProducts,
  fetchProducts
} from '@/features/product/productSlice';
// import {importCSV} from '@/features/catalog/';
import ProductVariantComponent from '@/components/erp/List/ProductVariantsList';
import Spinner from '@/components/ui/common/Spinner';
import DropdownUI from '@/components/ui/Dropdown';
import ImportCatalogue from '@/features/catalog/ImportCatalog';
import ModalUI from '@/components/ui/Modal';

interface Props {
  product: Product;
  index: number;
  variantId?: string;
}

const ProductListPage: React.FC = () => {
  const [openModalImport, setOpenModalImport] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const products: Products = useSelector(selectAllProducts);
  const store = useSelector((state: RootState) => state.store.entitie);
  const storeId = store[0].id;

  const productStatus: string = useSelector(
    (state: any) => state.products.status
  );
  const error: string | undefined = useSelector(
    (state: any) => state.products.error
  );

  useEffect(() => {
    console.log('storeId:', storeId);
    console.log('productStatus:', productStatus);
    dispatch(fetchProducts({ storeId }));

    // if (productStatus === 'idle') {
    //   dispatch(fetchProducts({ storeId }));
    // }
  }, []);

  let ProductsList: React.FC<Props> = ({ product, index }) => {
    // const productsListModel = new ProductModel(product);

    return (
      <tr key={index}>
        <th className=" pl-4 ">{index + 1}</th>
        <td>{product.name}</td>

        <td>
          {/* @ts-ignore */}
          {product.category}
        </td>
        <td>{product.stock}</td>
        <td>{product.ean}</td>
        <td className=" pr-4">
          <Link
            aria-disabled="true"
            to={`/erp/products-management/update/${product.id}`}
            className="btn btn-disabled btn-secondary w-full disabled "
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
    if (products.length < 1) {
      content = (
        <div className="h-full w-full flex justify-center items-center">
          Vous n'avez aucun article...
        </div>
      );
    } else {
      const renderedProducts = products.map((product, index) => (
        <ProductsList key={index} product={product} index={index} />
      ));
      content = <>{renderedProducts}</>;
    }
  } else if (productStatus === 'failed') {
    content = <div>{error?.toString()}</div>;
  }

  const handleImportCatalog: (e: React.MouseEvent) => void = (e) => {
    console.log('e:', e);
    // dispatch(setOpenModalImport);
  };

  return (
    <div>
      <div className="flex p-4">
        <div></div>
        <DropdownUI className="ml-auto" labelButton="Actions">
          <li>
            <a onClick={() => setOpenModalImport(true)}>
              Importer le catalogue
            </a>
          </li>
          <li>
            <a>Exporter le catalogue</a>
          </li>
        </DropdownUI>
        <ImportCatalogue
          isOpenModal={openModalImport}
          setIsModalOpen={(open) => setOpenModalImport(open)}
        />
      </div>
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
