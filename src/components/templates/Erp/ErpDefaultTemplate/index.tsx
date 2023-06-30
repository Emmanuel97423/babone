import { Outlet } from 'react-router-dom';
import SideBar from '@/components/ui/SideBar';
import Footer from '@/components/ui/Footer';
const ErpDefaultTemplate: React.FC = () => {
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="overflow-x-auto overflow-y-auto  w-full h-screen ">
        <Outlet />
      </div>
    </div>
  );
};
export default ErpDefaultTemplate;
