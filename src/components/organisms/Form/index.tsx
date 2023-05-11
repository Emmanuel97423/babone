type Props = {
  onSubmit: () => void;
};

const Form: React.FC<Props> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return <form onSubmit={handleSubmit}></form>;
};

export default Form;
