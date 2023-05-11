import Tooltip from '@/components/atoms/Tooltip';
import { AiFillInfoCircle } from 'react-icons/ai';

type Props = {
  textInfos: string;
  textInfosDirection: string;
};
const Infos: React.FC<Props> = ({ ...props }) => {
  return (
    <Tooltip
      textInfos={props.textInfos}
      textInfosDirection={props.textInfosDirection}
    >
      <AiFillInfoCircle />
    </Tooltip>
  );
};
export default Infos;
