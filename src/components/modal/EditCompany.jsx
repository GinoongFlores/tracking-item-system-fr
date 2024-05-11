import { Form, Formik } from "formik";
import { CompanySchema } from "../../utils/YupSchema";
import { InputField } from "../../components";
import { ButtonActions, ButtonModal } from "../buttons";
import { useCompany } from "../../store";
import { useModal } from "../../hooks";

export const EditCompany = ({ company }) => {
  const initialValues = {
    id: company.id,
    company_name: company.name,
    company_description: company.description,
    address: company.address,
  };

  const updateCompany = useCompany((state) => state.updateCompany);
  const { modal, modalRef } = useModal();
  return (
    <>
      {/* Modal toggle */}
      <ButtonActions action={() => modal.current.toggle()} name={"Edit"} />
      {/* Main modal */}
      <div
        ref={modalRef}
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
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
                onClick={() => modal.current.hide()}
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
              validationSchema={CompanySchema}
              onSubmit={(values) => {
                updateCompany(values.id, values);
                modal.current.hide();
              }}
            >
              {({ errors, touched }) => {
                return (
                  <Form className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="company_name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Name
                        </label>
                        <InputField
                          fieldType={"input"}
                          type={"text"}
                          name={"company_name"}
                          placeholder={"Company name"}
                        />
                        {errors.company_name && touched.company_name ? (
                          <div className="text-red-400 text-sm">
                            {errors.company_name}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="description"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Company Description
                        </label>
                        <InputField
                          fieldType={"textarea"}
                          name={"company_description"}
                          placeholder="Describe the company"
                          rows="4"
                        />
                        {errors.company_description &&
                        touched.company_description ? (
                          <div className="text-red-400 text-sm">
                            {errors.company_description}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="description"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Company Address
                        </label>
                        <InputField
                          fieldType={"textarea"}
                          name={"address"}
                          placeholder="Address of the Company"
                          rows="4"
                        />
                        {errors.address && touched.address ? (
                          <div className="text-red-400 text-sm">
                            {errors.address}
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
