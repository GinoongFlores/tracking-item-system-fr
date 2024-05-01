export const Paginate = ({ totalPages, currentPages, onPageChanges }) => {
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <>
      <nav aria-label="Page navigation example">
        <div className="py-4 flex flex-col items-center fixed inset-x-0 bottom-0 bg-white dark:bg-darker">
          <ul className="flex items-center gap-1 -space-x-px h-8 text-base">
            <li>
              <button
                onClick={() => onPageChanges(currentPages - 1)}
                disabled={currentPages === 1}
                className="px-3 py-2 text-gray-500 bg-white rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="md:w-5 md:h-5 w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </li>
            {pages.map((page) => (
              <li key={page}>
                <button
                  onClick={() => onPageChanges(page)}
                  className={`text-sm px-3 py-2 rounded-lg ${
                    page === currentPages
                      ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white"
                      : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={() => onPageChanges(currentPages + 1)}
                disabled={currentPages === totalPages}
                className="px-3 py-2 text-gray-500 bg-white rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="md:w-5 md:h-5 w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
