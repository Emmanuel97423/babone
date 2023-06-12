import { useMemo, useState } from 'react';
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
  onUpdateOption?: (index: number, oldValue: string, newValue: string) => void;
  className?: string;
};

const Options: React.FC<Props> = ({
  name,
  options,
  onChange,
  onKeyDown,
  value,
  deleteOption,
  onUpdateOption,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setInputValue('');
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };
  // Créer un gestionnaire onChange pour chaque option
  const handleOptionChange =
    (index: number, oldValue: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (onUpdateOption) {
        onUpdateOption(index, oldValue, newValue);
      }
    };

  const optionsContent = useMemo(
    () =>
      options.map((option: string, index: number) => (
        <div key={index} className="w-full flex justify-between items-center">
          <input
            value={option}
            type="text"
            className="input rounded-none w-full my-2 focus:outline-none"
            onChange={handleOptionChange(index, option)}
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
      )),
    [options, handleOptionChange, deleteOption]
  );

  return (
    <>
      <h2>Options</h2>
      <input
        name={name}
        type="text"
        className="w-full input rounded-none border-t-1 border-white  focus:outline-none"
        placeholder={props.placeholder}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={inputValue}
      />
      {optionsContent}
    </>
  );
};

export default Options;
