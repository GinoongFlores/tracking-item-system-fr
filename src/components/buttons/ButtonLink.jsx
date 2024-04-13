import { useNavigate } from "react-router-dom";

export const ButtonLink = ({ redirect, name }) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(`${redirect}`)}
      className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 dark:text-white focus:outline-none bg-white dark:bg-darker rounded-full border border-gray-500 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-100"
    >
      {name}
    </button>
  );
};
