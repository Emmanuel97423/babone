import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
      dispatch(fetchVariants());
      // if (result.data.length > 0) {
      //   console.log('result:', result);
      // }
    } catch (error) {
      console.log('error:', error);
    }
  }, []);
  return (
    <>
      <TableUI data={variants} />{' '}
    </>
  );
};
export default VariantsList;
