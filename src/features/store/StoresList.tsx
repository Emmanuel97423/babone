import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AddStore from './AddStore';
import UpdateStore from './UpdateStore';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStores, storeById } from '@/features/store/storeSlice';
import Spinner from '@/components/ui/common/Spinner';
import type { RootState, AppDispatch } from '@/store/store';
interface Store {
  id?: number;
  name: string;
  address: string;
  zip: number | null;
}
const StoreList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.store.loading);
  const storesState = useSelector((state: RootState) => state.store.entities);
  const user = useSelector((state: RootState) => state.auth.entities);
  useEffect(() => {
    if (user) {
      dispatch(fetchStores({ userId: user.id }));
    }
  }, [dispatch]);

  const navigateToStore = async (
    e: React.MouseEvent<HTMLButtonElement>,
    storeId: number
  ) => {
    const fetchStore = dispatch(storeById(storeId));
    if (fetchStore) {
      navigate('/apps');
    }
  };

  const list = useMemo(() => {
    return storesState.map((store, index: number) => (
      <div key={index}>
        <div className="card w-96 bg-base-100 shadow-xl image-full mt-6 mb-3">
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
              {/* <button className="btn btn-primary">Modifier</button> */}

              <button
                className="btn btn-primary"
                onClick={(e) => navigateToStore(e, store.id)}
              >
                Choisir
              </button>
            </div>
          </div>
        </div>
        <div className="w-full">
          <UpdateStore storeId={store.id} />
        </div>
      </div>
    ));
  }, [storesState]);

  let content;
  if (loading === 'pending') {
    content = (
      <div className="h-screen w-screen">
        <Spinner />
      </div>
    );
  } else if (loading === 'succeeded') {
    content = <>{list}</>;
  } else if (loading === 'failed') {
    content = <>Une erreur est survenue...</>;
  }

  return (
    <div className="p-9">
      <AddStore />

      <div className="flex justify-center flex-wrap items-center gap-4">
        {content}
      </div>
    </div>
  );
};
export default StoreList;
