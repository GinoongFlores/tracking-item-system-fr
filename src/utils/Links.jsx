import { FaBackward, FaHome, FaUsers, FaBuilding } from "react-icons/fa";
import { BreadCrumbsArrow } from "../../public";

export const UsersLinks = [
  {
    name: "All Users",
    path: "/users",
    icon: <FaUsers className="w-6 h-6 text-gray-500 dark:text-white" />,
  },
  {
    name: "Add",
    path: "/add",
    icon: <BreadCrumbsArrow />,
  },
  {
    name: "Inactive",
    path: "/users/inactive",
    icon: <BreadCrumbsArrow />,
  },
];

export const CompanyLinks = [
  {
    name: "Companies",
    path: "/company",
    icon: <FaBuilding className="w-6 h-6 text-gray-500 dark:text-white" />,
  },
  {
    name: "Add",
    path: "/company/add",
    icon: <BreadCrumbsArrow />,
  },
  {
    name: "Trashed",
    path: "/company/trashed",
    icon: <BreadCrumbsArrow />,
  },
];
