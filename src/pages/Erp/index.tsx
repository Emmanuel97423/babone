import { Outlet } from 'react-router-dom';
import SideBar from '@/components/ui/SideBar';
const Erp: React.FC = () => {
  return (
    <div className="flex ">
      <div>
        <SideBar />
      </div>
      <div className="overflow-x-auto overflow-y-auto  w-full h-screen">
        <Outlet />
      </div>
    </div>
  );
};
export default Erp;
