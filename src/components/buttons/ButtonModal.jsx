export const ButtonModal = ({ name, ...props }) => {
  return (
    <button
      {...props}
      type="submit"
      className="shadow-xl inline-flex items-center bg-white text-black dark:text-white hover:bg-slate-500 dark:bg-darker dark:hover:bg-gray-700 dark:focus:ring-gray-800 border border-gray-400 dark:border-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      {name}
    </button>
  );
};
