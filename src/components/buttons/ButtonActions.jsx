export const ButtonActions = ({ action, name, ...props }) => {
  return (
    <div>
      <button
        onClick={action}
        {...props}
        type="button"
        className={`w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium bg-white dark:text-white dark:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg shadow-xl dark:focus:ring-gray-700 dark:border-gray-700`}
      >
        {name}
      </button>
    </div>
  );
};
