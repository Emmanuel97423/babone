import Input from '@/components/atoms/Input';
type Props = {
  children: React.ReactNode;
};
const Collapse: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div
      tabIndex={0}
      className="collapse border border-base-300 bg-base-100 rounded-box"
    >
      <div className="collapse-title text-xl font-medium">
        <Input
          type="text"
          label="Ajouter une option"
          placeholder="Ajouter une option"
        />
        Focus me to see content
      </div>
      <div className="collapse-content">
        <p>tabIndex={0} attribute is necessary to make the div focusable</p>
      </div>
    </div>
  );
};

export default Collapse;
