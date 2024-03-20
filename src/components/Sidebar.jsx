import { Link } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { FaBackward } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

const SidebarContext = createContext();
export default function Sidebar({ children }) {
  const sidebarLinks = [
    {
      name: "Home",
      icon: (
        <svg
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
      link: "/home",
    },
    {
      name: "Items",
      icon: (
        <svg
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
      link: "/items",
    },
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const toggleMobile = () => {
    setIsMobile(!isMobile);
    console.log(isMobile);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <>
      {/* <button
        // data-drawer-target="sidebar-multi-level-sidebar"
        // data-drawer-toggle="sidebar-multi-level-sidebar"
        // aria-controls="sidebar-multi-level-sidebar"
        onClick={toggleMobile}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button> */}

      <aside className="h-screen w-44">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src="https://img.logoipsum.com/243.svg"
              alt=""
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
            />

            <button
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
              onClick={() => setExpanded((prevState) => !prevState)}
            >
              {expanded ? <FaForward /> : <FaBackward />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex px-3">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="w-10 h-10 rounded-md"
            />

            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-32 ml-3" : "w-0"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">Joe</h4>
                <span className="text-xs text-gray-600">joe@gmail.com</span>
              </div>
              <BsThreeDotsVertical size={20} />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SideBarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer
      transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all w-52 ml-3 
      ${expanded ? "w-52 ml-3" : "w-0"}`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? " " : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
      absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20
      -translate-x-3 transition-all group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
