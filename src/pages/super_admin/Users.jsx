import { useEffect, useState } from "react";
import { UsersCards } from "../../components/UsersCards";
import { useUserContext } from "../../context/UsersContext";
import { Tabs } from "../../components/Tabs";

const usersLists = [
  {
    name: "All Users",
    link: "/users",
  },
  {
    name: "Add",
    link: "/users/add",
  },
  {
    name: "Inactive",
    link: "/users/inactive",
  },
];

export const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <form className="w-full md:max-w-sm mx-auto mb-4">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
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
          type="search"
          id="default-search"
          onChange={handleSearch}
          value={search}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Mockups, Logos..."
          required=""
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export const Paginate = ({ totalPages, currentPages, onPageChanges }) => {
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-8 text-base">
          <li>
            <button
              href="#"
              onClick={() => onPageChanges(currentPages - 1)}
              disabled={currentPages === 1}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          {pages.map((page) => (
            <li key={page}>
              <button
                onClick={() => onPageChanges(page)}
                // className={page === currentPages ? "current" : ""}
                className={`px-4 py-2 border rounded ${
                  page === currentPages
                    ? "z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export const Users = () => {
  const { fetchUsers, users, toggleActivation, setUsers, totalPages } =
    useUserContext();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers(currentPage);
    };

    fetchData();
  }, [fetchUsers, currentPage]);

  const handleSearch = (searchInput) => {
    setSearch(searchInput);
  };

  const handleToggleActivation = async (userId) => {
    const response = await toggleActivation(userId);

    if (response.status === 200) {
      setUsers(
        users.map((user) =>
          user.id === userId
            ? {
                ...user,
                is_activated: +!user.is_activated,
                // is_activated: !user.is_activated === 0 ? 1 : 0,
                // or is_activated: +!user.is_activated
              }
            : user
        )
      );
    }
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name.toLowerCase().includes(search.toLowerCase())
    );
  });

  useEffect(() => {
    // toggleActivation();
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <div className="mb-4">
        <SearchBar onSearch={handleSearch} />
        <Tabs tabsList={usersLists} />
      </div>
      <div className="flex flex-wrap gap-4">
        {filteredUsers.map((user) => (
          <UsersCards
            key={user.id}
            user={user}
            isActivated={user.is_activated}
            onToggleActivation={handleToggleActivation}
            name={`${user.first_name} ${user.last_name}`}
          />
        ))}
      </div>
      <div className="py-4 flex flex-col items-center">
        <Paginate
          currentPages={currentPage}
          totalPages={totalPages}
          onPageChanges={setCurrentPage}
        />
      </div>
    </>
  );
};
