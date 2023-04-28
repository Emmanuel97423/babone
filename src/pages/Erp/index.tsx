import { MouseEventHandler, useState } from 'react';
import { BsArrowLeftCircleFill, BsChevronDoubleLeft } from 'react-icons/bs';
import { AiOutlineSearch, AiOutlinePlusCircle } from 'react-icons/ai';
import { RiDashboardLine } from 'react-icons/ri';
import { FaFish } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { MdPointOfSale } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
const Erp: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

  interface SubMenuItems {
    title: string;
    link: string;
    icon: any;
  }

  interface MenuItems {
    title: string;
    link: string;
    icon: any;
    spacing?: boolean | undefined;
    subMenu?: boolean | undefined;
    subMenuOpen?: number | undefined | unknown;
    subMenuItems?: SubMenuItems[] | undefined;
  }
  const menus: MenuItems[] = [
    {
      title: 'Tableau de bord',
      link: '/erp/dashboard',
      icon: <RiDashboardLine />
    },
    {
      title: 'Produits',
      link: '/erp/products-management',
      icon: <FaFish />,
      subMenu: true,
      subMenuItems: [
        {
          title: 'Ajouter un produits',
          link: '/erp/products-management',
          icon: <AiOutlinePlusCircle />
        }
      ]
    },
    {
      title: 'Commandes',
      link: '/erp/orders',
      icon: <MdPointOfSale />,
      subMenu: true,
      subMenuItems: [
        {
          title: 'Ajouter une commande',
          link: '/erp/OrderPage',
          icon: <AiOutlinePlusCircle />
        }
      ]
    }
  ];

  const handleOpen = (): void => {
    setOpen(!open);
  };

  const handleOpenSubMenu = (
    index: number
  ): MouseEventHandler<HTMLAnchorElement> => {
    return () => setOpenSubMenu(openSubMenu === index ? null : index);
  };

  return (
    <div className="flex">
      <div
        className={`bg-primary h-screen p-5 pt-8  relative ease-in-out duration-300 ${
          open ? 'w-72' : 'w-20'
        }`}
      >
        <BsArrowLeftCircleFill
          className={`bg-primary text-3xl text-secondary absolute z-40 rounded-full -right-3 top-9 cursor-pointer ease-in-out duration-1 ${
            !open && ' rotate-180'
          }`}
          onClick={handleOpen}
        />
        <div className="inline-flex cursor-pointer">
          {/* <button className={`btn btn-wide `}>Menu principal</button> */}
          <BsChevronDoubleLeft className="text-xl rounded  block float-left mr-2" />
          <h2
            className={`text-white origin-left font-medium text-xl duration-75 ${
              !open && 'scale-0'
            }`}
          >
            Accueil
          </h2>
        </div>
        <div
          className={`flex items-center rounded-md bg-white mt-6  py-2 ${
            open ? 'px-4' : 'px-2.5'
          }`}
        >
          <AiOutlineSearch
            className={`text-primary text-lg block float-left cursor-pointer  ${
              open && 'mr-2'
            }`}
          />
          <input
            type={'search'}
            placeholder="Rechercher"
            className={`text-base bg-transparent w-full text-back focus:outline-none ${
              !open && 'hidden'
            }`}
          />
        </div>
        <ul className={`pt-2`}>
          {menus.map((menu, index) => (
            <>
              <Link to={menu.link} onClick={handleOpenSubMenu(index)}>
                <li
                  className={`text-grey-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-accent/50   rounded-md ${
                    menu.spacing ? 'mt-9' : 'mt-2'
                  } ${openSubMenu === index && 'bg-accent/50'}`}
                >
                  <span className="text-2xl block float-left">{menu.icon}</span>
                  <span
                    className={`text-base font-medium flex-1 ease-in-out duration-100 ${
                      !open && 'hidden'
                    }`}
                  >
                    {menu.title}
                  </span>

                  {menu.subMenu && open && (
                    <IoIosArrowDown
                      className={`text-2xl block float-right cursor-pointer ${
                        openSubMenu === index && 'rotate-180'
                      }`}
                    />
                  )}
                </li>
              </Link>
              {
                // Sub menu
                menu.subMenu && openSubMenu === index && open && (
                  <ul>
                    {menu.subMenuItems?.map((subMenu, index) => (
                      <li
                        key={index}
                        className="text-grey-300 text-sm px-5 flex items-center gap-x-4 cursor-pointer p-2 hover:bg-accent/50  rounded-md"
                      >
                        {subMenu.icon}
                        {subMenu.title}
                      </li>
                    ))}
                  </ul>
                )
              }
            </>
          ))}
        </ul>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
export default Erp;
