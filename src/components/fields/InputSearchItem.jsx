import { useUtils, useItems } from "../../store";
import { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { Field } from "formik";

export const InputSearchItem = ({ name, setFieldValue, values }) => {
  const [selectedId, setSelectedId] = useState(null);
  const { itemData } = useItems();
  const { searchItem, filteredItems } = useUtils((state) => ({
    searchItem: state.searchItem,
    filteredItems: state.filteredItems,
  }));

  const debouncedSearch = useCallback(
    (...args) => debounce(searchItem, 300)(...args),
    [searchItem]
  );

  const handleOnChange = (e) => {
    const inputValue = e.target.value;
    setFieldValue(name, inputValue);
    // split the items by comma to allow multiple items
    const items = inputValue.split(",").map((item) => item.trim());
    const lastItem = items[items.length - 1];
    if (lastItem) {
      debouncedSearch(lastItem);
    }

    // Update item_ids based on current items in search input. This clear the values of item_ids if the item is removed from the search input
    const currentItemIds = itemData
      .filter((item) => items.includes(item.name))
      .map((item) => item.id);
    setFieldValue("item_ids", currentItemIds);
  };

  // use this to check the items in the search input
  // useEffect(() => {
  //   console.log("items ", values.item_ids);
  // }, [values.item_ids]);

  const handleOnClick = (item) => {
    const itemName = item.name;
    let currentValues = values[name]
      ? values[name].split(",").map((v) => v.trim())
      : [];
    let updatedValues = currentValues.map((v) =>
      itemName.toLowerCase().includes(v.toLowerCase()) ? itemName : v
    );
    if (!updatedValues.includes(itemName)) {
      // if the item is not in the list, add it
      updatedValues.push(itemName);
    }
    setFieldValue(name, updatedValues.join(", "));
    setSelectedId(item.id);

    if (!(values.item_ids || []).includes(item.id)) {
      setFieldValue("item_ids", [...(values.item_ids || []), item.id]);
    }

    searchItem("");
  };

  return (
    <div>
      <Field
        type="text"
        name={name}
        onChange={handleOnChange}
        placeholder="e.g., macbook, printer, book"
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
