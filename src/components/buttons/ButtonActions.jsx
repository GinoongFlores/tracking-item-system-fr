export const ButtonActions = ({ action, name }) => {
  return (
    <button
      onClick={action}
      type="button"
      className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium bg-white dark:text-white dark:bg-darker focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg shadow-xl dark:focus:ring-gray-700 dark:border-gray-700"
    >
      {name}
    </button>
  );
};
