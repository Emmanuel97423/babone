import { Outlet } from 'react-router-dom';
import SideBar from '@/components/ui/SideBar';
import { AiOutlinePlusCircle, AiOutlineSetting } from 'react-icons/ai';
import { FaFish } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
const Erp: React.FC = () => {
  const menus = [
    // {
    //   title: 'Tableau de bord',
    //   link: '/erp/dashboard',
    //   icon: <RiDashboardLine />
    // },
    {
      title: 'Produits',
      link: '/erp/products-management',
      icon: <FaFish />,
      subMenu: true,
      subMenuItems: [
        // {
        //   title: 'Ajouter un produit',
        //   link: '/erp/products-management/add',
        //   icon: <AiOutlinePlusCircle />
        // },
        {
          title: 'Produit de base',
          link: '/erp/products-management',
          icon: <AiOutlinePlusCircle />
        },
        {
          title: 'Variantes',
          link: '/erp/products-management/variants',
          icon: <AiOutlinePlusCircle />
        }
      ]
    },
    // {
    //   title: 'Paramètre magasin',

    //   link: '/store',
    //   icon: <AiOutlineSetting />
    // },
    {
      title: 'Déconnexion',
      link: '',
      icon: <BiLogOut />,
      disconnect: true
    }

    // {
    //   title: 'Commandes',
    //   link: '/erp/orders',
    //   icon: <MdPointOfSale />,
    //   subMenu: true,
    //   subMenuItems: [
    //     {
    //       title: 'Ajouter une commande',
    //       link: '/erp',
    //       icon: <AiOutlinePlusCircle />
    //     }
    //   ]
    // },
    // {
    //   title: 'Options',
    //   link: '/erp/options',
    //   icon: <MdPointOfSale />
    // }
  ];

  console.log('menus:', menus);

  return (
    <div className="flex ">
      <div>
        <SideBar menus={menus} />
      </div>
      <div className="overflow-x-auto overflow-y-auto  w-full h-screen">
        <Outlet />
      </div>
    </div>
  );
};
export default Erp;
