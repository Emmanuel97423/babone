import { useEffect, useMemo } from 'react';
import AddStore from './AddStore';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStores } from '@/features/store/storeSlice';
import Spinner from '@/components/ui/common/Spinner';
import type { RootState, AppDispatch } from '@/store/store';
interface Store {
  name: string;
  address: string;
  zip: number | null;
}
const StoreList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.store.loading);
  const storesState = useSelector((state: RootState) => state.store.entities);
  const user = useSelector((state: RootState) => state.auth.entities);
  useEffect(() => {
    if (user) {
      dispatch(fetchStores({ userId: user.id }));
    }
  }, []);
  const stores: Store[] = [
    { name: 'Exo-Trap', address: 'foo', zip: 97460 },
    { name: 'Littoral Pêche', address: 'foo', zip: 97460 }
  ];

  const list = useMemo(() => {
    return storesState.map((store: Store, index: number) => (
      <div key={index}>
        <div className="card w-96 bg-base-100 shadow-xl image-full mt-6">
          <figure>
            <img
              src="https://picsum.photos/384/200?grayscale"
              alt="store-image"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{store.name}</h2>
            {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Modifier</button>
              <button className="btn btn-primary">Choisir</button>
            </div>
          </div>
        </div>
      </div>
    ));
  }, [storesState]);

  let content;
  if (loading === 'pending') {
    content = (
      <div className="h-screen w-full">
        <Spinner />
      </div>
    );
  } else if (loading === 'succeeded') {
    content = <>{list}</>;
  } else if (loading === 'failed') {
    content = <>Une erreur est survenue...</>;
  }

  return (
    <>
      <AddStore />

      <div className="flex justify-center flex-wrap items-center gap-4 ">
        {content}
      </div>
    </>
  );
};
export default StoreList;
