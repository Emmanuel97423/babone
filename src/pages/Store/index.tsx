import { Outlet } from 'react-router-dom';
import { FaStore } from 'react-icons/fa';
import SideBar from '@/components/ui/SideBar';
const StorePage: React.FC = () => {
  const menus = [
    // {
    //   title: 'Tableau de bord',
    //   link: '/erp/dashboard',
    //   icon: <RiDashboardLine />
    // },
    {
      title: 'Magasins',
      link: '/stores',
      icon: <FaStore />
    }
  ];
  return (
    <div className="flex ">
      <div>
        <SideBar menus={menus} />
      </div>
      <div className="overflow-x-auto overflow-y-auto  w-full h-screen p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default StorePage;
