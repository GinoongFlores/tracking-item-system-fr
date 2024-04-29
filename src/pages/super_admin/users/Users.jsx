import { useEffect } from "react";
import { useUser } from "../../../store";
import { SearchBar } from "../../../components";
import { UsersLinks, Loader } from "../../../utils";
import { Paginate, BreadCrumbs } from "../../../components/navigation";
import { ViewUsers } from "./ViewUsers";

export const Users = () => {
  // destructure
  const {
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
        <ViewUsers />
        <Paginate
          currentPages={currentPage}
          totalPages={totalPages}
          onPageChanges={setCurrentPage}
        />
      </section>
    </>
  );
};
