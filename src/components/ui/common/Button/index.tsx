interface Props {
  children: React.ReactNode;
  onClick?: (e: any) => void;
  type?: 'button' | 'submit' | 'reset';
  htmlFor?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  name?: string;
  value?: string;
  autoFocus?: boolean;
  form?: string;
  formAction?: string;
  formEncType?: string;
  formMethod?: string;
  formNoValidate?: boolean;
  formTarget?: string;
  title?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: boolean;
  ariaHasPopup?: boolean;
  ariaPressed?: boolean;
  ariaControls?: string;
  ariaDisabled?: boolean;
}
const Button: React.FC<Props> = ({ children, ...props }) => {
  return (
    <button
      className="btn btn-primary my-4 w-full"
      onClick={props.onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
