interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  placeholder?: string;
}

const Dropdown: React.FC<Props> = ({ options, placeholder }) => {
  const sampleOption = [
    { value: 'Moulinets', label: 'Moulinets' },
    { value: 'Cannes', label: 'Cannes' }
  ];
  return (
    <div className="dropdown w-full py-4 ">
      {/* <label tabIndex={0} className="btn m-1">
        Click
      </label> */}
      <input
        type="text"
        placeholder={placeholder ? placeholder : 'Catégorie'}
        className="input input-bordered w-full max-w-xs hover:input-accent "
      />
      <ul
        tabIndex={0}
        className="dropdown-content menu w-full max-w-xs shadow bg-base-100 rounded-b-lg mt-1"
      >
        {sampleOption?.map((option, index) => (
          <li key={index} className="py-4 px-2 cursor-pointer hover:bg-accent">
            {option.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
