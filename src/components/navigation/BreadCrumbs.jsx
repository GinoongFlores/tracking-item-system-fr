import { NavLink } from "react-router-dom";

export const BreadCrumbs = ({ crumbs }) => {
  return (
    <>
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          {crumbs.map((crumb, index) => (
            <li key={index} className="inline-flex items-center">
              <div className="flex items-center pe-2">{crumb.icon}</div>
              <NavLink
                to={crumb.path}
                className={({ isActive }) =>
                  [
                    "inline-flex items-center text-sm font-sm font-medium",
                    isActive
                      ? "text-blue-800 dark:text-blue-300"
                      : "text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white",
                  ].join(" ")
                }
              >
                {crumb.name}
              </NavLink>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};
