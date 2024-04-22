import { useItems, useUtils } from "../../store";
import { useState, useCallback } from "react";
import { debounce } from "lodash";
import { Field } from "formik";

export const InputSearchUser = ({ name, setFieldValue }) => {
  const [selectedId, setSelectedId] = useState(null);
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
      setFieldValue("receiver_name", e.target.value);
      debouncedSearch(e.target.value);
    },
    [debouncedSearch, setFieldValue]
  );

  const handleOnClick = (receiver) => {
    // setValue(receiver.first_name + " " + receiver.last_name);
    const fullName = receiver.first_name + " " + receiver.last_name;
    setFieldValue(name, fullName);
    // setSelectedId is for getting the receiver's id for the form submission
    setSelectedId(receiver.id);
    setFieldValue("receiver_id", receiver.id);
    console.log(receiver);
    searchUser("");
  };

  return (
    <div>
      <Field
        type="text"
        name={name}
        onChange={handleOnChange}
        placeholder="search name"
        className="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      />
      {/* dropdown of names */}
      {filteredNames.length > 0 && (
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
