import { useEffect } from "react";
import { UsersCards } from "../../components/cards";
import { useUser } from "../../store";
import { SearchBar } from "../../components/";
import { UsersLinks, Loader } from "../../utils/";
import { Paginate, BreadCrumbs } from "../../components/navigation";
import { UsersToggleModal } from "../../components/modal/UsersToggleModal";

export const Users = () => {
  // destructure
  const {
    users,
    fetchUsers,
    currentPage,
    setCurrentPage,
    totalPages,
    filterUsers,
    loading,
  } = useUser();

  useEffect(() => {
    fetchUsers(currentPage);
  }, [fetchUsers, currentPage]);

  return (
    <>
      {loading && <Loader />}
      <section className="relative pb-20">
        <div className="mb-4 flex flex-col items-center justify-stretch">
          <BreadCrumbs crumbs={UsersLinks} />
          <SearchBar onSearch={filterUsers} />
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
        <Paginate
          currentPages={currentPage}
          totalPages={totalPages}
          onPageChanges={setCurrentPage}
        />
      </section>
    </>
  );
};
