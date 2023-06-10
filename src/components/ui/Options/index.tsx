import Input from '@/components/ui/Input';
import Alert from '@/components/ui/common/Alert';
import { MdDeleteForever } from 'react-icons/md';

type Props = {
  name: string;
  placeholder: string;
  options: string[];
  value: string;
  onStateChange?: (options: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: any) => void;
  deleteOption?: (option: string) => void;
  className?: string;
};

const Options: React.FC<Props> = ({
  name,
  options,
  onChange,
  onKeyDown,
  value,
  deleteOption,
  ...props
}) => {
  // const onChangeTest = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log('e:', e);
  // };
  const optionsContent = options.map((option: string, index: number) => (
    <div key={index} className="w-full flex justify-between items-center">
      <Input
        value={option}
        type="text"
        className="input rounded-none    w-full my-2 focus:outline-none"
        // onChange={(e) => onChange(e)}
      />
      <MdDeleteForever
        size={22}
        className=" cursor-pointer"
        onClick={() => {
          if (deleteOption) {
            deleteOption(option);
          }
        }}
      />
    </div>
  ));

  return (
    <>
      <h2>Options</h2>
      <input
        name={name}
        type="text"
        className="w-full input rounded-none border-t-1 border-white  focus:outline-none"
        placeholder={props.placeholder}
        onKeyDown={onKeyDown}
        onChange={onChange}
        // value={value}
      />
      {optionsContent}
    </>
  );
};

export default Options;
