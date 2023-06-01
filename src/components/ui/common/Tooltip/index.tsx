type Props = {
  children: React.ReactNode;
  textInfos: string;
  textInfosDirection: string;
};
const Tooltip: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div
      className={`tooltip  tooltip-${props.textInfosDirection.toString()} w-2`}
      data-tip={props.textInfos}
    >
      {children}
    </div>
  );
};

export default Tooltip;
