import { useFormik, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { UserRole } from "../../hooks";
import { UserToken } from "../../hooks/userToken";
import { useCompany } from "../../store";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../components";

export const AddCompanyPage = () => {
  const userRole = UserRole();
  const superAdmin = userRole === "super_admin";
  const navigate = useNavigate();
  // console.log(userRole);

  const registerCompany = Yup.object().shape({
    company_name: Yup.string().required("Company name is required"),
    address: Yup.string().required("Company address is required"),
  });

  const addCompany = useCompany((state) => state.addCompany);

  return (
    <>
      {superAdmin && (
        <section className="h-screen">
          {/* create an div with rounded corners */}
          <div className="flex flex-col justify-center items-center mx-auto px-6 py-8 md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border dark:border-gray-700 z-20">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-1xl font-bold leading-tight tracking-tighter text-gray-900 md:text-2xl dark:text-white">
                  Add a Company
                </h1>
                <Formik
                  initialValues={{
                    company_name: "",
                    address: "",
                  }}
                  validationSchema={registerCompany}
                  onSubmit={(values) => {
                    addCompany(values);
                    navigate("/company");
                  }}
                >
                  {({ errors, touched }) => (
                    <Form action="#" className="space-y-4 md:space-y-6">
                      <div>
                        <label
                          htmlFor="company_name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Company name
                        </label>
                        <InputField
                          type={"text"}
                          id={"company_name"}
                          name={"company_name"}
                          placeholder={"Company name"}
                        />
                        {errors.company_name && touched.company_name ? (
                          <div className="text-red-800 dark:text-red-400 text-sm">
                            {errors.company_name}
                          </div>
                        ) : null}
                      </div>

                      <div>
                        <label
                          htmlFor="address"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Address
                        </label>
                        <InputField
                          type={"text"}
                          id={"address"}
                          name={"address"}
                          placeholder={"Company address"}
                        />
                        {errors.address && touched.address ? (
                          <div className="text-red-800 dark:text-red-400 text-sm">
                            {errors.address}
                          </div>
                        ) : null}
                      </div>

                      <button
                        type="submit"
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Add a Company
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            {/* create an div with rounded corners */}
          </div>
        </section>
      )}
    </>
  );
};
