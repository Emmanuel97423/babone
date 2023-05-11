import { ReactNode } from 'react';
import Button from '@/components/atoms/Button';

type Props = {
  labelButton: string;
  labelModal?: string;
  children: ReactNode;
};

const Modal: React.FC<Props> = ({ children, ...props }) => {
  return (
    <>
      {/* The button to open modal */}

      <label htmlFor="my-modal-default" className="btn btn-primary">
        {props.labelButton}
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-default" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box relative w-screen h-screen ">
          <label
            htmlFor="my-modal-default"
            className="btn btn-sm btn-circle absolute right-2 top-2"
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
