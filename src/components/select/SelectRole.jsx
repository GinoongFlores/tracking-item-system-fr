import { useUser } from "../../store";

export const SelectRole = () => {
  const { selectedRole, handleRoleChange } = useUser();

  return (
    <form className="max-w-md mx-auto">
      <label htmlFor="underline_select" className="sr-only">
        Underline select
      </label>
      <select
        id="underline_select"
        onChange={handleRoleChange}
        value={selectedRole || ""}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {/* <option value="">Choose a user role</option> */}
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
    </form>
  );
};
