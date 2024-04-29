import { Modal } from "flowbite";
import { useEffect, useRef, useState } from "react";
import { ButtonModal } from "../buttons";
import { useUser } from "../../store";
import { GrUserAdmin } from "react-icons/gr";

export const SelectRoleModal = ({ user }) => {
  const modalRef = useRef(null);
  const modal = useRef(null);
  const [selectedRole, setSelectedRole] = useState(user.role_name);

  const { submitRole, handleRoleChange } = useUser();

  useEffect(() => {
    modal.current = new Modal(modalRef.current);
  }, []);

  const handleChange = (event) => {
    if (event && event.target) {
      let role = event.target.value;
      if (!user.role_name) {
        role = "Choose a user role";
      }
      setSelectedRole(role);
      handleRoleChange(user.id, role);
    }
  };

  const toggleModal = () => {
    if (modal.current.isVisible()) {
      modal.current.hide();
    } else {
      modal.current.show();
    }
  };
  return (
    <>
      <div className="flex justify-end px-4 pt-4">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          onClick={toggleModal}
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5 mr-2"
          type="button"
        >
          <div>
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
          </div>
        </button>
      </div>

      <div
        ref={modalRef}
        id="popup-modal"
        tabIndex={-1}
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={toggleModal}
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
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
            {/* modal body */}
            <div className="p-4 md:p-5 text-center flex flex-col justify-items-center items-center">
              <GrUserAdmin className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />

              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure want to change this role
                {/* {
                    from{" "}
                    {currentRole.toUpperCase().split("")[0] + currentRole.slice(1)}{" "}
                    to {currentRole === "admin" ? "User" : "Admin"}?
                } */}
              </h3>
              <form className="max-w-md mx-auto">
                <label htmlFor="underline_select" className="sr-only">
                  Underline select
                </label>
                <select
                  id="underline_select"
                  onChange={handleChange}
                  value={selectedRole}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Choose a user role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  {/* <option value="">Choose a user role</option> */}
                </select>
              </form>

              <div className="flex gap-4 mt-4">
                <ButtonModal
                  onClick={async () => {
                    await submitRole(user.id, selectedRole);
                    toggleModal();
                  }}
                  name={"Submit"}
                  data-modal-hide="popup-modal"
                ></ButtonModal>

                <ButtonModal
                  onClick={toggleModal}
                  name={"Cancel"}
                  data-modal-hide="popup-modal"
                ></ButtonModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
