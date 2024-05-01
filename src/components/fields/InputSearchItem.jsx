import { useUtils, useItems } from "../../store";
import { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { Field } from "formik";

export const InputSearchItem = ({ name, setFieldValue, values }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [availableItems, setAvailableItems] = useState([]);
  const itemData = useItems((state) => state.itemData);
  const { searchItem, filteredItems, setFilteredItems } = useUtils((state) => ({
    searchItem: state.searchItem,
    filteredItems: state.filteredItems,
    setFilteredItems: state.setFilteredItems,
  }));

  const debouncedSearch = useCallback(
    (...args) => debounce(searchItem, 300)(...args),
    [searchItem]
  );

  // helper function to split the items by comma
  const splitItems = (inputValue) => {
    return inputValue ? inputValue.split(",").map((item) => item.trim()) : [];
  };

  const handleOnChange = (e) => {
    const inputValue = e.target.value;
    setFieldValue(name, inputValue);
    // split the items by comma to allow multiple items
    const items = splitItems(inputValue);
    // const lastItem = items[items.length - 1];
    items.forEach((item) => {
      if (item) {
        debouncedSearch(item);
      }
    });
    // Update item_ids based on current items in search input. This clear the values of item_ids if the item is removed from the search input
    const currentItemIds = itemData
      .filter((item) => items.includes(item.name))
      .map((item) => item.id);
    setFieldValue("item_ids", currentItemIds);
  };

  // use this to check the items in the search input
  useEffect(() => {
    console.log("items ", values.item_ids);
  }, [values.item_ids]);

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

    // clear the search input after an item is selected
    searchItem("");

    // update the availableItems to exclude the selected item
    const updatedFilteredItems = filteredItems.filter(
      (filteredItem) => filteredItem.name !== itemName
    );
    setFilteredItems(updatedFilteredItems);
  };

  useEffect(() => {
    // split the items by comma to allow multiple items
    const items = splitItems(values[name]);
    // filter out items that are already included in the search input
    const updatedFilteredItems = itemData.filter(
      (item) => !items.includes(item.name)
    );

    setFilteredItems(updatedFilteredItems);
  }, [values, name, itemData, setFilteredItems]);

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
      {filteredItems.length > 0 && values[name] && (
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
