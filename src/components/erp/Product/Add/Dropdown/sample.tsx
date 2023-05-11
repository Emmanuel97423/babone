import { useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
}

const Dropdown: React.FC<Props> = ({ options }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  return (
    <div className="relative">
      <input
        className="border border-gray-400 p-2 w-64 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Catégorie"
        value={searchTerm}
        onClick={handleClick}
        onChange={handleInputChange}
      />
      <HiOutlineChevronDown
        className="absolute top-2 right-2 text-gray-500 pointer-events-none"
        size={24}
      />
      {open && (
        <ul className="absolute z-10 w-64 bg-secondaryborder border-gray-400 rounded mt-1">
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
