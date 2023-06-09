import React, { useState, useEffect } from 'react';
import type { Product, ProductVariant } from '@/types/interfaces/Product';
import {
  useGetProductVariantQuery,
  useGetProductStockQuery,
  useUpdateProductVariantMutation
} from '@/features/api/apiSlice';
import Spinner from '@/components/ui/common/Spinner';
import { AiOutlineCheck } from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';

interface Props {
  variantId: string;
  index: number;
}
interface Motif {
  motif: string;
  code: number;
}

interface Stock {
  variantId: string;
  stock: number;
}

const ProductVariantList: React.FC<Props> = ({ variantId, index }) => {
  const [motifCode, setMotifCode] = useState<number>(0);
  const [isDamageSelected, setIsDamageSelected] = useState<boolean>(false);
  const [stockValue, setStockValue] = useState<number | undefined | any>(0);
  const [stockAjustement, setStockAjustement] = useState<any>('0');
  const [currentStock, setCurrentStock] = useState<number | undefined | any>();

  const motifs: Motif[] = [
    { motif: 'Inventaire reçu', code: 1 },
    { motif: 'Recomptage des stocks', code: 2 },
    { motif: 'Dommage', code: 3 },
    { motif: 'Vol', code: 4 },
    { motif: 'Perte', code: 5 },
    { motif: 'Réaprovisionner un article retourné', code: 6 }
  ];

  const {
    data: productVariant,
    error,
    isLoading
  } = useGetProductVariantQuery(variantId);
  const [updateStockVariant, { isLoading: updateStockIsLoading }] =
    useUpdateProductVariantMutation();

  useEffect(() => {
    if (productVariant) {
      setStockValue(productVariant?.stock);
      setCurrentStock(productVariant?.stock);
    }
  }, [productVariant]);

  const motifOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void = (
    e
  ) => {
    // setValue(parseInt(e.target.value));

    const code = parseInt(e.target.value);
    console.log('code:', code);
    console.log('isDamageSelected:', isDamageSelected);

    setMotifCode(code);
    if (code === 3) {
      setIsDamageSelected(true);
    } else if (code === 2) {
      setStockAjustement(0);
      setIsDamageSelected(false);
    }
    // else if (code !== 3) {
    //   setIsDamageSelected(false);
    // }
  };
  const ajustementOnBlur: (
    e: React.ChangeEvent<HTMLInputElement>,
    variantId: string
  ) => void = (e, variantId) => {
    if (motifCode === 1 || motifCode === 6) {
      if (currentStock) {
        setStockValue(currentStock + parseInt(e.target.value));

        // useUpdateProductVariantMutation();
        // setStockAjustement(parseInt(e.target.value));
      }
    } else if (motifCode === 3 || motifCode === 4 || motifCode === 5) {
      if (currentStock) {
        setStockValue(currentStock - parseInt(e.target.value));
        // setStockAjustement(parseInt(e.target.value));
      }
    }
  };

  const stockOnBlur: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    if (motifCode === 1 || motifCode === 6) {
      if (currentStock) {
        setStockAjustement(parseInt(e.target.value) - currentStock);
        setStockValue(parseInt(e.target.value));
        if (parseInt(e.target.value) < currentStock) {
          setStockValue(currentStock);
          setStockAjustement(0);
        }
      }
    } else if (motifCode === 3 || motifCode === 4 || motifCode === 5) {
      if (currentStock) {
        setStockAjustement(currentStock - parseInt(e.target.value));
        setStockValue(parseInt(e.target.value));
        if (parseInt(e.target.value) > currentStock) {
          setStockValue(currentStock);
          setStockAjustement(0);
        }
      }
    }
  };

  const updateStock: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    setStockValue(parseInt(e.target.value));
  };
  const updateAjustement: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    console.log(
      '!Number.isFinite(e.target.value):',
      !Number.isFinite(e.target.value)
    );
    if (!Number.isFinite(e.target.value)) {
      setStockAjustement(parseInt(e.target.value));

      return;
    }
  };

  const handleUpdateStock: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    try {
      const payload = await updateStockVariant({
        id: variantId,
        stock: stockValue
      });
      setCurrentStock(stockValue);
      console.log('fulfilled', payload);
    } catch (error) {
      console.log('error:', error);
    }
  };

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
          <td>{productVariant?.name}</td>

          <td>{currentStock}</td>
          <td>
            <select
              className="select select-bordered w-full max-w-xs"
              defaultValue="Selectionner un motif"
              onChange={motifOnChange}
            >
              <option disabled selected>
                Selectionner un motif
              </option>
              {motifs.map((motif, index) => (
                <option key={index} value={motif.code}>
                  {motif.motif}
                </option>
              ))}
            </select>
          </td>
          <td>
            <input
              type="number"
              value={stockAjustement}
              placeholder="0"
              className="input input-bordered w-20  appearance-none"
              disabled={motifCode === 0 || motifCode === 2}
              onBlur={(e) => {
                // @ts-ignore
                ajustementOnBlur(e, productVariant?.id);
              }}
              onChange={updateAjustement}
              min="1"
            />
          </td>
          <td>
            <input
              type="number"
              value={stockValue}
              // placeholder={10}
              className="input input-bordered w-20 "
              disabled={
                motifCode === 0 ||
                motifCode === 1 ||
                motifCode === 3 ||
                motifCode === 4 ||
                motifCode === 5 ||
                motifCode === 6
              }
              onBlur={stockOnBlur}
              min="0"
              onChange={updateStock}
            />
          </td>
          <td
          // className={`${
          //   isNaN(currentStock) || isNaN(stockValue) ? 'hidden' : ''
          // }`}
          >
            <button
              onClick={handleUpdateStock}
              className={`"flex justify-center items-center btn bg-primary :hover-accent" ${
                currentStock == stockValue && 'hidden'
              }`}
            >
              <AiOutlineCheck className="cursor-pointer" />
            </button>
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
        <div className="modal-box  max-w-5xl absolute top-9 text-center flex flex-col ">
          <h2 className="text-3xl text-left font-semibold justify-self-start pb-6 pl-4">
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
                  <th>Alternative</th>
                  <th>Stock actuelle</th>
                  <th>Motif</th>
                  <th>Ajustement</th>
                  <th>Nouveau</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {variantIds?.map((variantId, index) => (
                  <ProductVariantList
                    key={index}
                    index={index}
                    // @ts-ignore
                    variantId={variantId}
                  />
                ))}
              </tbody>
            </table>
            {/* <div className="w-full flex justify-between px-4 ">
              <button className="btn btn-error text-white mt-6 overflow-hidden">
                Annulé
              </button>
              <button
                type="submit"
                className="btn btn-primary  mt-6 overflow-hidden"
              >
                Terminé
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalUpdateStock;
