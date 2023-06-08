import Modal from '@/components/ui/Modal';

type Props = {
  labelButton: string;
  labelModal?: string;
};

const UpdateOptionsModal:React.FC<Props> = ({...props})=>{
    return (
      <>
        <Modal labelButton="Modifier l’ensemble d’options">
          Update Options
        </Modal>
      </>
    );
};

export default UpdateOptionsModal;