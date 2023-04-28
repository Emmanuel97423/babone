import { Outlet } from 'react-router-dom';
import SideBar from '../../components/erp/SideBar';
const Erp: React.FC = () => {
  return (
    <div className="flex ">
      <>
        <SideBar />
      </>
      <div className="overflow-x-auto w-full ">
        <Outlet />
      </div>
    </div>
  );
};
export default Erp;
