import { useState, useEffect, useRef } from "react";
import { Form, Formik } from "formik";
import { ItemSchema } from "../../utils/YupSchema";
import { InputField } from "../../components";
import { ButtonActions, ButtonModal } from "../buttons";
import { useItems } from "../../store";

export const EditItem = ({ item }) => {
  const initialValues = {
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    description: item.description,
  };
  const updateUserItem = useItems((state) => state.updateUserItem);
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Modal toggle */}
      <ButtonActions action={() => setOpen(!open)} name={"Edit"} />
      {/* Main modal */}
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full flex-grow">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Edit Item
              </h3>
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
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
            <Formik
              initialValues={initialValues}
              validationSchema={ItemSchema}
              onSubmit={(values) => {
                updateUserItem(values.id, values);
                setOpen(!open);
              }}
            >
              {({ errors, touched }) => {
                return (
                  <Form className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Name
                        </label>
                        <InputField
                          fieldType={"input"}
                          type={"text"}
                          name={"name"}
                          placeholder={"Product name"}
                        />
                        {errors.name && touched.name ? (
                          <div className="text-red-400 text-sm">
                            {errors.name}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="price"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Quantity
                        </label>
                        <InputField
                          fieldType={"input"}
                          type={"number"}
                          name={"quantity"}
                          placeholder="2"
                          required=""
                        />
                        {errors.number && touched.number ? (
                          <div className="text-red-400 text-sm">
                            {errors.number}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="description"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Product Description
                        </label>
                        <InputField
                          fieldType={"textarea"}
                          name={"description"}
                          placeholder="Write product description here"
                          defaultValue={""}
                        />
                        {errors.description && touched.description ? (
                          <div className="text-red-400 text-sm">
                            {errors.description}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <ButtonModal type="submit" name={"Save"}>
                      <svg
                        className="me-1 -ms-1 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </ButtonModal>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
