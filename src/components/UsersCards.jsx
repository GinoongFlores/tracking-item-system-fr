import { FaUser } from "react-icons/fa";
import { useUser } from "../store/StoreUser";

export const UsersCards = ({ name, email, isActivated, id }) => {
  const handleToggleActivation = useUser(
    (state) => state.handleToggleActivation
  );
  const handleClick = () => {
    handleToggleActivation(id);
  };

  return (
    <>
      <div className="w-full max-w-md px-4 md:px-8 py-4 bg-white rounded-lg shadow-lg dark:bg-gray-600">
        {/* smaller screen */}
        <div className="visible">
          <div className="flex gap-4">
            <div className="flex">
              <FaUser className="object-cover w-20 h-20 border-2 dark:text-gray-500 border-gray-400 rounded-full dark:gray-blue-800" />
            </div>

            <div className="grid grid-cols-2 gap-4 relative w-full">
              <div className="flex flex-col ">
                <h2 className="mt-2 text-sm md:text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
                  {name}
                </h2>
                <h2 className="mt-2 text-sm md:text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
                  {email}
                </h2>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                  Role: User
                </p>
              </div>

              <div className="self-center justify-items-end w-full px-4">
                <button
                  type="button"
                  onClick={handleClick}
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  {isActivated ? "Enable" : "Disable"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
