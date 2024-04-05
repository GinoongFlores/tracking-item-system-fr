import { useState } from "react";

export const SelectRole = ({ onChange }) => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleChange = (event) => {
    setSelectedRole(event.target.value); // update the selected role
    if (typeof onChange === "function") {
      onChange(event.target.value);
    }
  };
  return (
    <form className="max-w-md mx-auto">
      <label htmlFor="underline_select" className="sr-only">
        Underline select
      </label>
      <select
        id="underline_select"
        onChange={handleChange}
        value={selectedRole}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Choose a user role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
    </form>
  );
};
