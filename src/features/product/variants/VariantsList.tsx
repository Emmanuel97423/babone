import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ColumnDef } from '@tanstack/react-table';
import { fetchVariants } from './variantSlice';
import TableUI from '@/components/ui/Table';
import type { ProductVariant } from '@/types/interfaces/Product';
import type { RootState } from '@/store/store';

const VariantsList: React.FC = () => {
  const dispatch = useDispatch();
  const fetchVariantsStatus = useSelector<RootState>(
    (state) => state.variants.loading
  );
  const variants: ProductVariant[] | unknown = useSelector<RootState>(
    (state) => state.variants.entities
  );

  useEffect(() => {
    try {
      // @ts-ignore
      dispatch(fetchVariants());
      // if (result.data.length > 0) {
      //   console.log('result:', result);
      // }
    } catch (error) {
      console.log('error:', error);
    }
  }, []);

  const columns = useMemo<ColumnDef<ProductVariant, any>[]>(
    () => [
      {
        header: 'Liste des variantes',
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: 'name',
            cell: (info) => info.getValue(),
            header: () => <span>Nom variantes</span>,
            footer: (props) => props.column.id
          },
          {
            accessorFn: (row) => row.brand,
            accessorKey: 'brand',
            cell: (info) => info.getValue(),
            header: () => <span>Marques</span>,
            footer: (props) => props.column.id
          },
          {
            accessorFn: (row) => row.manufacturer,
            accessorKey: 'manufacturer',
            cell: (info) => info.getValue(),
            header: () => <span>Fournisseurs</span>,
            footer: (props) => props.column.id
          },
          {
            accessorFn: (row) => row.stock,
            accessorKey: 'stock',
            cell: (info) => info.getValue(),
            header: () => <span>Stock</span>,
            footer: (props) => props.column.id
          },
          {
            accessorFn: (row) => row.priceHt,
            accessorKey: 'priceHt',
            cell: (info) => info.getValue(),
            header: () => <span>Prix H.T</span>,
            footer: (props) => props.column.id
          },
          {
            accessorFn: (row) => row.tva,
            accessorKey: 'tva',
            cell: (info) => info.getValue(),
            header: () => <span>Tva</span>,
            footer: (props) => props.column.id
          },
          {
            accessorFn: (row) => row.priceTtc,
            accessorKey: 'priceTtc',
            cell: (info) => info.getValue(),
            header: () => <span>Prix T.T.C</span>,
            footer: (props) => props.column.id
          }

          // {
          //   accessorFn: (row) => `${row.firstName} ${row.lastName}`,
          //   id: 'fullName',
          //   header: 'Full Name',
          //   cell: (info) => info.getValue(),
          //   footer: (props) => props.column.id,
          //   filterFn: 'fuzzy',
          //   sortingFn: fuzzySort
          // }
        ]
      }
      // {
      //   header: 'Info',
      //   footer: (props) => props.column.id,
      //   columns: [
      //     {
      //       accessorKey: 'age',
      //       header: () => 'Age',
      //       footer: (props) => props.column.id
      //     },
      //     {
      //       header: 'More Info',
      //       columns: [
      //         {
      //           accessorKey: 'visits',
      //           header: () => <span>Visits</span>,
      //           footer: (props) => props.column.id
      //         },
      //         {
      //           accessorKey: 'status',
      //           header: 'Status',
      //           footer: (props) => props.column.id
      //         },
      //         {
      //           accessorKey: 'progress',
      //           header: 'Profile Progress',
      //           footer: (props) => props.column.id
      //         }
      //       ]
      //     }
      //   ]
      // }
    ],
    []
  );

  return (
    <>
      <TableUI
        // @ts-ignore
        data={variants}
        columns={columns}
      />{' '}
    </>
  );
};
export default VariantsList;
