import { MouseEventHandler, useState } from 'react';
import { BsArrowLeftCircleFill, BsChevronDoubleLeft } from 'react-icons/bs';
import { AiOutlineSearch, AiOutlinePlusCircle } from 'react-icons/ai';
import { RiDashboardLine } from 'react-icons/ri';
import { FaFish } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { MdPointOfSale } from 'react-icons/md';
import { Link } from 'react-router-dom';

const SideBar: React.FC = () => {
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
          title: 'Ajouter un produit',
          link: '/erp/products-management/add',
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
          link: '/erp',
          icon: <AiOutlinePlusCircle />
        }
      ]
    }
    // {
    //   title: 'Catégorie',
    //   link: '/erp/categori',
    //   icon: <MdPointOfSale />
    // },
    // {
    //   title: 'Produits',
    //   link: '/erp/products-management',
    //   icon: <FaFish />,
    //   subMenu: true,
    //   subMenuItems: [
    //     {
    //       title: 'Ajouter un produit',
    //       link: '/erp/products-management/add',
    //       icon: <AiOutlinePlusCircle />
    //     }
    //   ]
    // }
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
    <div
      className={`bg-primary h-screen p-5 pt-8  relative ease-in-out duration-300 ${
        open ? 'w-72' : 'w-20'
      }`}
    >
      <BsArrowLeftCircleFill
        className={`bg-primary text-3xl text-white absolute z-40 rounded-full -right-3 top-9 cursor-pointer ease-in-out duration-1 ${
          !open && ' rotate-180'
        }`}
        onClick={handleOpen}
      />

      {/* <button className={`btn btn-wide `}>Menu principal</button> */}
      <Link
        to="/"
        className={`${open ? 'flex  items-center cursor-pointer' : ''}`}
      >
        <BsChevronDoubleLeft className="text-xl rounded  block float-left mr-2" />
        <h2
          className={`text-white origin-left font-medium text-xl duration-75 ${
            !open && 'scale-0'
          }`}
        >
          Menu principal
        </h2>
      </Link>

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
          <div key={index}>
            <Link to={menu.link} onClick={handleOpenSubMenu(index)}>
              <li
                className={`relative text-grey-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-accent/50   rounded-md ${
                  menu.spacing ? 'mt-9' : 'mt-2'
                } ${openSubMenu === index && 'bg-accent/50'}`}
              >
                <span
                  className={`${
                    menu.title !== 'Commandes'
                      ? 'hidden'
                      : ' absolute flex h-3 w-3 left-2 top-1'
                  } ${!open && '  left-2 top-1'}`}
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-warning"></span>
                </span>
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
                      className=" text-grey-300 text-sm px-5  relative  cursor-pointer p-2 hover:bg-accent/50  rounded-md"
                    >
                      <Link
                        to={subMenu.link}
                        className="flex items-center gap-x-4"
                      >
                        {subMenu.icon}
                        {subMenu.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )
            }
          </div>
        ))}
      </ul>
    </div>
  );
};
export default SideBar;
