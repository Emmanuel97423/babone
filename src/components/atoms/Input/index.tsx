import Infos from '@/components/molecules/Infos';

type InputProps = {
  id?: number;
  type: string;
  label?: string;
  placeholder?: string;
  className?: string;
  textInfos?: string;
  textInfosDirection?: string;
  radioValues?: radioValue[];
};
type radioValue = {
  value: string;
};

const Input: React.FC<InputProps> = ({ ...props }) => {
  return (
    <>
      <div className="flex justify-start items-center mb-1">
        {props.label && (
          <label htmlFor={props.label} className="label">
            <label className="label-text">{props.label}</label>
          </label>
        )}
        {props.textInfos && (
          <>
            <Infos
              textInfos={props.textInfos}
              textInfosDirection={
                props.textInfosDirection ? props.textInfosDirection : 'right'
              }
            />
          </>
        )}
      </div>
      {props.type === 'text' && (
        <input
          type={props.type}
          placeholder={props.placeholder}
          className={`input input-bordered w-full mb-4 `}
        />
      )}
      {props.type === 'radio' &&
        props.radioValues?.map((value: radioValue, index: number) => {
          return (
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
              />
            </label>
          );
        })}
    </>
  );
};

export default Input;
