import { FaUser } from "react-icons/fa";
import { useUser } from "../../store/StoreUser";
import { SelectRole } from "../select/SelectRole";
import { useModal } from "../../hooks/useModal";
import { ButtonActions } from "../buttons";

export const UsersToggleModal = ({
  fullName,
  email,
  number,
  company,
  userRole,
  id,
}) => {
  const { modal, modalRef } = useModal();

  const { submitRole, selectedRole } = useUser();

  return (
    <>
      {/* Modal toggle */}
      <ButtonActions action={() => modal.current.toggle()} name="View" />

      {/* Main modal */}
      {/* Default Modal */}
      <div
        ref={modalRef}
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="te xt-xl font-medium text-gray-900 dark:text-white">
                User Details
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="medium-modal"
                onClick={() => modal.current.hide()}
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
                    <SelectRole />
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
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex justify-center items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              {!userRole && (
                <button
                  data-modal-hide="medium-modal"
                  type="button"
                  onClick={() => submitRole(id, selectedRole)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              )}

              <button
                data-modal-hide="medium-modal"
                type="button"
                onClick={() => modal.current.hide()}
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
