import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { InputField } from "../..";
import { ItemSchema } from "../../../utils";
import { useItems } from "../../../store";

export const AddItem = () => {
  const addItem = useItems((state) => state.addItem);
  const navigate = useNavigate();

  return (
    <>
      <section className="relative h-screen">
        <div className="flex flex-col px-6 py-8 lg:py-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-1xl font-bold leading-tight tracking-tighter text-gray-900 md:text-2xl dark:text-white">
              Add an Item
            </h1>
            <Formik
              initialValues={{
                image: "",
                name: "",
                description: "",
                quantity: "",
              }}
              validationSchema={ItemSchema}
              onSubmit={(values) => {
                addItem(values);
                navigate("/items");
              }}
            >
              {({ errors, touched }) => {
                return (
                  <Form action="#" className="space-y-4 md:space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Item Name
                      </label>
                      <InputField
                        fieldType={"input"}
                        type={"text"}
                        name={"name"}
                        placeholder={"Item name"}
                      />
                      {errors.name && touched.name ? (
                        <div className="text-red-400 text-sm">
                          {errors.name}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="quantity"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Quantity
                      </label>
                      <InputField
                        fieldType={"input"}
                        type={"text"}
                        name={"quantity"}
                        placeholder={"2"}
                      />
                      {errors.quantity && touched.quantity ? (
                        <div className="text-red-400 text-sm">
                          {errors.quantity}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description
                      </label>
                      <InputField
                        fieldType={"textarea"}
                        name="description"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-400 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                        placeholder="Write your thoughts here..."
                        // defaultValue={"An Item"}
                      />
                      {errors.description && touched.description ? (
                        <div className="text-red-400 text-sm">
                          {errors.description}
                        </div>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg px-5 me-2 mb-2 text-sm font-medium text-gray-900 dark:text-white focus:outline-none bg-white dark:bg-darker border border-gray-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-100"
                    >
                      Submit
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};
