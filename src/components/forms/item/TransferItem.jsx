import { useNavigate } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import { InputField } from "../..";
import { ItemSchema } from "../../../utils";
import { useItems, useUtils } from "../../../store";
import { useState, useCallback } from "react";
import { debounce } from "lodash";

export const InputSearch = () => {
  const [value, setValue] = useState("");
  const { searchUser, filteredNames } = useUtils((state) => ({
    searchUser: state.searchUser,
    filteredNames: state.filteredNames,
  }));

  /* replace with this (previous code)
  const debouncedSearchUser = useCallback(
    debounce((value) => {
      searchUser(value);
    }, 300),
    [searchUser]
  );

  const handleOnChange = (e) => {
    setValue(e.target.value);
    debouncedSearchUser(e.target.value);
  };
  */
  const debouncedSearch = debounce(searchUser, 300);

  const handleOnChange = useCallback(
    (e) => {
      setValue(e.target.value);
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  const handleOnClick = (receiver) => {
    setValue(receiver.first_name + " " + receiver.last_name);
    console.log(receiver);
    searchUser("");
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleOnChange}
        placeholder="search name"
        className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      />
      {/* dropdown of names */}
      {value && filteredNames.length > 0 && (
        <div className="mt-2 bg-white shadow rounded-lg dark:bg-darker">
          {filteredNames.map((receiver, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gray-200 p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <button
                onClick={() => handleOnClick(receiver)}
                className="text-blue-500"
              >
                <p>{receiver.first_name + " " + receiver.last_name}</p>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const TransferItem = ({ item }) => {
  const initialValues = {
    id: "",
    name: "",
    quantity: "",
    description: "",
    receiver_name: "",
    number: "",
  };
  return (
    <>
      <section className="relative min-h-screen">
        <div className="flex flex-col px-6 py-8 lg:py-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-1xl font-bold leading-tight tracking-tighter text-gray-900 md:text-2xl dark:text-white">
              Transfer an Item
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={ItemSchema}
              onSubmit={(values) => {
                // addItem(values);
                // navigate("/items");
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

                    <div>
                      <label
                        htmlFor="quantity"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Receiver's Name
                      </label>
                      <InputSearch />
                      {/*
                      {errors.quantity && touched.quantity ? (
                        <div className="text-red-400 text-sm">
                          {errors.quantity}
                        </div>
                      ) : null} */}
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
