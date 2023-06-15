import { IoIosArrowDown } from 'react-icons/io';
type DropdownProps = {
  children: React.ReactNode;
  className: string;
  labelButton: string;
};

const DropdownUI: React.FC<DropdownProps> = ({
  children,
  labelButton,
  className,
  ...props
}) => {
  return (
    <div className={`dropdown dropdown-end ${className}`}>
      <label
        tabIndex={0}
        className="btn  btn-primary  capitalize flex justify-between"
      >
        {labelButton}
        <IoIosArrowDown className="ml-2"></IoIosArrowDown>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {children}
      </ul>
    </div>
  );
};

export default DropdownUI;
