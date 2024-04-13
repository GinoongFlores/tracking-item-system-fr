export const SearchBar = () => {
  return (
    <div className="w-11/12 md:w-3/4 lg:max-w-3xl m-auto">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative z-30 text-base text-black dark:text-white">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <input
          type="text"
          defaultValue=""
          className="bg-white dark:bg-darker mt-2 shadow-xl focus:outline-none rounded-full py-3 px-6 block w-full p-4 ps-10"
          placeholder="Search"
          required
        />
        <div className="text-left absolute top-10 rounded-t-none rounded-b-2xl shadow bg-white dark:bg-darker divide-y w-full max-h-40 overflow-auto"></div>
      </div>
    </div>
  );
};
