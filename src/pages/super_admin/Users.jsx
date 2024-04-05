import { useEffect, useState } from "react";
import { UsersCards } from "../../components/UsersCards";
import { Tabs } from "../../components/Tabs";
import { useUser } from "../../store/StoreUser";
import { SearchBar } from "../../components/SearchBar";
import { Paginate } from "../../components/Paginate";
import { UsersToggleModal } from "../../components/modal/UsersToggleModal";

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
    users,
    fetchUsers,
    currentPage,
    setCurrentPage,
    totalPages,
    search,
    filterUsers,
    handleSearch,
  } = useUser();

  useEffect(() => {
    fetchUsers(currentPage);
  }, [fetchUsers, currentPage]);

  useEffect(() => {
    filterUsers(search);
  }, [filterUsers, search]);
  // const filteredUsers = filterUsers(search);

  return (
    <>
      <div className="mb-4">
        <SearchBar onSearch={handleSearch} />
        <Tabs tabsList={usersLists} />
      </div>
      <div className="flex flex-wrap gap-4">
        {users.map((user) => (
          <UsersCards
            key={user.id}
            id={user.id}
            // user={
            email={user.email}
            viewUser={
              <UsersToggleModal
                key={user.id}
                id={user.id}
                userRole={user.role_name}
                fullName={`${user.first_name} ${user.last_name}`}
                email={user.email}
                number={user.phone_number}
                company={user.company_name}
              />
            }
            isActivated={user.is_activated}
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
