import { useEffect, useState } from "react";
import { UsersCards } from "../../components/UsersCards";
// import { useUserContext } from "../../context/UsersContext";
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

export const Users = () => {
  const { fetchUsers, users, toggleActivation, setUsers } = useUserContext();
  const [search, setSearch] = useState("");
  const inactiveUsers = users.filter((user) => user.is_activated === 0);

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
      <div className="container">
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
              email={user.email}
            />
          ))}
        </div>
        {/* <Paginate /> */}
      </div>
    </>
  );
};
