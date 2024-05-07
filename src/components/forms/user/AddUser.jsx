import AxiosInstance from "../../../api/Axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../fields";
import { RegisterSchema } from "../../../utils/YupSchema";
import { useAuth } from "../../../store";
import { Form, Formik } from "formik";

export const AddUser = () => {
  const navigate = useNavigate();
  const register = useAuth((state) => state.register);
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    company_name: "",
    password: "",
    confirm_password: "",
  };
  // const { register } = useAuthContext();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await AxiosInstance.get("company/view");
        setCompanies(response.data.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchCompanyData();
  }, []);

  return (
    <section className="relative">
      <div className="flex flex-col justify-center items-center mx-auto h-full lg:py-0">
        <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:border dark:border-gray-700 z-20">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-1xl font-bold leading-tight tracking-tighter text-gray-900 md:text-2xl dark:text-white">
              Register a User
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={RegisterSchema}
              onSubmit={(values) => {
                register(values);
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              {({ errors, touched }) => (
                <Form action="#" className="space-y-4 md:space-y-6">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Name
                    </label>
                    <InputField name="first_name" placeholder="John" />
                    {errors.first_name && touched.first_name ? (
                      <div className="text-red-600 dark:text-red-400 text-sm">
                        {errors.first_name}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last Name
                    </label>
                    <InputField name="last_name" placeholder="Flores" />

                    {errors.last_name && touched.last_name ? (
                      <div className="text-red-600 dark:text-red-400 text-sm">
                        {errors.last_name}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>

                    <InputField
                      type={"email"}
                      name="email"
                      placeholder="user@company_email.com"
                    />

                    {errors.email && touched.email ? (
                      <div className="text-red-600 dark:text-red-400">
                        {" "}
                        {errors.email}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="company_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select User's Company
                    </label>
                    <InputField fieldType={"select"} name={"company_name"}>
                      <option value="">Choose a company</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.company_name}>
                          {company.company_name}
                        </option>
                      ))}
                    </InputField>
                    {errors.company_name && touched.company_name ? (
                      <div
                        className="text-red-600 dark:text-red-400
                           text-sm"
                      >
                        {errors.company_name}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <InputField
                      type={"password"}
                      name={"password"}
                      placeholder="•••••••••"
                    />

                    {errors.password && touched.password ? (
                      <div className="text-red-600 dark:text-red-400 text-sm">
                        {errors.password}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="confirm_password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </label>

                    <InputField
                      type={"password"}
                      name={"confirm_password"}
                      placeholder="•••••••••"
                    />

                    {errors.confirm_password && touched.confirm_password ? (
                      <div className="text-red-600 dark:text-red-400 text-sm">
                        {errors.confirm_password}
                      </div>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Register
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};
