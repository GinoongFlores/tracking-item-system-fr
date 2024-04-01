import { useEffect, useState } from "react";
import { UsersCards } from "../../components/UsersCards";
import { Tabs } from "../../components/Tabs";
import { useUser } from "../../store/StoreUser";
import { SearchBar } from "../../components/SearchBar";
import { Paginate } from "../../components/Paginate";

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

export const Users = () => {
  // destructure
  const {
    fetchUsers,
    currentPage,
    setCurrentPage,
    totalPages,
    search,
    filterUsers,
    handleSearch,
    handleToggleActivation,
  } = useUser();

  useEffect(() => {
    fetchUsers(currentPage);
  }, [fetchUsers, currentPage]);

  const filteredUsers = filterUsers(search);

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
            email={user.email}
            isActivated={user.is_activated}
            onToggleActivation={handleToggleActivation}
            name={`${user.first_name} ${user.last_name}`}
          />
        ))}
        setCurrentPage
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
