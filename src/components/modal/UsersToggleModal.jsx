import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useUser } from "../../store/StoreUser";
import { SelectRole } from "../select/SelectRole";

export const UsersToggleModal = ({
  fullName,
  email,
  number,
  company,
  userRole,
  id,
}) => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("user");
  const { attachRole } = useUser();

  const handleSubmit = async () => {
    try {
      const response = await attachRole(id, role);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      {/* Modal toggle */}
      <button
        onClick={() => setOpen(!open)}
        data-modal-target="default-modal"
        className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        View
      </button>
      {/* Main modal */}
      {/* Default Modal */}
      <div
        id="medium-modal"
        tabIndex={-1}
        className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="relative w-full max-w-lg max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                User Details
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="medium-modal"
                onClick={() => setOpen(!open)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-2 pt-0 md:p-5 space-y-4">
              <div className="flex justify-end px-4 pt-4">
                <button
                  id="dropdownButton"
                  data-dropdown-toggle="dropdown"
                  className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                  type="button"
                >
                  <span className="sr-only">Open dropdown</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button>
                {/* Dropdown menu */}
                <div
                  id="dropdown"
                  className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul className="py-2" aria-labelledby="dropdownButton">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Export Data
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col items-center pb-5 md:pb-10">
                <FaUser className="object-cover w-20 h-20 mb-2 border-2 dark:text-gray-500 border-gray-400 rounded-full dark:gray-blue-800" />
                <div className="py-3 grid grid-cols-2 gap-4">
                  <dt className="text-sm font-medium text-gray-300">Role</dt>
                  <dd className="text-sm text-gray-200 sm:mt-0">
                    {userRole ? userRole : "no role yet"}
                  </dd>
                </div>
                {!userRole && (
                  <div className="my-4 ">
                    <SelectRole onChange={setRole} />
                  </div>
                )}

                <>
                  <div className="font-medium">
                    <div className="border-t border-gray-400 px-4 sm:p-0">
                      <dl className="sm:divide-y divide-gray-400">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-300">
                            Full Name
                          </dt>
                          <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text-gray-200">
                            {fullName ? fullName : "John Doe"}
                          </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-300">
                            Email
                          </dt>
                          <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
                            {email ? email : "test@.com"}
                          </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-300">
                            Phone number
                          </dt>
                          <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
                            {number ? number : "No number provided"}
                          </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-300">
                            Company
                          </dt>
                          <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
                            {company ? company : "No company"}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </>
                {/*
                  <div className="flex mt-4 md:mt-6">
                    <button
                      Message
                    </button>
                  </div> */}
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex justify-center items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              {!userRole && (
                <button
                  data-modal-hide="medium-modal"
                  type="button"
                  onClick={handleSubmit}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              )}

              <button
                data-modal-hide="medium-modal"
                type="button"
                onClick={() => setOpen(!open)}
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
