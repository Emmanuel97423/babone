import { Outlet } from 'react-router-dom';
import SideBar from '@/components/ui/SideBar';
const ErpDefaultTemplate: React.FC = () => {
  return (
    <div className="flex ">
      <div>
        <SideBar />
      </div>
      <div className="overflow-x-auto overflow-y-auto  w-full h-screen flex justify-center">
        <Outlet />
      </div>
    </div>
  );
};
export default ErpDefaultTemplate;
