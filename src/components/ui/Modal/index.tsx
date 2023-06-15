import { ReactNode, useState } from 'react';
import Button from '@/components/ui/common/Button';

type Props = {
  labelButton?: string;
  titleModal?: string;
  labelModal?: string;
  children: ReactNode;
  className?: string;
  btnClassName?: string;
  isOpenModal: boolean;
  setIsModalOpen: (open: boolean) => void;
};

const ModalUI: React.FC<Props> = ({
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
        className={`${
          props.btnClassName ? props.btnClassName : 'btn btn-primary '
        }${props.labelButton ? '' : 'hidden'}`}
        onClick={() => setIsModalOpen(true)}
      >
        {props.labelButton}
      </label>

      {/* Put this part before </body> tag */}
      {/* <input type="checkbox" id="my-modal-default" className="modal-toggle" /> */}
      <div className={`modal ${isOpenModal ? 'modal-open' : ''}   `}>
        <div className="modal-box relative  h-screen ">
          <label
            htmlFor="my-modal-default"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setIsModalOpen(false)}
          >
            ✕
          </label>
          <h2>{props.titleModal}</h2>
          <div className="relative pt-6">{children}</div>
        </div>
      </div>
    </>
  );
};

export default ModalUI;
