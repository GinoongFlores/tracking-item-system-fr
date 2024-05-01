import { Field } from "formik";

export const InputField = ({
  type,
  name,
  placeholder,
  fieldType,
  ...props
}) => {
  // console.log(type, id, name, placeholder);
  return (
    <Field
      type={type || "text"}
      as={fieldType || "input"}
      name={name}
      placeholder={placeholder}
      {...props}
      // value={name}
      className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
    />
  );
};
