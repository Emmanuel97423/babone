import Input from '@/components/ui/Input';
type Props = {
  children: React.ReactNode;
  type: 'option';
};
const Collapse: React.FC<Props> = ({ children, ...props }) => {
  let content: JSX.Element = <></>;
  if (props.type === 'option') {
    content = (
      <div className="collapse">
        <input type="checkbox" className="peer" />
        <Input type="text" label="options" />

        <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          <p>{children}</p>
        </div>
      </div>
    );
  }
  return <>{content}</>;
};

export default Collapse;
