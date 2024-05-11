import { useNavigate, NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaBuilding } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { BiTransferAlt } from "react-icons/bi";

import { UserRole } from "../../hooks";
import { Navbar } from "../navigation";
import { useAuth, useUtils, useTransfer, useItems } from "../../store";
import { Items } from "../../../public/svg";

export const Sidebar = () => {
  // const { logout } = useAuthContext();
  const userRole = UserRole();
  const navigate = useNavigate();
  const logout = useAuth((state) => state.logout);
  const currentUser = useAuth((state) => state.currentUser);
  const superAdmin = userRole === "super_admin";
  const admin = userRole === "admin";
  const users = userRole === "user";

  const isOpen = useUtils((state) => state.isOpen);
  const toggleOpen = useUtils((state) => state.toggleOpen);
  const clearTransactions = useTransfer((state) => state.clearTransactions);
  const clearItems = useItems((state) => state.clearItems);

  const sidebarLinks = [
    ...(users
      ? [
          {
            name: "Home",
            icon: <FaHome size={20} />,
            link: "/",
          },
          {
            name: "Items",
            icon: <Items />,
            link: "/item",
          },
          // {
          //   name: "profile",
          //   icon: <CgProfile size={20} />,
          //   link: "/profile",
          // },
          {
            name: "Transaction",
            icon: <BiTransferAlt size={20} />,
            link: "item/transaction",
          },
        ]
      : []),

    ...(admin
      ? [
          {
            name: "Home",
            icon: <FaHome size={20} />,
            link: "/",
          },
          {
            name: "Users",
            icon: <FaUsers size={20} />,
            link: "/users",
          },
          {
            name: "Items",
            icon: <Items />,
            link: "/item",
          },
          // {
          //   name: "Profile",
          //   icon: <CgProfile size={20} />,
          //   link: "/profile",
          // },
          {
            name: "Transaction",
            icon: <BiTransferAlt size={20} />,
            link: "/transaction",
          },
        ]
      : []),
    ...(superAdmin
      ? [
          {
            name: "Home",
            icon: <FaHome size={20} />,
            link: "/",
          },
          {
            name: "Company",
            icon: <FaBuilding />,
            link: "/company",
          },
          {
            name: "Users",
            icon: <FaUsers />,
            link: "/users",
          },
          {
            name: "Items",
            icon: <Items />,
            link: "/item",
          },
          {
            name: "Transaction",
            icon: <BiTransferAlt size={20} />,
            link: "transaction",
          },
        ]
      : []),

    {
      name: "Logout",
      icon: <BiLogOut />,
      // link: "#",
    },
  ].filter(Boolean);

  return (
    <>
      <header>
        <Navbar toggleOpen={toggleOpen} />
      </header>
      <aside
        id="logo-sidebar"
        className={`text-black text-sm md:text-lg dark:text-gray-400 fixed top-0 left-0 z-40 h-screen pt-24 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-darker dark:border-gray-700  ${
          isOpen ? "" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="pb-4 mb-4 space-y-2 font-medium border-b border-gray-200 dark:border-gray-700">
            <li>
              <h2 className="text-sm md:text-lg dark:text-gray-400 text-center">
                Welcome {userRole === "super_admin" ? "super admin" : userRole}!
              </h2>
            </li>
          </ul>
          <ul className="space-y-2 font-medium">
            {sidebarLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.link}
                  end
                  onClick={(e) => {
                    if (link.name === "Logout") {
                      e.preventDefault();
                      clearTransactions();
                      clearItems();
                      logout();
                      navigate("/login", { replace: true });
                    } else {
                      toggleOpen();
                    }
                  }}
                  className={({ isActive }) =>
                    link.name === "Logout"
                      ? "flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      : [
                          "flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 group",
                          isActive ? "bg-gray-100 dark:bg-gray-700" : "",
                        ].join(" ")
                  }
                >
                  {link.icon}
                  <span className="ms-3">{link.name}</span>
                </NavLink>
              </li>
            ))}
            <li className="fixed bottom-0 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center">
              <div className="relative">
                <h2 className="text-sm md:text-lg dark:text-gray-100 text-center">
                  {currentUser?.company}
                </h2>
              </div>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64 ">
        {/* <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"></div> */}
      </div>
    </>
  );
};
