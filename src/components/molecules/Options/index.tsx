import { useState } from 'react';
import Input from '@/components/atoms/Input';
import Alert from '@/components/atoms/Alert';
import { MdDeleteForever } from 'react-icons/md';
type Props = {
  placeholder: string;
  onStateChange: (options: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};
const Options: React.FC<Props> = ({ ...props }) => {
  const [options, setOptions] = useState<string[]>([]);
  const handleAddOption = (e: any) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      const option = e.target.value;
      // options.find((item) => item === option) && event.target.value === '';
      const record = options.find(
        (item) => item.toLowerCase() === option.toLowerCase()
      );

      if (record) {
        return;
      }

      setOptions([...options, option]);
      props.onStateChange(option);
    }
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('e:', e);
  };

  const optionsContent = options.map((option, index) => (
    <div className="flex justify-between items-center">
      <Input
        key={index}
        value={option}
        type="text"
        onChange={handleOnChange}
        className="input rounded-none    w-full my-2 focus:outline-none"
      />
      <MdDeleteForever size={22} className=" cursor-pointer" />
    </div>
  ));
  return (
    <>
      <h2>Options</h2>
      <Input
        type="text"
        className="input rounded-none border-t-1 border-white  focus:outline-none"
        placeholder={props.placeholder}
        onKeyDown={handleAddOption}
      />
      {optionsContent}
    </>
  );
};

export default Options;
