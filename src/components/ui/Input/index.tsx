import Infos from '@/components/ui/Infos';
import Collapse from '@/components/ui/Collapse';

type InputProps = {
  id?: number;
  name: string;
  type: string;
  label?: string;
  value?: string;
  placeholder?: string;
  className?: string;
  textInfos?: string;
  textInfosDirection?: string;
  radioValues?: radioValue[];
  option?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
type radioValue = {
  value: string;
};

const Input: React.FC<InputProps> = ({ ...props }) => {
  let content: JSX.Element = <></>;
  if (props.type === 'text') {
    content = (
      <input
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        className={` ${
          props.className ? props.className : 'input input-bordered w-full mb-4'
        }}`}
        onBlur={props.onBlur}
        onKeyDown={props.onKeyDown}
        value={props.value}
        onChange={props.onChange}
      />
    );
  } else if (props.type === 'radio' && props.radioValues) {
    content = (
      <>
        {props.radioValues.map((value: radioValue, index: number) => (
          <label key={index} className="label cursor-pointer">
            <span className="label-text">
              {value.toString()}{' '}
              {value.toString() === 'Couleur et texte' && ' (non-disponible)'}
            </span>
            <input
              type="radio"
              name="radio"
              className={`radio `}
              disabled={value.toString() === 'Couleur et texte' && true}
              checked={value.toString() === 'Texte' ? true : false}
            />
          </label>
        ))}
      </>
    );
  } else if (props.type === 'option') {
    content = (
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={`input input-bordered w-full mb-4 `}
      />
    );
  }

  return (
    <>
      {props.label && (
        <div className="flex justify-start items-center mb-1 mt-6 ">
          {props.label && (
            <label htmlFor={props.label} className="label">
              <label className="label-text text-lg font-semibold">
                {props.label}
              </label>
            </label>
          )}
          {props.textInfos && (
            <Infos
              textInfos={props.textInfos}
              textInfosDirection={
                props.textInfosDirection ? props.textInfosDirection : ''
              }
            />
          )}
        </div>
      )}
      {content}
    </>
  );
};

export default Input;
