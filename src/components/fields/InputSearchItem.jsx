import { useItems, useUtils } from "../../store";
import { useState, useCallback } from "react";
import { debounce } from "lodash";
import { Field } from "formik";

export const InputSearchItem = ({ name, setFieldValue, values }) => {
  const [selectedId, setSelectedId] = useState(null);
  const { searchItem, filteredItems } = useUtils((state) => ({
    searchItem: state.searchItem,
    filteredItems: state.filteredItems,
  }));

  const debouncedSearch = debounce(searchItem, 300);

  const handleOnChange = useCallback(
    (e) => {
      setFieldValue("name", e.target.value);
      debouncedSearch(e.target.value);
    },
    [debouncedSearch, setFieldValue]
  );

  const handleOnClick = (item) => {
    // setValue(receiver.first_name + " " + receiver.last_name);
    const itemName = item.name;
    setFieldValue(name, itemName);
    setSelectedId(item.id);
    setFieldValue("item_ids", [...(values.item_ids || []), item.id]);
    console.log(item);
    searchItem("");
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
      {filteredItems.length > 0 && (
        <div className="mt-2 bg-white shadow rounded-lg dark:bg-darker">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gray-200 p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <button
                onClick={() => handleOnClick(item)}
                className="text-blue-500"
              >
                <p>{item.name}</p>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
