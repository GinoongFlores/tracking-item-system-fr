import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBackward, FaHome, FaUsers, FaBuilding } from "react-icons/fa";
import { MdFullscreenExit, MdAdminPanelSettings } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

import { UserRole } from "../../hooks/UserRole";
import { Navbar } from "../navigation";
import { useAuth } from "../../store/StoreAuth";
import { useUtils } from "../../store/StoreUtils";

export const Sidebar = () => {
  // const { logout } = useAuthContext();
  const userRole = UserRole();
  const navigate = useNavigate();
  const logout = useAuth((state) => state.logout);
  const superAdmin = userRole === "super_admin";
  const admin = userRole === "admin";
  const users = userRole === "user";

  const isOpen = useUtils((state) => state.isOpen);
  const toggleOpen = useUtils((state) => state.toggleOpen);

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
            icon: (
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
              </svg>
            ),
            link: "/items",
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
            name: "Admin",
            icon: <MdAdminPanelSettings size={20} />,
            link: "/admin",
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
            icon: (
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
              </svg>
            ),
            link: "/items",
          },
        ]
      : []),

    {
      name: "logout",
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
        className={`fixed top-0 left-0 z-40 w-36 md:w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-darker dark:border-gray-700 ${
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
                <Link
                  to={link.link}
                  onClick={(e) => {
                    if (link.name === "logout") {
                      e.preventDefault();
                      logout();
                      navigate("/login", { replace: true });
                    } else {
                      toggleOpen();
                    }
                  }}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  {link.icon}
                  <span className="ms-3">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64 ">
        {/* <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"></div> */}
      </div>
    </>
  );
};
