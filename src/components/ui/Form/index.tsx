import Input from '@/components/ui/Input';
import Button from '@/components/ui/common/Button';

type Props = {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
};
type Inputs = {
  example: string;
  exampleRequired: string;
};

const Form: React.FC<Props> = ({ onSubmit, children, ...props }) => {
  return (
    <form
      // onSubmit={onSubmit}
      className={`${props.className ? props.className : ''}`}
    >
      {children}
    </form>
  );
};

export default Form;
