import ModalUI from '@/components/ui/Modal';

type Props = {
  labelButton: string;
  labelModal?: string;
};

const UpdateOptionsModal: React.FC<Props> = ({ ...props }) => {
  return (
    <>
      <ModalUI labelButton="Modifier l’ensemble d’options">
        Update Options
      </ModalUI>
    </>
  );
};

export default UpdateOptionsModal;
