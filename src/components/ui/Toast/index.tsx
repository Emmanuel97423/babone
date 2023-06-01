type ToastProps = {
  children: React.ReactNode;
  message: string;
  type: string;
};
const Toast: React.FC<ToastProps> = ({ children, ...props }) => {
  return (
    <div className="toast toast-center toast-middle">
      <div className="alert alert-info">
        <div>
          <span>New mail arrived.</span>
        </div>
      </div>
      <div className="alert alert-success">
        <div>
          <span>Message sent successfully.</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
