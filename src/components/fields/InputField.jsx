import { Field } from "formik";

export const InputField = ({ type, name, placeholder, fieldType }) => {
  // console.log(type, id, name, placeholder);
  return (
    <Field
      type={type}
      as={fieldType}
      name={name}
      placeholder={placeholder}
      // value={name}
      className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-darker focus:border-darker block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-darker dark:focus:border-darker"
    />
  );
};
