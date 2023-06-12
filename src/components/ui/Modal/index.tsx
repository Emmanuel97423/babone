import { ReactNode, useState } from 'react';
import Button from '@/components/ui/common/Button';

type Props = {
  labelButton?: string;
  labelModal?: string;
  children: ReactNode;
  className?: string;
  isOpenModal: boolean;
  setIsModalOpen: (open: boolean) => void;
};

const Modal: React.FC<Props> = ({
  children,
  isOpenModal,
  setIsModalOpen,
  ...props
}) => {
  return (
    <>
      {/* The button to open modal */}

      <label
        htmlFor="my-modal-default"
        className="btn btn-primary"
        onClick={() => setIsModalOpen(true)}
      >
        {props.labelButton}
      </label>

      {/* Put this part before </body> tag */}
      {/* <input type="checkbox" id="my-modal-default" className="modal-toggle" /> */}
      <div className={`modal ${isOpenModal ? 'modal-open' : ''}   `}>
        <div className="modal-box relative w-screen h-screen ">
          <label
            htmlFor="my-modal-default"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setIsModalOpen(false)}
          >
            ✕
          </label>
          <h2>Créer un ensemble d’options</h2>
          <div className="relative pt-6">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
