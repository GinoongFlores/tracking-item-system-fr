import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useFormik, Field, Form, Formik } from "formik";
import { useAuth } from "../../store/StoreAuth";
import { useUtils } from "../../store";
import { UserToken } from "../../hooks/userToken";
import { LoginSchema } from "../../utils";
import { InputField } from "../fields";

export const Login = () => {
  const navigate = useNavigate();
  const token = UserToken();
  const login = useAuth((state) => state.login);
  const closeSidebar = useUtils((state) => state.closeSidebar);

  // console.log(token);
  useEffect(() => {
    if (token) {
      closeSidebar();
    }
  }, [closeSidebar, token]);

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 relative">
        {/* create an div with rounded corners */}
        <div className="w-full h-[400px] md:h-[250px] mb-10 bg-gray-800 rounded-b-[50px] absolute"></div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 ">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 z-20">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                  login(values);
                  navigate("/", { replace: true });
                }}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form action="#" className="space-y-4 md:space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <InputField name={"email"} placeholder={"Email"} />
                      {errors.email && touched.email ? (
                        <div className="text-red-600 dark:text-red-400 text-sm">
                          {" "}
                          {errors.email}
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
                        autoComplete={"current-password"}
                        placeholder="•••••••••"
                      />
                      {errors.password && touched.password ? (
                        <div className="text-red-600 dark:text-red-400 text-sm">
                          {errors.password}
                        </div>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Sign in
                    </button>
                    <p className="text-sm font-light text-black dark:text-gray-500">
                      Don't have an account? {""}
                      <Link
                        to={"/register"}
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign up
                      </Link>
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          {/* create an div with rounded corners */}
          <div className="w-full h-[100px] md:h-[50px] bottom-0  bg-gray-800 rounded-t-[50px] absolute"></div>
        </div>
      </section>
    </>
  );
};
