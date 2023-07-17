import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateStores,
  fetchStores,
  storeById
} from '@/features/store/storeSlice';
import Modal from '@/components/ui/Modal';
import type { RootState, AppDispatch } from '@/store/store';
interface UpdateStoreProps {
  storeId: number;
}
interface StoreProps {
  name: string;
  address: string;
  zip: number | undefined;
}
const UpdateStore: React.FC<UpdateStoreProps> = ({ storeId }) => {
  const dispatch: AppDispatch = useDispatch();
  const addStoreStatus = useSelector((state: RootState) => state.store.loading);
  const user = useSelector((state: RootState) => state.auth.entities);
  const store = useSelector((state: RootState) => state.store.entitie);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [storeName, setStoreName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [zip, setZip] = useState<number | undefined>();
  // const [store, setStore] = useState<StoreProps>();

  const handleStoreNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = e.target.value;
    setStoreName(value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = e.target.value;
    setAddress(value);
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = parseInt(e.target.value);
    setZip(value);
  };

  const handleOpenModal = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setOpenModal(true);
    dispatch(storeById(storeId));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        updateStores({
          storeName: storeName,
          address: address,
          zip: zip,
          storeId: storeId
        })
      );
      if (result) {
        setOpenModal(false);
        setStoreName('');
        setAddress('');
        setZip(0);
        if (user) {
          dispatch(fetchStores({ userId: user.id }));
        }
      }
    } catch (error) {
      console.log('error:', error);
    }
  };

  return (
    <>
      <button className="btn btn-primary w-full" onClick={handleOpenModal}>
        Modifier
      </button>
      <Modal
        htmlFor="update-store-modal"
        isOpenModal={openModal}
        setIsModalOpen={setOpenModal}
      >
        <h2>Modifier le magasin</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder={store[0]?.name || 'Nom du magasin'}
              className="input input-bordered"
              value={storeName}
              onChange={handleStoreNameChange}
              required
            />
            <input
              type="text"
              placeholder={store[0]?.address || 'Adresse'}
              className="input input-bordered"
              value={address}
              onChange={handleAddressChange}
              required
            />
            <input
              type="number"
              placeholder={store[0]?.zip?.toString() || 'Code postal'}
              className="input input-bordered"
              value={zip}
              onChange={handleZipChange}
              required
            />
            <div className="mt-2">
              <button type="submit" className="btn btn-primary mr-4">
                Enregistrer
              </button>
              <button type="submit" className="btn btn-warning">
                Supprimer
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default UpdateStore;
