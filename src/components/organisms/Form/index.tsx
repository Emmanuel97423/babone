import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

type Props = {
  children: React.ReactNode;
  onSubmit?: () => void;
  className?: string;
};
type Inputs = {
  example: string;
  exampleRequired: string;
};

const Form: React.FC<Props> = ({ children, ...props }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   onSubmit();
  // };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${props.className ? props.className : ''}`}
    >
      {children}
      <Button type="submit">Enregistrer</Button>
    </form>
  );
};

export default Form;
