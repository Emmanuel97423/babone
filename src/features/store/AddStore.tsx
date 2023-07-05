import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addStore } from '@/features/store/storeSlice';
import Modal from '@/components/ui/Modal';
import type { RootState, AppDispatch } from '@/store/store';
const AddStore: React.FC = () => {
  const dispatch = useDispatch();
  const addStoreStatus = useSelector((state: RootState) => state.store.loading);
  const userId = useSelector((state: RootState) => state.auth.entities);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [storeName, setStoreName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [zip, setZip] = useState<number>();

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

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenModal(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = dispatch(
        addStore({
          storeName: storeName,
          address: address,
          zip: zip,
          userId: userId.id
        })
      );
      if (result) {
        setOpenModal(false);
        setStoreName('');
        setAddress('');
        setZip(undefined);
      }
    } catch (error) {
      console.log('error:', error);
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleOpenModal}>
        Ajouter un magasin
      </button>
      <Modal isOpenModal={openModal} setIsModalOpen={setOpenModal}>
        <h2>Ajouter un magasin</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Nom du magasin"
              className="input input-bordered"
              value={storeName}
              onChange={handleStoreNameChange}
              required
            />
            <input
              type="text"
              placeholder="Adresse"
              className="input input-bordered"
              value={address}
              onChange={handleAddressChange}
              required
            />
            <input
              type="number"
              placeholder="Code postal"
              className="input input-bordered"
              value={zip}
              onChange={handleZipChange}
              required
            />
            <div className="mt-2">
              <button type="submit" className="btn btn-primary">
                Enregistrer
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default AddStore;
