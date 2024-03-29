import { FaUser } from "react-icons/fa";

export const UsersCards = ({
  name,
  email,
  onToggleActivation,
  user,
  isActivated,
}) => {
  // const { fetchUsers, usersStatus } = useAuthContext();
  // const [userStats, setUserStats] = useState([]);

  const enable_disable = () => {
    if (onToggleActivation) {
      onToggleActivation(user.id);
      console.log(isActivated);
    }
  };

  return (
    <>
      <div className="w-full max-w-md px-4 md:px-8 py-4 bg-white rounded-lg shadow-lg dark:bg-gray-600">
        <div className="hidden md:visible">
          <div className="flex justify-center -mt-16 md:justify-end">
            {/* <img
            className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400"
            alt="Testimonial avatar"
            src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
          /> */}
            <FaUser className="object-cover w-20 h-20 border-2 dark:text-gray-800 border-blue-500 rounded-full dark:border-blue-700" />
          </div>

          <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
            Design Tools
          </h2>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            dolores deserunt ea doloremque natus error, rerum quas odio quaerat
            nam ex commodi hic, suscipit in a veritatis pariatur minus
            consequuntur!
          </p>

          <div className="flex justify-end mt-4">
            <a
              href="#"
              className="text-lg font-medium text-blue-600 dark:text-blue-300"
              tabIndex="0"
              role="link"
            >
              John Doe
            </a>
          </div>
        </div>

        {/* smaller screen */}
        <div className="visible md:hidden">
          <div className="flex gap-4">
            <div className="flex">
              <FaUser className="object-cover w-20 h-20 border-2 dark:text-gray-500 border-gray-400 rounded-full dark:gray-blue-800" />
            </div>

            <div className="grid grid-cols-2 gap-4 relative w-full">
              <div className="flex flex-col items-start justify-start">
                <h2 className="mt-2 text-lg md:text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
                  {name}
                </h2>
                <h2 className="mt-2 text-sm md:text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
                  {email}
                </h2>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                  Role: User
                </p>
              </div>

              <div className="self-center justify-items-end w-full">
                <button
                  type="button"
                  onClick={enable_disable}
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
