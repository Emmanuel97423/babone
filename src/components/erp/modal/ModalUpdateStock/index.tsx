import { useState } from 'react';
import type { Product } from '../../../../types/interfaces/Product';
import { useGetProductVariantQuery } from '../../../../features/api/apiSlice';
import Spinner from '../../../../components/Spinner';

interface Props {
  variantId: string;
  index: number;
}
interface Motif {
  motif: string;
  code: number;
}

const ProductVariantList: React.FC<Props> = ({ variantId, index }) => {
  const [motifCode, setMotifCode] = useState<number>(0);
  const [value, setValue] = useState<number | undefined | any>(undefined);
  const [isDamageSelected, setIsDamageSelected] = useState<boolean>(false);

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

  // const makeNegative: () => void = () => {
  //   if (value) {
  //     setValue(-value);
  //   }
  // };
  // const makePositive: () => void = () => {
  //   if (value) {
  //     setValue(+value);
  //   }
  // };

  // const changeMotifValue: (e: React.ChangeEvent<HTMLInputElement>) => void = (
  //   e
  // ) => {
  //   console.log('e:', e.target.value);
  //   setValue(parseInt(e.target.value));
  // };

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
    } else {
      setIsDamageSelected(false);
    }
  };
  const inputValueOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    console.log('isDamageSelected:', isDamageSelected);
    console.log('motifCode:', motifCode);

    if (motifCode === 3) {
      setIsDamageSelected(true);
      setValue(-parseInt(e.target.value));
    } else {
      setValue(parseInt(e.target.value));
      setIsDamageSelected(false);
    }
    console.log('value', value);
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

          <td>{productVariant?.stock}</td>
          <td>
            <select
              className="select select-bordered w-full max-w-xs"
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
              value={isDamageSelected ? -value : value}
              placeholder="0"
              className="input input-bordered w-18 disabled"
              disabled={motifCode === 0}
              onChange={inputValueOnchange}
            />
          </td>
          <td>
            <input
              type="string"
              min="0"
              placeholder="0"
              className="input input-bordered w-16 "
              disabled={motifCode === 0 || motifCode === 1}
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
            <div className="w-full flex justify-between px-4 ">
              <button className="btn btn-error text-white mt-6 overflow-hidden">
                Annulé
              </button>
              <button
                type="submit"
                className="btn btn-primary  mt-6 overflow-hidden"
              >
                Terminé
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalUpdateStock;
