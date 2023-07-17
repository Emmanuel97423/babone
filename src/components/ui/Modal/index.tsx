import { ReactNode, useState } from 'react';
import Button from '@/components/ui/common/Button';
import { useDispatch } from 'react-redux';

type Props = {
  htmlFor: string;
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
  htmlFor,
  ...props
}) => {
  const handleCloseModal: (e: React.MouseEvent) => void = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <>
      {/* The button to open modal */}

      <label
        htmlFor={htmlFor}
        className={`${
          props.btnClassName ? props.btnClassName : 'btn btn-primary '
        }${props.labelButton ? '' : 'hidden'}`}
        onClick={() => setIsModalOpen(true)}
      >
        {props.labelButton}
      </label>

      {/* Put this part before </body> tag */}
      {/* <input type="checkbox" id="my-modal-default" className="modal-toggle" /> */}
      <div className={`modal ${isOpenModal ? 'modal-open' : ''} z-50  `}>
        <div className="modal-box relative  max-h-auto  max-w-[600px] ">
          <label
            htmlFor={htmlFor}
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={handleCloseModal}
          >
            ✕
          </label>
          <h2>{props.titleModal}</h2>
          <div className="relative pb-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default ModalUI;
